import express from 'express';
import cors from 'cors';
import { AuthController } from './src/controllers/auth.controller.js';

const app = express();
const PORT = process.env.PORT || 3001;
const authController = new AuthController();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`📍 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.post('/api/auth/register', (req, res) => authController.registrar(req, res));
app.post('/api/auth/login', (req, res) => authController.login(req, res));
app.get('/api/auth/profile/:usuarioId', (req, res) => authController.obtenerPerfil(req, res));

app.get('/api/auth/debug/usuarios', (req, res) => authController.listarUsuarios(req, res));
app.get('/api/auth/health/db', (req, res) => authController.healthCheck(req, res));

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'auth-service',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    mensaje: '🚀 Auth Service - ProFeCo (PostgreSQL)',
    endpoints: {
      registrar: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      perfil: 'GET /api/auth/profile/:id',
      health: 'GET /health',
      debug: 'GET /api/auth/debug/usuarios'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.listen(PORT, () => {
  console.log('🚀 ==========================================');
  console.log('🚀 Auth Service - PostgreSQL');
  console.log('🚀 Puerto:', PORT);
  console.log('🚀 Base de datos: PostgreSQL');
  console.log('🚀 ==========================================');
  console.log('📝 Endpoints:');
  console.log('   POST http://localhost:' + PORT + '/api/auth/register');
  console.log('   POST http://localhost:' + PORT + '/api/auth/login');
  console.log('   GET  http://localhost:' + PORT + '/api/auth/profile/:id');
  console.log('   GET  http://localhost:' + PORT + '/health');
  console.log('   GET  http://localhost:' + PORT + '/api/auth/debug/usuarios');
  console.log('🚀 ==========================================');
});