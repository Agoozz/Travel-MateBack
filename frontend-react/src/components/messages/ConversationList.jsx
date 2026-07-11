import ConversationItem from './ConversationItem';

export default function ConversationList({ contacts, selectedUserId, onSelectContact }) {
  return (
    <div className="list-group list-group-flush h-100 overflow-y-auto custom-scrollbar bg-white">
      {contacts.map(contact => (
        <ConversationItem 
          key={contact.id}
          contact={contact}
          isActive={selectedUserId === contact.id}
          onClick={onSelectContact}
        />
      ))}
    </div>
  );
}
