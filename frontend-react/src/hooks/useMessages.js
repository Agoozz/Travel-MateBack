import { useState, useEffect, useCallback, useContext } from 'react';
import { messageService } from '../services/messageService';
import { AuthContext } from '../context/AuthContext';

export function useMessages() {
  const { user } = useContext(AuthContext);
  const currentUserId = user?._id || localStorage.getItem("user_id");

  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Funciones de carga
  const loadContacts = useCallback(async () => {
    try {
      setLoadingContacts(true);
      setError("");
      const data = await messageService.getContacts(currentUserId);
      setContacts(data);
      // isOfflineMode se setea si el primer contacto vino offline, o chequeando el flag global
      setIsOfflineMode(!messageService.isBackendOnline);
    } catch (_err) {
      setError("Error al cargar los contactos");
    } finally {
      setLoadingContacts(false);
    }
  }, [currentUserId]);

  const loadMessages = useCallback(async (targetUser, showLoading = true) => {
    if (!targetUser) return;
    try {
      if (showLoading) setLoadingMessages(true);
      
      const data = await messageService.getMessages(targetUser.id, targetUser.name, targetUser.avatar);
      setMessages(data);
      
      if (isOfflineMode) {
        setIsTyping(false); // Clear typing when messages load in offline mode
      }
    } catch (err) {
      console.error(err);
      if (showLoading) setError("Error al cargar los mensajes");
    } finally {
      if (showLoading) setLoadingMessages(false);
    }
  }, [isOfflineMode]);

  // Selección
  const selectContact = useCallback((contact) => {
    setSelectedUser(contact);
    setMessages([]); // clear current messages
    loadMessages(contact);
  }, [loadMessages]);

  // Enviar mensaje
  const sendMessage = async (text) => {
    if (!text || !selectedUser || sending) return;
    
    setSending(true);
    
    // Optimistic append para fluidez
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      text: text,
      sender: 'sent',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const result = await messageService.sendMessage(selectedUser.id, selectedUser.name, selectedUser.avatar, text);
      if (result.isOffline) {
        // Simulamos el typing indicator
        setIsTyping(true);
      } else {
        // En online recargamos para obtener el ID real
        await loadMessages(selectedUser, false);
      }
      
      // Actualizamos el último mensaje en la lista de contactos
      setContacts(prev => prev.map(c => 
        c.id === selectedUser.id ? { ...c, lastMsg: text } : c
      ));
      
    } catch (_err) {
      setError("Error al enviar el mensaje");
      // Opcional: Revertir mensaje optimista si falla
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
    } finally {
      setSending(false);
    }
  };

  // Efecto inicial: Cargar contactos
  useEffect(() => {
    if (currentUserId) {
      loadContacts();
    }
  }, [currentUserId, loadContacts]);

  // Polling para mensajes online
  useEffect(() => {
    if (!selectedUser || isOfflineMode) return undefined;

    const intervalId = window.setInterval(() => {
      loadMessages(selectedUser, false);
    }, 3000); // 3 segundos, igual a Vanilla

    return () => window.clearInterval(intervalId);
  }, [selectedUser, isOfflineMode, loadMessages]);

  // Event Listener para respuestas offline del bot
  useEffect(() => {
    if (!isOfflineMode) return;

    const handleOfflineMessage = (e) => {
      if (selectedUser && e.detail.userId === selectedUser.id) {
        setIsTyping(false);
        loadMessages(selectedUser, false);
        loadContacts(); // Refresh lastMsg
      }
    };

    window.addEventListener('offline-message-received', handleOfflineMessage);
    return () => window.removeEventListener('offline-message-received', handleOfflineMessage);
  }, [isOfflineMode, selectedUser, loadMessages, loadContacts]);

  return {
    contacts,
    selectedUser,
    messages,
    loadingContacts,
    loadingMessages,
    sending,
    error,
    isOfflineMode,
    isTyping,
    selectContact,
    sendMessage,
    refreshContacts: loadContacts
  };
}
