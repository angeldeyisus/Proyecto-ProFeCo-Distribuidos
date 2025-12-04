import { useState } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { ShoppingBag, Lock, Mail, ArrowRight } from 'lucide-react'; 
// 👇 Importamos Link para poder navegar
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook para redireccionar manualmente si hiciera falta
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Llamamos a la función del contexto
    const success = await login(formData.email, formData.password);
    
    if (success) {
      // Si el login fue exitoso, el AuthContext actualiza el estado 'isAuthenticated'
      // y el componente App.jsx automáticamente nos mostrará el Home.
      // Pero por seguridad, podemos forzar la navegación:
      navigate('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Lado Izquierdo - Decorativo */}
        <div className="w-full md:w-1/2 bg-profeco-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
          <div className="relative z-10">
            <ShoppingBag size={48} className="mb-6 opacity-90" />
            <h1 className="text-4xl font-bold mb-4">ProFeCo Digital</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              La plataforma inteligente para comparar precios, gestionar ofertas y proteger tu economía.
            </p>
          </div>
        </div>

        {/* Lado Derecho - Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
          <p className="text-gray-500 mb-8">Ingresa tus credenciales para acceder al sistema.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 focus:border-transparent outline-none transition-all"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-profeco-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-profeco-600 transition-all transform active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Verificando...' : 'Entrar al Sistema'}
              {!isLoading && <ArrowRight size={20} />}
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            {/* 👇 AQUÍ ESTÁ EL CAMBIO IMPORTANTE: Usamos Link to="/register" */}
            <Link to="/register" className="text-profeco-600 font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}