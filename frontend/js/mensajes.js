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
    


    // Fetch companion profiles from local backend API
    let companionProfilesData = {};
    let activeItems = [];
    const itemsPerPage = 3;
    let totalPages = 0;
    let currentPage = 1;

    async function loadCompanionProfiles() {
        try {
            const res = await fetch('http://localhost:3000/api/perfiles');
            const data = await res.json();
            
            // Map the API data to the format expected by the frontend
            data.perfiles.forEach(p => {
                companionProfilesData[p._id] = {
                    _id: p._id,
                    name: p.nombre,
                    age: p.edad,
                    location: p.ubicacion,
                    type: p.estiloViaje,
                    about: p.bio,
                    destination: p.destino,
                    dates: (p.fechaInicio && p.fechaFin) ? `${p.fechaInicio.substring(0,10)} - ${p.fechaFin.substring(0,10)}` : 'Por definir',
                    budget: p.presupuesto,
                    style: p.estiloViaje,
                    interests: p.intereses || [],
                    languages: (p.idiomas || []).join(', '),
                    avatar: p.avatar || 'https://i.pravatar.cc/150?img=11'
                };
            });
            
            // Generate DOM elements for the profiles
            generateProfilesDOM(data.perfiles);
            
        } catch (error) {
            console.error('Error fetching profiles:', error);
            // Fallback to basic error display
        }
    }
    
    function generateProfilesDOM(perfiles) {
        const container = document.querySelector('.col-12'); // The parent row container
        if (!container) return;
        
        container.innerHTML = ''; // Clear hardcoded or empty items
        
        perfiles.forEach(p => {
            const profile = companionProfilesData[p._id];
            
            const card = document.createElement('div');
            card.className = 'card rounded-4 shadow-sm border-0 mb-4 companion-item';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body p-0';
            
            const row = document.createElement('div');
            row.className = 'row align-items-center p-3 p-md-0';
            
            // Avatar col
            const colImg = document.createElement('div');
            colImg.className = 'col-md-3 text-center py-md-4';
            const img = document.createElement('img');
            img.src = profile.avatar;
            img.alt = profile.name;
            img.className = 'rounded-circle border border-3 border-success-subtle shadow-sm object-fit-cover';
            img.width = 110;
            img.height = 110;
            colImg.appendChild(img);
            
            // Info col
            const colInfo = document.createElement('div');
            colInfo.className = 'col-md-6 py-2';
            
            const headerDiv = document.createElement('div');
            headerDiv.className = 'd-flex align-items-center gap-2 flex-wrap mb-2';
            const badgeAfinidad = document.createElement('span');
            badgeAfinidad.className = 'badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-10';
            badgeAfinidad.textContent = (p.afinidad || 80) + '% Afinidad';
            const h4 = document.createElement('h4');
            h4.className = 'fw-bold mb-0 text-body-emphasis';
            h4.textContent = `${profile.name} · ${profile.age}`;
            headerDiv.appendChild(badgeAfinidad);
            headerDiv.appendChild(h4);
            
            const pStyle = document.createElement('p');
            pStyle.className = 'text-body-secondary small mb-2';
            pStyle.textContent = profile.style;
            
            const pLoc = document.createElement('p');
            pLoc.className = 'text-body-secondary small mb-2';
            pLoc.textContent = profile.location;
            
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'd-flex gap-2 flex-wrap mb-3';
            
            const createTag = (text) => {
                const span = document.createElement('span');
                span.className = 'badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small';
                span.textContent = text;
                return span;
            };
            tagsDiv.appendChild(createTag(profile.destination));
            tagsDiv.appendChild(createTag(profile.style));
            tagsDiv.appendChild(createTag(profile.budget));
            
            const pBio = document.createElement('p');
            pBio.className = 'text-body-secondary small mb-0 lh-sm line-clamp-2';
            pBio.textContent = profile.about;
            
            colInfo.appendChild(headerDiv);
            colInfo.appendChild(pStyle);
            colInfo.appendChild(pLoc);
            colInfo.appendChild(tagsDiv);
            colInfo.appendChild(pBio);
            
            // Action col
            const colAction = document.createElement('div');
            colAction.className = 'col-md-3 text-md-end p-md-4 d-flex flex-column justify-content-center';
            
            const btnView = document.createElement('button');
            btnView.className = 'btn btn-outline-success border-2 w-100 mb-2 rounded-pill fw-semibold py-2 btn-sm btn-view-profile';
            btnView.dataset.user = p._id;
            btnView.textContent = 'Ver perfil';
            
            const btnInvite = document.createElement('button');
            btnInvite.className = 'btn btn-success bg-gradient text-white rounded-pill w-100 py-2 btn-sm d-flex align-items-center justify-content-center gap-2';
            btnInvite.textContent = 'Invitar un mate';
            
            colAction.appendChild(btnView);
            colAction.appendChild(btnInvite);
            
            row.appendChild(colImg);
            row.appendChild(colInfo);
            row.appendChild(colAction);
            cardBody.appendChild(row);
            card.appendChild(cardBody);
            
            container.appendChild(card);
        });
        
        // Re-init variables for pagination and events after DOM creation
        companionItems = Array.from(document.querySelectorAll('.companion-item'));
        activeItems = [...companionItems];
        totalPages = Math.ceil(activeItems.length / itemsPerPage);
        
        // Attach newly created elements to events
        document.querySelectorAll('.btn-view-profile').forEach(btn => {
            btn.addEventListener('click', function() {
                openCompanionModal(this.dataset.user);
            });
        });
        attachInviteEvents();
        renderCompanions();
    }
    
    // Call on load
    loadCompanionProfiles();

    const companionModal = document.getElementById('companionProfileModal');
    const bsCompanionModal = companionModal ? new bootstrap.Modal(companionModal) : null;

    function openCompanionModal(profileKey) {
        const profile = companionProfiles[profileKey] || companionProfiles.tomas;
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
            const createTag = (text) => {
                const span = document.createElement('span');
                span.className = 'badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small';
                span.textContent = text;
                return span;
            };
            tagsContainer.appendChild(createTag(profile.destination));
            tagsContainer.appendChild(createTag(profile.style));
            tagsContainer.appendChild(createTag(profile.budget));
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
            window.location.replace('index.html');
        });
    });

    let companionItems = [];
    // activeItems and itemsPerPage were defined globally above.

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

        // Rebuild pagination numbers using document.createElement
        paginationContainer.innerHTML = ''; // clear safely
        
        const createPageLi = (text, onClick, isActive, isDisabled) => {
            const li = document.createElement('li');
            li.className = `page-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
            const btn = document.createElement('button');
            const btnClass = isActive ? 'bg-success text-white' : 'text-success';
            btn.className = `page-link border-success ${btnClass} fw-semibold shadow-none`;
            btn.textContent = text;
            if (!isDisabled && onClick) {
                li.addEventListener('click', onClick);
            }
            li.appendChild(btn);
            return li;
        };

        const onPrev = (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderCompanions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        const onNext = (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderCompanions();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        const onPage = (pageIndex) => (e) => {
            e.preventDefault();
            currentPage = pageIndex;
            renderCompanions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        if (totalPages === 0) {
            paginationContainer.appendChild(createPageLi('Sin resultados', null, false, true));
        } else {
            paginationContainer.appendChild(createPageLi('Anterior', onPrev, false, currentPage === 1));
            
            for (let i = 1; i <= totalPages; i++) {
                paginationContainer.appendChild(createPageLi(i.toString(), onPage(i), i === currentPage, false));
            }
            
            paginationContainer.appendChild(createPageLi('Siguiente', onNext, false, currentPage === totalPages));
        }
    }

    // Render relies on fetch now, it's called inside loadCompanionProfiles

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
        const sentMates = JSON.parse(localStorage.getItem('sentMates') || '[]');
        
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerText.includes('Invitar un mate')) {
                // To prevent multiple bindings
                if (btn.dataset.inviteBound) return;
                btn.dataset.inviteBound = "true";
                
                let targetName = "Viajero";
                let targetAvatarSrc = "https://i.pravatar.cc/150?img=11";
                
                // Try to find context (is it in the modal or in a card?)
                const card = btn.closest('.companion-item');
                if (card) {
                    const nameEl = card.querySelector('h4');
                    if (nameEl) targetName = nameEl.innerText.split('·')[0].trim();
                    const imgEl = card.querySelector('img');
                    if (imgEl) targetAvatarSrc = imgEl.src;
                } else {
                    // Modal context
                    const nameEl = document.getElementById('modalCompanionName');
                    if (nameEl) targetName = nameEl.innerText.split('·')[0].trim();
                    const imgEl = document.getElementById('modalCompanionAvatar');
                    if (imgEl) targetAvatarSrc = imgEl.src;
                }
                
                // Check if already sent
                if (sentMates.includes(targetName)) {
                    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                    btn.classList.remove('btn-success', 'btn-outline-success');
                    btn.classList.add('btn-secondary');
                    btn.disabled = true;
                    return; // skip adding click event
                }
                
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Save to localStorage
                    const currentSent = JSON.parse(localStorage.getItem('sentMates') || '[]');
                    if (!currentSent.includes(targetName)) {
                        currentSent.push(targetName);
                        localStorage.setItem('sentMates', JSON.stringify(currentSent));
                    }
                    
                    // Disable button
                    this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                    this.classList.remove('btn-success', 'btn-outline-success');
                    this.classList.add('btn-secondary');
                    this.disabled = true;

                    // Flying mate animation
                    const mateIcon = document.createElement('div');
                    mateIcon.innerText = '🧉';
                    mateIcon.style.position = 'fixed';
                    mateIcon.style.left = e.clientX + 'px';
                    mateIcon.style.top = e.clientY + 'px';
                    mateIcon.style.fontSize = '2rem';
                    mateIcon.style.pointerEvents = 'none';
                    mateIcon.style.zIndex = '9999';
                    mateIcon.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    document.body.appendChild(mateIcon);

                    // Trigger reflow
                    mateIcon.getBoundingClientRect();

                    // Animate to center, spin and scale up
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const moveX = centerX - e.clientX - 16;
                    const moveY = centerY - e.clientY - 16;

                    mateIcon.style.transform = `translate(${moveX}px, ${moveY}px) scale(5) rotate(720deg)`;
                    mateIcon.style.opacity = '0';

                    setTimeout(() => mateIcon.remove(), 1200);

                    // 100% chance to match para la presentación
                    if (true) {
                        setTimeout(() => {
                            removeCompanionByName(targetName);
                            simulateMatchAndChat(targetName, targetAvatarSrc);
                        }, 1200);
                    }
                });
            }
        });
    }
    
    // Initial attach happens inside loadCompanionProfiles

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
    }

})();
