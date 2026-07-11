import { useEffect } from 'react';
import { useMessages } from '../../hooks/useMessages';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';

export default function ChatPanel({ targetUser, onClose }) {
  const {
    messages,
    loadingMessages,
    sending,
    isOfflineMode,
    isTyping,
    selectContact,
    sendMessage
  } = useMessages();

  // Select the user when the panel opens to start loading messages
  useEffect(() => {
    if (targetUser) {
      selectContact(targetUser);
    }
  }, [targetUser, selectContact]);

  if (!targetUser) return null;

  return (
    <div 
      className="position-fixed bottom-0 end-0 m-3 m-md-4 shadow-lg rounded-top-4 overflow-hidden d-flex flex-column bg-light-subtle fade-in" 
      style={{ width: "350px", height: "450px", zIndex: 1060 }}
    >
      <ChatHeader 
        user={targetUser} 
        isOfflineMode={isOfflineMode} 
        onClose={onClose} 
      />
      
      {loadingMessages ? (
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-white p-4">
          <div className="spinner-border text-success spinner-border-sm mb-2" role="status"></div>
          <span className="small text-muted">Cargando historial...</span>
        </div>
      ) : (
        <div className="flex-grow-1 bg-white overflow-hidden d-flex flex-column">
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
            emptyState={
              <div className="text-center text-muted small mt-4">
                <i className="bi bi-chat-text fs-3 mb-2 d-block"></i>
                Enviá el primer mensaje para romper el hielo.
              </div>
            }
          />
        </div>
      )}

      <MessageComposer 
        onSendMessage={sendMessage} 
        disabled={loadingMessages || sending} 
      />
    </div>
  );
}
