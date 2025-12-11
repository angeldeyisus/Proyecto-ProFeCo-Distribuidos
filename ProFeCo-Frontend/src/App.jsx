import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importamos las páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard'; // <--- El nuevo componente principal

// --- PROTECCIÓN DE RUTAS ---

// A. Ruta Protegida: Solo deja pasar si estás logueado (Cualquier rol)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// B. Ruta Pública: Solo deja pasar si NO estás logueado (Login/Register)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- COMPONENTE PRINCIPAL ---
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        
        <Routes>
          {/* --- Rutas Públicas (Login y Registro) --- */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />

          {/* --- Rutas Privadas --- */}
          {/* Aquí cargamos DIRECTAMENTE el Dashboard */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;