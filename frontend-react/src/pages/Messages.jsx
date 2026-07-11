import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import ConversationList from '../components/messages/ConversationList';
import EmptyConversationList from '../components/messages/EmptyConversationList';
import EmptyConversation from '../components/messages/EmptyConversation';
import MessagesLoading from '../components/messages/MessagesLoading';
import MessagesError from '../components/messages/MessagesError';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageComposer from '../components/chat/MessageComposer';
import './Messages.css';

export default function Messages() {
  const {
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
    sendMessage
  } = useMessages();

  // Para responsive: si hay un usuario seleccionado, en mobile ocultamos la lista.
  const [showMobileList, setShowMobileList] = useState(true);

  const handleSelectContact = (contact) => {
    selectContact(contact);
    setShowMobileList(false); // Ocultar lista en celular
  };

  const handleBackToList = () => {
    setShowMobileList(true);
  };

  return (
    <div className="container-fluid py-4 max-w-1200 mx-auto h-100 fade-in message-container">
      <div className="row h-100 g-4">
        
        {/* Columna Izquierda: Lista de Contactos */}
        <div className={`col-md-5 col-lg-4 h-100 ${showMobileList ? 'd-block' : 'd-none d-md-block'}`}>
          <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden d-flex flex-column">
            <div className="card-header bg-white border-bottom p-3">
              <h5 className="fw-bold mb-0">Mensajes</h5>
            </div>
            
            <div className="flex-grow-1 overflow-hidden">
              {loadingContacts ? (
                <MessagesLoading text="Cargando contactos..." />
              ) : contacts.length > 0 ? (
                <ConversationList 
                  contacts={contacts} 
                  selectedUserId={selectedUser?.id}
                  onSelectContact={handleSelectContact}
                />
              ) : (
                <EmptyConversationList />
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Área de Chat */}
        <div className={`col-md-7 col-lg-8 h-100 ${!showMobileList ? 'd-block' : 'd-none d-md-block'}`}>
          <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden d-flex flex-column bg-light-subtle position-relative">
            
            <MessagesError error={error} />

            {selectedUser ? (
              <>
                <ChatHeader 
                  user={selectedUser} 
                  isOfflineMode={isOfflineMode} 
                  onClose={handleBackToList}
                />
                
                {loadingMessages ? (
                  <MessagesLoading text="Cargando historial..." />
                ) : (
                  <MessageList 
                    messages={messages}
                    isTyping={isTyping}
                  />
                )}

                <MessageComposer 
                  onSendMessage={sendMessage} 
                  disabled={loadingMessages || sending}
                />
              </>
            ) : (
              <EmptyConversation />
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
