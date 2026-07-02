import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TravelerTestModal from './components/TravelerTestModal';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

const MainLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const EmptyLayout = () => (
  <Outlet />
);

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <TravelerTestModal />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>
          
          <Route element={<EmptyLayout />}>
            <Route path="/login" element={<Login />} />
            
            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/inicio" element={<Dashboard />} />
              <Route path="/mensajes" element={<Messages />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
