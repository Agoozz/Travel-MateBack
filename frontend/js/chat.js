(function checkAuth() {
    if (!localStorage.getItem('user_name')) {
        window.location.replace('index.html');
    }
    window.addEventListener('pageshow', function(event) {
        if (event.persisted && !localStorage.getItem('user_name')) {
            window.location.replace('index.html');
        }
    });
})();

// Mensajes page logic
const contactsList = document.getElementById('contactsList');
const noChatsMsg = document.getElementById('noChatsMsg');
const activeChatContainer = document.getElementById('activeChatContainer');
const emptyStateContainer = document.getElementById('emptyStateContainer');
const activeChatAvatar = document.getElementById('activeChatAvatar');
const activeChatName = document.getElementById('activeChatName');
const pageChatMessages = document.getElementById('pageChatMessages');
const pageTypingIndicator = document.getElementById('pageTypingIndicator');
const pageChatForm = document.getElementById('pageChatForm');
const pageChatInput = document.getElementById('pageChatInput');

let currentUserId = null;

function loadContacts() {
    const chats = ChatManager.getAllChats();
    const userIds = Object.keys(chats).sort((a, b) => chats[b].lastUpdate - chats[a].lastUpdate);
    
    if (userIds.length === 0) {
        noChatsMsg.classList.remove('d-none');
        return;
    }
    
    noChatsMsg.classList.add('d-none');
    contactsList.innerHTML = ''; // Clear previous

    userIds.forEach(id => {
        const chat = chats[id];
        const lastMsg = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : '';
        
        const item = document.createElement('div');
        // Using Bootstrap list-group-item instead of custom chat-item
        item.className = `list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${currentUserId === id ? 'active' : ''}`;
        item.dataset.id = id;
        item.style.cursor = 'pointer'; // Safe dynamic inline style for JS action
        item.innerHTML = `
            <img src="${chat.avatar}" class="rounded-circle object-fit-cover" width="50" height="50">
            <div class="flex-grow-1 overflow-hidden">
                <div class="d-flex justify-content-between align-items-baseline">
                    <h6 class="mb-0 fw-bold">${chat.name}</h6>
                </div>
                <p class="mb-0 small text-muted text-truncate">${lastMsg}</p>
            </div>
        `;
        
        item.addEventListener('click', () => openChat(id, chat.name, chat.avatar));
        contactsList.appendChild(item);
    });
}

function appendMessage(text, type, animate = true) {
    const msgDiv = document.createElement('div');
    
    const baseClasses = "p-2 px-3 mb-2 rounded-4 shadow-sm w-75 position-relative";
    const typeClasses = type === 'sent' 
        ? "bg-success text-white align-self-end ms-auto" 
        : "bg-body-secondary text-body-emphasis align-self-start border border-light-subtle";
        
    msgDiv.className = `${baseClasses} ${typeClasses}`;
    if (!animate) msgDiv.style.animation = 'none';
    msgDiv.innerText = text;
    
    if (pageTypingIndicator.parentNode === pageChatMessages) {
        pageChatMessages.insertBefore(msgDiv, pageTypingIndicator);
    } else {
        pageChatMessages.appendChild(msgDiv);
    }
    pageChatMessages.scrollTop = pageChatMessages.scrollHeight;
}

function openChat(id, name, avatar) {
    currentUserId = id;
    emptyStateContainer.classList.add('d-none');
    activeChatContainer.classList.remove('d-none');
    
    activeChatName.innerText = name;
    activeChatAvatar.src = avatar;
    
    // Highlight contact
    document.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
    const activeEl = document.querySelector(`.list-group-item[data-id="${id}"]`);
    if (activeEl) activeEl.classList.add('active');

    // Load messages
    const chat = ChatManager.getChatHistory(id);
    pageChatMessages.innerHTML = '';
    pageChatMessages.appendChild(pageTypingIndicator); // put indicator back
    
    chat.messages.forEach(msg => {
        appendMessage(msg.text, msg.sender, false);
    });
}

pageChatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = pageChatInput.value.trim();
    if (text && currentUserId) {
        const targetName = activeChatName.innerText;
        const targetAvatarSrc = activeChatAvatar.src;
        
        ChatManager.addMessage(currentUserId, targetName, targetAvatarSrc, text, 'sent');
        appendMessage(text, 'sent');
        pageChatInput.value = '';
        loadContacts(); // update last message preview
        
        // Simulate reply
        setTimeout(() => {
            pageTypingIndicator.classList.remove('d-none');
            pageTypingIndicator.classList.add('d-flex');
            pageChatMessages.scrollTop = pageChatMessages.scrollHeight;
            
            setTimeout(() => {
                pageTypingIndicator.classList.add('d-none');
                pageTypingIndicator.classList.remove('d-flex');
                const reply = ChatManager.generateReply(text);
                ChatManager.addMessage(currentUserId, targetName, targetAvatarSrc, reply, 'received');
                appendMessage(reply, 'received');
                loadContacts();
            }, 1500 + Math.random() * 1500);
        }, 1000);
    }
});

// Initialize
loadContacts();
