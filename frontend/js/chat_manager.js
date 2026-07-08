/**
 * ChatManager: Lógica de chat persistente y bot conversacional
 */
window.ChatManager = (function() {
    const STORAGE_KEY = 'mateAndTravelChats';

    // Obtener el ID del usuario actual (basado en su nombre o email simulado)
    function getCurrentUserId() {
        return (localStorage.getItem('user_name') || 'invitado').toLowerCase();
    }

    function getStorageKey(userId) {
        return 'mateAndTravelChats_' + userId;
    }

    // Cargar chats desde localStorage
    function loadChats(userId = getCurrentUserId()) {
        const stored = localStorage.getItem(getStorageKey(userId));
        return stored ? JSON.parse(stored) : {};
    }

    // Guardar chats a localStorage
    function saveChats(chats, userId = getCurrentUserId()) {
        localStorage.setItem(getStorageKey(userId), JSON.stringify(chats));
    }

    // Obtener todos los chats del usuario actual
    function getAllChats() {
        return loadChats();
    }

    // Obtener el historial de un usuario específico
    function getChatHistory(targetId) {
        const chats = loadChats();
        return chats[targetId] || { messages: [], name: '', avatar: '', lastUpdate: 0 };
    }

    // Añadir un mensaje al historial (y sincronizar con el otro perfil)
    function addMessage(targetId, targetName, targetAvatar, text, sender) {
        const currentUserId = getCurrentUserId();
        
        // 1. Guardar en el perfil del usuario actual
        const chats = loadChats(currentUserId);
        if (!chats[targetId]) {
            chats[targetId] = {
                id: targetId,
                name: targetName,
                avatar: targetAvatar,
                messages: []
            };
        } else {
            chats[targetId].name = targetName;
            chats[targetId].avatar = targetAvatar;
        }

        chats[targetId].messages.push({
            text: text,
            sender: sender, // 'sent' o 'received'
            timestamp: new Date().getTime()
        });
        chats[targetId].lastUpdate = new Date().getTime();
        saveChats(chats, currentUserId);

        // 2. Guardar en el perfil de la otra persona (Magia de sincronización cruzada)
        const targetChats = loadChats(targetId);
        const myName = localStorage.getItem('user_name') || 'Viajero';
        const myAvatar = localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150';
        
        if (!targetChats[currentUserId]) {
            targetChats[currentUserId] = {
                id: currentUserId,
                name: myName,
                avatar: myAvatar,
                messages: []
            };
        }
        
        // Si yo lo "envié", la otra persona lo "recibió"
        const targetSender = sender === 'sent' ? 'received' : 'sent';
        
        targetChats[currentUserId].messages.push({
            text: text,
            sender: targetSender,
            timestamp: new Date().getTime()
        });
        targetChats[currentUserId].lastUpdate = new Date().getTime();
        saveChats(targetChats, targetId);
    }

    // Motor de respuestas variadas
    function generateReply(userText) {
        const text = userText.toLowerCase();
        
        if (text.includes('hola') || text.includes('buenas')) {
            const replies = [
                "¡Hola! ¿Cómo andás? 😊",
                "¡Ey! Qué bueno cruzar mensaje. 🧉",
                "Holaaa, ¿todo bien por ahí?"
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }
        
        if (text.includes('cuando') || text.includes('fecha') || text.includes('mes')) {
            const replies = [
                "Estaba pensando ir en un par de meses, en temporada baja.",
                "Idealmente para las vacaciones de invierno, si puedo acomodar mis días.",
                "¡Cuando pinte! Soy bastante flexible con las fechas."
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }
        
        if (text.includes('plata') || text.includes('presupuesto') || text.includes('gastar') || text.includes('precio') || text.includes('gasolero')) {
            const replies = [
                "Yo prefiero ir gasolero, hostels y cocinar nosotros. Así estiramos el viaje.",
                "Tengo un presupuesto medio, ni tan de lujo ni sufriendo jaja.",
                "Me gusta darme algunos gustos con la comida, pero en hospedaje ahorro."
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }

        if (text.includes('viaje') || text.includes('ir') || text.includes('lugar') || text.includes('destino')) {
            const replies = [
                "¡Me re copa la idea! Tengo muchas ganas de recorrer nuevos senderos.",
                "¡Obvio! Yo pongo el mate y vos las facturas 😉",
                "Suena genial. ¿Tenés un itinerario pensado o vamos viendo en el momento?"
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }

        // Default random replies if no keyword matched
        const defaultReplies = [
            "Jajaja, tal cual.",
            "Me parece perfecto.",
            "¿Vos qué decís? Yo me adapto.",
            "¡De una! Contá conmigo para esa.",
            "Interesante... contame un poco más de cómo viajás vos.",
            "¡Me encanta la idea! Pinta re bien."
        ];
        return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    }

    return {
        getAllChats,
        getChatHistory,
        addMessage,
        generateReply
    };
})();
