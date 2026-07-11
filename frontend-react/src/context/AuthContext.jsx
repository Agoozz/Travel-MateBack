import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on load
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');
    
    if (storedToken && storedUserId) {
      setToken(storedToken);
      // Reconstruct user object from local storage for parity
      setUser({
        _id: storedUserId,
        nombre: localStorage.getItem('user_name') || '',
        email: localStorage.getItem('user_email') || '',
        avatar: localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150?img=12',
      });
    }
    setLoading(false);
  }, []);

  const login = (newToken, userData) => {
    // Save to state
    setToken(newToken);
    setUser(userData);

    // Save to localStorage exactly like vanilla for parity
    localStorage.setItem("token", newToken);
    localStorage.setItem("user_id", userData._id);
    localStorage.setItem("user_name", userData.nombre || "");
    localStorage.setItem("user_email", userData.email || "");
    localStorage.setItem("user_age", userData.edad || "");
    localStorage.setItem("user_hometown", userData.ubicacion || "");
    localStorage.setItem("user_bio", userData.bio || "");
    localStorage.setItem("user_avatar", userData.avatar || "https://i.pravatar.cc/150?img=12");
    localStorage.setItem("user_travel_style", userData.estiloViaje || "");
    localStorage.setItem("user_travel_style_key", userData.estiloViaje || "");
    localStorage.setItem("user_budget", userData.presupuesto || "");
    localStorage.setItem("user_companion_style", userData.estiloCompanero || "");
    localStorage.setItem("user_regions", JSON.stringify(userData.regiones || []));
    localStorage.setItem("user_destination", userData.destino || "");
    localStorage.setItem("user_start_date", userData.fechaInicio || "");
    localStorage.setItem("user_end_date", userData.fechaFin || "");
    localStorage.setItem("user_profile_progress", userData.progresoPerfil || 0);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
    // Preserve chats logic from Vanilla
    const chatKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("mateAndTravelChats")
    );
    const chatData = chatKeys.map((k) => ({
      key: k,
      val: localStorage.getItem(k),
    }));
    
    localStorage.clear();
    
    chatData.forEach((c) => localStorage.setItem(c.key, c.val));
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
