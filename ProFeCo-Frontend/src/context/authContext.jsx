import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; 
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificamos si ya hay una sesión guardada
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem('profeco_user');
      const token = localStorage.getItem('profeco_token');

      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error al leer sesión guardada:", error);
          localStorage.removeItem('profeco_user');
          localStorage.removeItem('profeco_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // 👇 AQUÍ ESTABA EL ERROR: El backend devuelve 'usuario', no 'user'
      // Usamos destructuring para renombrarlo: { usuario: user }
      const { usuario: user, token } = response.data.data;
      
      localStorage.setItem('profeco_token', token);
      localStorage.setItem('profeco_user', JSON.stringify(user));
      
      setUser(user);
      toast.success(`¡Bienvenido de nuevo, ${user.nombre}!`);
      return true;

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(msg);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('profeco_token');
    localStorage.removeItem('profeco_user');
    setUser(null);
    toast.dismiss();
    toast.success('Sesión cerrada correctamente');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isTienda: user?.tipo_usuario === 'TIENDA',
    isConsumidor: user?.tipo_usuario === 'CONSUMIDOR',
    isProfeco: user?.tipo_usuario === 'PROFECO'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};