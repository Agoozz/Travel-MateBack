import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch Matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/matches');
        // Only keep confirmed matches
        const confirmedMatches = res.data.matches.filter(m => m.estado === 'matched');
        setMatches(confirmedMatches);

        // If navigated with state to open a chat, find it
        if (location.state?.openChatUserId && user) {
          const targetMatch = confirmedMatches.find(m => 
            (m.usuario1?._id === location.state.openChatUserId || m.usuario2?._id === location.state.openChatUserId)
          );
          if (targetMatch) {
            const other = targetMatch.usuario1._id === user._id ? targetMatch.usuario2 : targetMatch.usuario1;
            setActiveChat(other);
          }
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, [location.state, user]);

  // Fetch Messages for active chat
  const fetchMessages = async (userId) => {
    try {
      const res = await api.get(`/mensajes/${userId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Poll messages every 3 seconds
  useEffect(() => {
    if (!activeChat) return;
    
    fetchMessages(activeChat._id);
    const interval = setInterval(() => {
      fetchMessages(activeChat._id);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeChat]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat) return;
    try {
      await api.post('/mensajes', {
        receptorId: activeChat._id,
        texto: messageText
      });
      setMessageText('');
      fetchMessages(activeChat._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getOtherUser = (match) => {
    if (!user || !match.usuario1 || !match.usuario2) return null;
    return match.usuario1._id === user._id ? match.usuario2 : match.usuario1;
  };

  return (
    <div className="container-fluid min-vh-100 bg-body">
      <div className="row">
        {/* SIDEBAR (Shared with Dashboard) */}
        <aside className="col-lg-3 col-xl-2 bg-success-subtle border-end border-success-subtle min-vh-100 p-4 d-flex flex-column justify-content-between d-none d-lg-flex">
          <div>
            <div className="d-flex align-items-center gap-1 mb-2">
              <h3 className="fw-bold mb-0 fs-5"><span className="text-success">Mate</span> &amp; Travel</h3>
            </div>
            <p className="text-body-secondary small mb-4 lh-sm">
              Compañeres de viaje,<br />mejores recuerdos
            </p>

            <nav className="nav flex-column nav-pills gap-1">
              <Link to="/inicio" className="nav-link text-body-secondary link-success py-2 px-3 rounded-3">
                <i className="bi bi-compass me-2"></i> Explorar
              </Link>
              <Link to="/perfil" className="nav-link text-body-secondary link-success py-2 px-3 rounded-3">
                <i className="bi bi-person-circle me-2"></i> Mi Perfil
              </Link>
              <Link to="/mensajes" className="nav-link active bg-success text-white py-2 px-3 rounded-3">
                <i className="bi bi-chat-left-text me-2"></i> Mensajes
              </Link>
              <hr className="my-2 border-secondary opacity-25" />
              <Link to="/" className="nav-link text-danger link-danger py-2 px-3 rounded-3 mt-1 fw-semibold">
                <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
              </Link>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT - MESSAGES */}
        <main className="col-12 col-lg-9 col-xl-10 p-0 d-flex h-100 vh-100">
          
          {/* Chat List */}
          <div className="col-md-4 col-lg-4 border-end h-100 overflow-auto bg-body d-flex flex-column">
            <div className="p-3 border-bottom">
              <h4 className="fw-bold mb-3">Mensajes</h4>
              <div className="input-group rounded-pill overflow-hidden bg-body-tertiary border-0 shadow-sm">
                <span className="input-group-text border-0 bg-transparent px-3"><i className="bi bi-search text-body-secondary"></i></span>
                <input type="text" className="form-control border-0 bg-transparent shadow-none small" placeholder="Buscar chats..." />
              </div>
            </div>
            <div className="list-group list-group-flush flex-grow-1 overflow-auto">
              {matches.map(match => {
                const otherUser = getOtherUser(match);
                if (!otherUser) return null;
                const isActive = activeChat?._id === otherUser._id;
                
                return (
                  <button 
                    key={match._id} 
                    onClick={() => setActiveChat(otherUser)}
                    className={`list-group-item list-group-item-action d-flex align-items-center gap-3 p-3 border-0 border-bottom ${isActive ? 'bg-success-subtle' : ''}`}
                  >
                    <img src={otherUser.avatar} alt="Avatar" className="rounded-circle object-fit-cover" width="50" height="50" />
                    <div className="flex-grow-1 min-w-0 text-start">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="mb-0 fw-bold text-truncate">{otherUser.nombre}</h6>
                      </div>
                      <p className="mb-0 text-body-secondary small text-truncate text-success">¡Es un Match!</p>
                    </div>
                  </button>
                );
              })}
              {matches.length === 0 && (
                <div className="p-4 text-center text-body-secondary small">
                  Aún no tienes chats. ¡Ve a Explorar y envía unos mates!
                </div>
              )}
            </div>
          </div>

          {/* Active Chat */}
          {activeChat ? (
            <div className="col-md-8 col-lg-8 d-none d-md-flex flex-column h-100 bg-body-tertiary">
              <div className="p-3 bg-white border-bottom shadow-sm d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <img src={activeChat.avatar} alt="Avatar" className="rounded-circle object-fit-cover" width="45" height="45" />
                  <div>
                    <h6 className="mb-0 fw-bold">{activeChat.nombre}</h6>
                    <small className="text-success">En línea</small>
                  </div>
                </div>
                <button className="btn btn-light rounded-circle"><i className="bi bi-three-dots-vertical"></i></button>
              </div>
              
              <div className="flex-grow-1 p-4 overflow-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-body-secondary mt-5 pt-5">
                    <i className="bi bi-chat-dots fs-1 mb-3 d-block"></i>
                    Dile hola a {activeChat.nombre}
                  </div>
                ) : (
                  <div className="text-center mb-4"><span className="badge bg-secondary-subtle text-secondary rounded-pill fw-normal">Historial de Chat</span></div>
                )}
                
                {messages.map((msg, index) => {
                  const isMine = msg.emisor === user._id;
                  return (
                    <div key={msg._id || index} className={`d-flex gap-2 mb-3 ${isMine ? 'justify-content-end' : ''}`}>
                      {!isMine && <img src={activeChat.avatar} alt="Avatar" className="rounded-circle align-self-end" width="30" height="30" />}
                      <div className={`${isMine ? 'bg-success text-white' : 'bg-white'} p-3 rounded-4 ${isMine ? 'rounded-bottom-0' : 'rounded-bottom-0'} shadow-sm`} style={{maxWidth: '75%'}}>
                        <p className="mb-0 small">{msg.texto}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white border-top">
                <form className="d-flex gap-2" onSubmit={handleSendMessage}>
                  <input 
                    type="text" 
                    className="form-control rounded-pill px-4 shadow-none bg-body-tertiary border-0" 
                    placeholder="Escribe un mensaje..." 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button type="submit" disabled={!messageText.trim()} className="btn btn-success rounded-circle shadow-sm" style={{width: '45px', height: '45px'}}><i className="bi bi-send-fill"></i></button>
                </form>
              </div>
            </div>
          ) : (
            <div className="col-md-8 col-lg-8 d-none d-md-flex flex-column h-100 bg-body-tertiary justify-content-center align-items-center">
               <i className="bi bi-chat-square-heart text-success opacity-25 display-1 mb-3"></i>
               <h4 className="text-body-secondary">Selecciona un chat para comenzar</h4>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Nav */}
      <nav className="navbar fixed-bottom bg-body border-top d-lg-none p-2 shadow-lg z-3">
        <div className="container-fluid justify-content-around">
          <Link to="/inicio" className="text-body-secondary text-center text-decoration-none">
            <i className="bi bi-compass fs-4 d-block"></i>
          </Link>
          <Link to="/mensajes" className="text-success text-center text-decoration-none">
            <i className="bi bi-chat-left-text fs-4 d-block"></i>
          </Link>
          <Link to="/perfil" className="text-body-secondary text-center text-decoration-none">
            <i className="bi bi-person-circle fs-4 d-block"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Messages;
