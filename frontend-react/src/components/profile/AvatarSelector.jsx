export default function AvatarSelector({ selectedAvatar, onSelect }) {
  const avatarOptions = [
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=32",
    "https://i.pravatar.cc/150?img=44",
    "https://i.pravatar.cc/150?img=47",
    "https://i.pravatar.cc/150?img=68"
  ];

  return (
    <div className="d-flex flex-wrap justify-content-start gap-3">
      {avatarOptions.map((url, idx) => (
        <img 
          key={idx}
          src={url} 
          alt={`Avatar option ${idx + 1}`} 
          className={`rounded-circle cursor-pointer transition-all ${selectedAvatar === url ? 'border border-4 border-success shadow-sm' : 'border border-4 border-transparent opacity-75 hover-opacity-100'}`}
          style={{ width: "60px", height: "60px", cursor: "pointer", transition: "all 0.2s" }}
          onClick={() => onSelect(url)}
        />
      ))}
    </div>
  );
}
