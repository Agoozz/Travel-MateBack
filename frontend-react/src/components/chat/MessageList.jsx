import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function MessageList({ messages, isTyping, emptyState }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4 overflow-y-auto">
        {emptyState}
      </div>
    );
  }

  return (
    <div className="flex-grow-1 overflow-y-auto p-4 d-flex flex-column custom-scrollbar">
      {messages.map((msg, index) => (
        <MessageBubble 
          key={msg.id} 
          message={msg} 
          isLast={index === messages.length - 1 && !isTyping} 
        />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={endRef} />
    </div>
  );
}
