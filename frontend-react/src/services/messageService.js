import { fetchAPI } from './api';
import { offlineChatManager } from './offlineChatManager';
import { matchService } from './matchService';

export const messageService = {
  isBackendOnline: true,

  /**
   * Obtiene los contactos (conversaciones activas).
   * Intenta desde el backend (matches) y si falla usa offlineChatManager.
   */
  getContacts: async (currentUserId) => {
    try {
      const matches = await matchService.getMatches();
      // Filtrar matches confirmados
      const validMatches = matches.filter((m) => m.estado === "matched");

      messageService.isBackendOnline = true;

      return validMatches.map((m) => {
        const isMeUsuario1 = m.usuario1._id === currentUserId;
        const otherUser = isMeUsuario1 ? m.usuario2 : m.usuario1;
        
        return {
          id: otherUser._id,
          name: otherUser.nombre,
          avatar: otherUser.avatar,
          lastMsg: "Abre para ver los mensajes",
          isOffline: false
        };
      });
    } catch (error) {
      console.warn("Backend offline o error al cargar contactos. Activando modo Fallback local.", error);
      messageService.isBackendOnline = false;

      const chats = offlineChatManager.getAllChats();
      const userIds = Object.keys(chats).sort(
        (a, b) => chats[b].lastUpdate - chats[a].lastUpdate
      );

      return userIds.map((id) => {
        const chat = chats[id];
        const lastMsg = chat.messages.length > 0 
          ? chat.messages[chat.messages.length - 1].text 
          : "";
        
        return {
          id: id,
          name: chat.name || "Usuario",
          avatar: chat.avatar || "https://i.pravatar.cc/150",
          lastMsg: lastMsg,
          isOffline: true
        };
      });
    }
  },

  /**
   * Obtiene los mensajes de una conversación
   */
  getMessages: async (targetUserId, _targetName, _targetAvatar) => {
    try {
      if (!messageService.isBackendOnline) throw new Error("Fallback mode active");

      const data = await fetchAPI(`/mensajes/${targetUserId}`);
      
      // Adaptar el modelo del backend al frontend
      return data.map(m => ({
        id: m._id || Math.random().toString(),
        text: m.texto,
        sender: m.emisor === targetUserId ? 'received' : 'sent',
        timestamp: m.fecha ? new Date(m.fecha).getTime() : Date.now()
      }));

    } catch (_error) {
      // Fallback
      const chat = offlineChatManager.getChatHistory(targetUserId);
      return chat.messages.map((m, index) => ({
        id: `offline-${index}-${m.timestamp}`,
        text: m.text,
        sender: m.sender,
        timestamp: m.timestamp
      }));
    }
  },

  /**
   * Envía un mensaje
   */
  sendMessage: async (targetUserId, targetName, targetAvatar, text) => {
    try {
      if (!messageService.isBackendOnline) throw new Error("Fallback mode active");

      const data = await fetchAPI('/mensajes', {
        method: 'POST',
        body: { receptorId: targetUserId, texto: text }
      });
      return { success: true, isOffline: false, data };

    } catch (_error) {
      // Fallback local
      offlineChatManager.addMessage(targetUserId, targetName, targetAvatar, text, 'sent');
      
      // En modo offline, el bot responde después de un tiempo
      setTimeout(() => {
        const reply = offlineChatManager.generateReply(text);
        offlineChatManager.addMessage(targetUserId, targetName, targetAvatar, reply, 'received');
        // Usaremos un CustomEvent para notificar al componente que hay un nuevo mensaje offline
        window.dispatchEvent(new CustomEvent('offline-message-received', { 
          detail: { userId: targetUserId } 
        }));
      }, 1500 + Math.random() * 1500);

      return { success: true, isOffline: true };
    }
  }
};
