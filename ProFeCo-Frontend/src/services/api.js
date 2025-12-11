import axios from 'axios';

// Creamos una instancia de Axios con la configuración base
const api = axios.create({
  baseURL: 'http://localhost:3004/api', // La URL de tu Backend Unificado
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTORES (Middleware del Frontend) ---

// 1. Interceptor de Solicitud (Request):
// Antes de que salga la petición, le pegamos el token si existe.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('profeco_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Interceptor de Respuesta (Response):
// Si el backend nos dice "401 No Autorizado" (Token vencido o falso),
// borramos el token y mandamos al usuario al login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si no es la página de login, redirigimos
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('profeco_token');
        localStorage.removeItem('profeco_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;