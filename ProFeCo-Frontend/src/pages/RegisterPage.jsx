import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo_usuario: 'CONSUMIDOR' // Valor por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Llamamos al endpoint de registro que creamos en el backend
      await api.post('/auth/register', formData);
      
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
      // Redirigir al login después de un registro exitoso
      navigate('/login');
      
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Error al registrarse';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        {/* Lado Derecho - Decorativo (Invertido respecto al Login) */}
        <div className="w-full md:w-1/2 bg-profeco-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
          <div className="relative z-10 text-right">
            <UserPlus size={48} className="mb-6 ml-auto opacity-90" />
            <h1 className="text-4xl font-bold mb-4">Únete a ProFeCo</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Crea tu cuenta para reportar precios, gestionar tu tienda o encontrar las mejores ofertas.
            </p>
          </div>
        </div>

        {/* Lado Izquierdo - Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
          <p className="text-gray-500 mb-6">Completa tus datos para comenzar.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nombre */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="nombre"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                placeholder="Contraseña segura"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Selector de Rol */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="tipo_usuario"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none bg-white text-gray-700"
                value={formData.tipo_usuario}
                onChange={handleChange}
              >
                <option value="CONSUMIDOR">Consumidor</option>
                <option value="TIENDA">Dueño de Tienda</option>
                <option value="PROFECO">Agente Profeco</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-profeco-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-profeco-600 transition-all ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
              {!loading && <ArrowRight size={20} />}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-profeco-600 font-semibold hover:underline">
              Inicia Sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}