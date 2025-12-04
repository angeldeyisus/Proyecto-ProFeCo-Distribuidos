import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// --- 1. COMPONENTE HOME TEMPORAL (Ruta Privada) ---
// Esto es lo que verán los usuarios cuando logren entrar.
// Más adelante, aquí pondremos el Dashboard real.
function HomeTemporal() {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full border-t-4 border-profeco-500">
        
        <h1 className="text-3xl font-bold text-green-600 mb-2">¡Bienvenido! 👋</h1>
        <p className="text-gray-500 mb-6">Has ingresado al Sistema ProFeCo</p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-left">
          <div className="mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Usuario</span>
            <p className="text-lg font-semibold text-gray-800">{user?.nombre}</p>
          </div>
          <div className="mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</span>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rol</span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-profeco-100 text-profeco-800">
              {user?.tipo_usuario}
            </span>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

// --- 2. PROTECCIÓN DE RUTAS (Seguridad Frontend) ---

// A. Ruta Protegida: Solo deja pasar si estás logueado
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  
  if (!isAuthenticated) {
    // Si no tienes sesión, ¡fuera! Te manda al login
    return <Navigate to="/login" replace />;
  }
  return children;
};

// B. Ruta Pública: Solo deja pasar si NO estás logueado (Login/Registro)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  if (isAuthenticated) {
    // Si ya tienes sesión, ¿para qué quieres ver el login? Vete al Home
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- 3. COMPONENTE PRINCIPAL APP ---
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Notificaciones globales (Arriba a la derecha) */}
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

          {/* --- Rutas Privadas (El Sistema Real) --- */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomeTemporal />
            </ProtectedRoute>
          } />

          {/* --- Comodín: Cualquier ruta desconocida va al login --- */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;