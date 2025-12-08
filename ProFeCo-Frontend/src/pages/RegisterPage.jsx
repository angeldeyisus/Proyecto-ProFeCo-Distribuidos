import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Agregué nuevos iconos para los campos de tienda
import { 
  UserPlus, Mail, Lock, User, Building2, ArrowRight, 
  MapPin, Phone, Clock, Store, Upload 
} from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Agregamos los campos de tienda al estado inicial
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo_usuario: 'CONSUMIDOR',
    // Campos exclusivos de tienda
    nombre_tienda: '',
    direccion: '',
    telefono: '',
    horario: '',
    logo: null // Aquí guardaremos el archivo
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Nueva función para manejar la subida del logo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // IMPORTANTE: Para enviar archivos (logo), debemos usar FormData
      // ya no podemos enviar el objeto JSON directo.
      const dataToSend = new FormData();
      
      // Datos comunes
      dataToSend.append('nombre', formData.nombre);
      dataToSend.append('email', formData.email);
      dataToSend.append('password', formData.password);
      dataToSend.append('tipo_usuario', formData.tipo_usuario);

      // Si es tienda, agregamos los datos extra
      if (formData.tipo_usuario === 'TIENDA') {
        dataToSend.append('nombre_tienda', formData.nombre_tienda);
        dataToSend.append('direccion', formData.direccion);
        dataToSend.append('telefono', formData.telefono);
        dataToSend.append('horario', formData.horario);
        
        if (formData.logo) {
          dataToSend.append('logo', formData.logo);
        }
      }

      // Al usar FormData, axios configura automáticamente el header 'Content-Type': 'multipart/form-data'
      await api.post('/auth/register', dataToSend);
      
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
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
        
        {/* Lado Derecho - Decorativo */}
        <div className="w-full md:w-1/2 bg-profeco-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
          <div className="relative z-10 text-right">
            <UserPlus size={48} className="mb-6 ml-auto opacity-90" />
            <h1 className="text-4xl font-bold mb-4">Únete a ProFeCo</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              {formData.tipo_usuario === 'TIENDA' 
                ? "Registra tu comercio, gestiona tu inventario y llega a más consumidores."
                : "Crea tu cuenta para reportar precios y encontrar las mejores ofertas."}
            </p>
          </div>
        </div>

        {/* Lado Izquierdo - Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
          <p className="text-gray-500 mb-6">Completa tus datos para comenzar.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Selector de Rol - Lo moví al principio para definir el flujo */}
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
                {/* <option value="PROFECO">Agente Profeco</option> */}
              </select>
            </div>

            {/* Datos Básicos (Siempre visibles) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="nombre"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                placeholder="Nombre completo del usuario"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

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

            {/* --- SECCIÓN CONDICIONAL: DATOS DE LA TIENDA --- */}
            {formData.tipo_usuario === 'TIENDA' && (
              <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="text-sm font-semibold text-profeco-600 uppercase tracking-wider">Datos del Establecimiento</h3>
                
                {/* Nombre de la Tienda */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="nombre_tienda"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                    placeholder="Nombre comercial de la tienda"
                    value={formData.nombre_tienda}
                    onChange={handleChange}
                  />
                </div>

                {/* Dirección */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="direccion"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                    placeholder="Dirección completa"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </div>

                {/* Teléfono y Horario (Grid de 2 columnas) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="tel"
                        name="telefono"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="horario"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                        placeholder="Ej: 9am - 6pm"
                        value={formData.horario}
                        onChange={handleChange}
                    />
                    </div>
                </div>

                {/* Input de Logo (Archivo) */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                    <input
                        type="file"
                        name="logo"
                        id="logo-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                            {formData.logo ? formData.logo.name : "Subir logo de la tienda (Opcional)"}
                        </span>
                    </label>
                </div>
              </div>
            )}
            {/* --- FIN SECCIÓN CONDICIONAL --- */}

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