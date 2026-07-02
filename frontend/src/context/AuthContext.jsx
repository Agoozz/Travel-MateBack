import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/usuarios/me');
          setUser(res.data.usuario);
        } catch (error) {
          console.error('Sesión expirada o inválida');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/usuarios/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.usuario);
  };

  const register = async (nombre, email, password) => {
    const res = await api.post('/usuarios/register', { nombre, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
