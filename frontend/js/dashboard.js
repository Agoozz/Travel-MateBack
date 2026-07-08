(function() {
    const userName = localStorage.getItem('user_name');
    const profileProgress = localStorage.getItem('user_profile_progress');
    const travelStyle = localStorage.getItem('user_travel_style');

    // Update welcome subtitle dynamically if name is stored
    const subtitleEl = document.getElementById('welcomeSubtitle');
    if (subtitleEl && userName) {
        if (travelStyle) {
            subtitleEl.innerHTML = `Hola, <strong>${userName}</strong> (${travelStyle}). Explorá perfiles compatibles con tu estilo de viaje.`;
        } else {
            subtitleEl.innerHTML = `Hola, <strong>${userName}</strong>. Explorá perfiles compatibles con tu estilo de viaje.`;
        }
    }

    // Update sidebar progress bar
    const progressLine = document.getElementById('sidebarProgressBar');
    const progressTitle = document.getElementById('sidebarProgressTitle');
    const progressDesc = document.getElementById('sidebarProgressDesc');
    
    if (progressLine) {
        const progressVal = parseInt(profileProgress) || 0;
        progressLine.style.width = `${progressVal}%`;
        
        if (progressTitle) {
            if (progressVal >= 100) {
                progressTitle.innerText = "¡Perfil completo! 🧉";
                if (progressDesc) progressDesc.innerText = "Tu perfil está listo para conectar al 100%.";
            } else if (progressVal > 0) {
                progressTitle.innerText = `Perfil al ${progressVal}%`;
                if (progressDesc) progressDesc.innerText = "Completalo para obtener mejores afinidades.";
            }
        }
    }
    


    document.addEventListener('perfilesListos', function() {
    const companionProfiles = window.companionProfilesData || {};
    const companionModal = document.getElementById('companionProfileModal');
    const bsCompanionModal = companionModal ? new bootstrap.Modal(companionModal) : null;

    function openCompanionModal(profileKey) {
        const profile = companionProfiles[profileKey];
        if (!profile) return;
        window.currentModalUserId = profileKey;

        // Actualizar botón invitar del modal con el ID real
        const modalInviteBtn = document.querySelector('#companionProfileModal .btn-invitar');
        if (modalInviteBtn) {
            modalInviteBtn.dataset.user = profileKey;
            modalInviteBtn.dataset.inviteBound = "";
        }
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.innerText = value;
        };

        setText('modalCompanionName', `${profile.name} · ${profile.age}`);
        setText('modalCompanionLocation', profile.location);
        setText('modalCompanionType', profile.type);
        setText('modalCompanionAbout', profile.about);
        setText('modalCompanionDestination', profile.destination);
        setText('modalCompanionDates', profile.dates);
        setText('modalCompanionBudget', profile.budget);
        setText('modalCompanionStyle', profile.style);
        setText('modalCompanionLanguages', profile.languages);

        const avatarEl = document.getElementById('modalCompanionAvatar');
        if (avatarEl) avatarEl.src = profile.avatar;

        const tagsContainer = document.getElementById('modalCompanionTags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            const createTag = (text, icon) => {
                const span = document.createElement('span');
                span.className = 'badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small';
                span.innerHTML = `<i class="bi ${icon} text-success"></i> ${text}`;
                return span;
            };
            tagsContainer.appendChild(createTag(profile.destination, 'bi-map-fill'));
            tagsContainer.appendChild(createTag(profile.style, 'bi-backpack-fill'));
            tagsContainer.appendChild(createTag(profile.budget, 'bi-cash-stack'));
        }

        const interestsContainer = document.getElementById('modalCompanionInterests');
        if (interestsContainer) {
            interestsContainer.innerHTML = '';
            profile.interests.forEach(item => {
                const span = document.createElement('span');
                span.className = 'badge bg-success bg-opacity-10 text-success rounded-pill py-2 px-3 small';
                span.innerText = item;
                interestsContainer.appendChild(span);
            });
        }

        if (bsCompanionModal) {
            bsCompanionModal.show();
        }
    }

    document.querySelectorAll('.btn-view-profile').forEach(btn => {
        btn.addEventListener('click', function() {
            openCompanionModal(this.dataset.user);
        });
    });

    // Logout button in the top bar
    document.querySelectorAll('.btn-logout-profile').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'index.html';
        });
    });

    let companionItems = Array.from(document.querySelectorAll('.companion-item'));
    let activeItems = [...companionItems];
    const itemsPerPage = 3;
    let totalPages = Math.ceil(activeItems.length / itemsPerPage);
    let currentPage = 1;

    function removeCompanionByName(name) {
        const itemToRemove = companionItems.find(item => {
            const h4 = item.querySelector('h4');
            return h4 && h4.innerText.split('·')[0].trim() === name;
        });
        
        if (itemToRemove) {
            itemToRemove.remove(); // Remove from DOM
            
            // Remove from arrays
            companionItems = companionItems.filter(item => item !== itemToRemove);
            activeItems = activeItems.filter(item => item !== itemToRemove);
            
            // Adjust pagination and re-render
            totalPages = Math.ceil(activeItems.length / itemsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            } else if (totalPages === 0) {
                currentPage = 1;
            }
            renderCompanions();
        }
    }

    function renderCompanions() {
        // First hide all
        companionItems.forEach(item => item.classList.add('d-none'));

        // Determine slice to show
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;
        const pageItems = activeItems.slice(start, end);

        // Show them
        pageItems.forEach(item => item.classList.remove('d-none'));

        // Update pagination buttons visibility based on totalPages
        const paginationContainer = document.getElementById('companionsPagination');
        if (!paginationContainer) return;

        // Rebuild pagination numbers
        const prevBtnHtml = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}" id="prevPageBtn">
                                <button class="page-link border-success text-success fw-semibold shadow-none">Anterior</button>
                             </li>`;
        const nextBtnHtml = `<li class="page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}" id="nextPageBtn">
                                <button class="page-link border-success text-success fw-semibold shadow-none">Siguiente</button>
                             </li>`;
        
        let pagesHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage;
            const btnClass = isActive ? 'bg-success text-white' : 'text-success';
            pagesHtml += `<li class="page-item ${isActive ? 'active' : ''}" data-page="${i}">
                            <button class="page-link border-success ${btnClass} shadow-none">${i}</button>
                          </li>`;
        }

        if (totalPages === 0) {
            pagesHtml = `<li class="page-item disabled"><button class="page-link border-success text-muted shadow-none">Sin resultados</button></li>`;
        }

        paginationContainer.innerHTML = prevBtnHtml + pagesHtml + nextBtnHtml;

        // Re-attach events
        paginationContainer.querySelectorAll('.page-item[data-page]').forEach(li => {
            li.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = parseInt(this.getAttribute('data-page'));
                renderCompanions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        const prevBtn = document.getElementById('prevPageBtn');
        if (prevBtn && currentPage > 1) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage--;
                renderCompanions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        const nextBtn = document.getElementById('nextPageBtn');
        if (nextBtn && currentPage < totalPages) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage++;
                renderCompanions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    if (companionItems.length > 0) {
        renderCompanions();
    }

    // Search Logic
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function executeSearch() {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            activeItems = [...companionItems];
        } else {
            activeItems = companionItems.filter(item => {
                const textContent = item.innerText.toLowerCase();
                return textContent.includes(query);
            });
        }
        
        currentPage = 1;
        totalPages = Math.ceil(activeItems.length / itemsPerPage);
        renderCompanions();
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', executeSearch);
    }
    
    const btnClearSearch = document.getElementById('btnClearSearch');
    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (searchBtn) searchBtn.click();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch();
            }
        });
    }
    // Quick Filter Logic
    document.querySelectorAll('.quick-filter').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchInput && searchBtn) {
                searchInput.value = this.getAttribute('data-filter');
                executeSearch();
            }
        });
    });



    // ==========================================
    // MATCH & CHAT SIMULATION LOGIC
    // ==========================================
    
    const matchOverlay = document.getElementById('matchOverlay');
    const matchTargetAvatar = document.getElementById('matchTargetAvatar');
    const matchSubtitle = document.getElementById('matchSubtitle');
    const chatOffcanvasEl = document.getElementById('chatOffcanvas');
    let chatOffcanvas;
    if (chatOffcanvasEl) {
        chatOffcanvas = new bootstrap.Offcanvas(chatOffcanvasEl);
    }
    
    const chatMessages = document.getElementById('chatMessages');
    const chatTypingIndicator = document.getElementById('chatTypingIndicator');
    const chatName = document.getElementById('chatName');
    const chatAvatar = document.getElementById('chatAvatar');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    
    let currentChatUserId = null;
    
    function loadChatHistory(userId) {
        if (!chatMessages) return;
        
        // Clear current messages
        Array.from(chatMessages.children).forEach(child => {
            if (!child.classList.contains('typing-indicator')) {
                child.remove();
            }
        });
        
        const history = ChatManager.getChatHistory(userId);
        if (history && history.messages.length > 0) {
            history.messages.forEach(msg => {
                appendMessage(msg.text, msg.sender, false);
            });
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return history && history.messages.length > 0;
    }

    function simulateMatchAndChat(targetName, targetAvatarSrc) {
        const targetId = targetName.toLowerCase().replace(/\s+/g, '');
        currentChatUserId = targetId;
        
        // Setup User Avatar
        const matchUserAvatar = document.getElementById('matchUserAvatar');
        const userAvatarSrc = localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150?img=60';
        if (matchUserAvatar) matchUserAvatar.src = userAvatarSrc;

        // 1. Setup and Show Match Overlay
        if (matchTargetAvatar) matchTargetAvatar.src = targetAvatarSrc;
        if (matchSubtitle) matchSubtitle.classList.add('d-none');
        
        const matchModalEl = document.getElementById('matchModal');
        let bsMatchModal = null;
        if (matchModalEl) {
            bsMatchModal = new bootstrap.Modal(matchModalEl);
            bsMatchModal.show();
            setTimeout(() => {
                if (matchSubtitle) matchSubtitle.classList.remove('d-none');
            }, 800);
        }
        
        // Setup Chat Headers
        if (chatName) chatName.innerText = targetName;
        if (chatAvatar) chatAvatar.src = targetAvatarSrc;
        
        const hasHistory = loadChatHistory(targetId);

        // 2. Hide Match Overlay and Show Chat after 2.5s
        setTimeout(() => {
            if (bsMatchModal) bsMatchModal.hide();
            
            // If the user clicked "Invitar un mate" from the modal, close the modal first
            if (typeof bsCompanionModal !== 'undefined' && bsCompanionModal) {
                bsCompanionModal.hide();
            }
            
            setTimeout(() => {
                if (chatOffcanvas) chatOffcanvas.show();
                
                if (!hasHistory) {
                    // 3. Simulate "typing..." for the first time
                    setTimeout(() => {
                        if (chatTypingIndicator) chatTypingIndicator.classList.add('active');
                        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
                        
                        // 4. Simulate receiving a message
                        setTimeout(() => {
                            if (chatTypingIndicator) chatTypingIndicator.classList.remove('active');
                            const firstMsg = `¡Hola Mateo! Qué bueno coincidir 😊 ¿Tenés fechas pensadas para tu viaje? 🧉`;
                            ChatManager.addMessage(targetId, targetName, targetAvatarSrc, firstMsg, 'received');
                            appendMessage(firstMsg, 'received');
                        }, 2000);
                        
                    }, 800);
                }
            }, 300); // slight delay after match hides
            
        }, 3000);
    }
    
    function appendMessage(text, type, animate = true) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        
        const baseClasses = "p-2 px-3 mb-2 rounded-4 shadow-sm w-75 position-relative";
        const typeClasses = type === 'sent' 
            ? "bg-success text-white align-self-end ms-auto" 
            : "bg-body-secondary text-body-emphasis align-self-start border border-light-subtle";
            
        msgDiv.className = `${baseClasses} ${typeClasses}`;
        if (!animate) msgDiv.style.animation = 'none'; // Disable animation for history load
        msgDiv.innerText = text;
        
        // Insert before typing indicator
        if (chatTypingIndicator) {
            chatMessages.insertBefore(msgDiv, chatTypingIndicator);
        } else {
            chatMessages.appendChild(msgDiv);
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text && currentChatUserId) {
                const targetName = chatName.innerText;
                const targetAvatarSrc = chatAvatar.src;
                
                ChatManager.addMessage(currentChatUserId, targetName, targetAvatarSrc, text, 'sent');
                appendMessage(text, 'sent');
                chatInput.value = '';
                
                // Simulate reply if the user says something
                setTimeout(() => {
                    if (chatTypingIndicator) chatTypingIndicator.classList.add('active');
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    setTimeout(() => {
                        if (chatTypingIndicator) chatTypingIndicator.classList.remove('active');
                        const reply = ChatManager.generateReply(text);
                        ChatManager.addMessage(currentChatUserId, targetName, targetAvatarSrc, reply, 'received');
                        appendMessage(reply, 'received');
                    }, 1500 + Math.random() * 1500); // random delay 1.5s - 3.0s
                }, 1000);
            }
        });
    }

    // Attach click events to "Invitar un mate" buttons
    function attachInviteEvents() {
        document.querySelectorAll('.btn-invitar').forEach(btn => {
            if (btn.dataset.inviteBound) return;
            btn.dataset.inviteBound = "true";

            const targetId = btn.dataset.user;
            const card = btn.closest('.companion-item');
            let targetName = "Viajero";
            let targetAvatarSrc = "https://i.pravatar.cc/150?img=11";

            if (card) {
                const nameEl = card.querySelector('h4');
                if (nameEl) targetName = nameEl.innerText.split('·')[0].trim();
                const imgEl = card.querySelector('img');
                if (imgEl) targetAvatarSrc = imgEl.src;
            }

            if (!targetId) return;

            btn.addEventListener('click', async function(e) {
                e.preventDefault();

                this.disabled = true;
                const originalHTML = this.innerHTML;
                this.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Enviando...';

                // Animación mate volador
                const mateIcon = document.createElement('div');
                mateIcon.innerText = '🧉';
                mateIcon.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:2rem;pointer-events:none;z-index:9999;transition:all 1.2s cubic-bezier(0.34,1.56,0.64,1)`;
                document.body.appendChild(mateIcon);
                mateIcon.getBoundingClientRect();
                const moveX = window.innerWidth / 2 - e.clientX - 16;
                const moveY = window.innerHeight / 2 - e.clientY - 16;
                mateIcon.style.transform = `translate(${moveX}px,${moveY}px) scale(5) rotate(720deg)`;
                mateIcon.style.opacity = '0';
                setTimeout(() => mateIcon.remove(), 1200);

                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:3000/api/matches/invitar/${targetId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();

                    setTimeout(() => {
                        this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                        this.classList.remove('btn-success');
                        this.classList.add('btn-secondary');

                        if (data.hayMatch) {
                            removeCompanionByName(targetName);
                            simulateMatchAndChat(targetName, targetAvatarSrc);
                        }
                    }, 1200);

                } catch (err) {
                    console.warn('Backend offline. Simulando match localmente.');
                    setTimeout(() => {
                        this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                        this.classList.remove('btn-success');
                        this.classList.add('btn-secondary');

                        // En modo fallback, siempre simulamos que hay match
                        removeCompanionByName(targetName);
                        simulateMatchAndChat(targetName, targetAvatarSrc);
                    }, 1200);
                }
            });
        });
    }

    // Initial attach
    attachInviteEvents();

    // Back to top button logic
    const backToTopBtn = document.getElementById('btnBackToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('d-none');
                setTimeout(() => backToTopBtn.style.opacity = '1', 10);
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) backToTopBtn.classList.add('d-none');
                }, 300);
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    }); // end perfilesListos listener
})();
