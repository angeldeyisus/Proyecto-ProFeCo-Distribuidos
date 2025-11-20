import express from 'express';
import cors from 'cors';
import { AuthController } from './src/controllers/auth.controller.js';

const app = express();
const PORT = process.env.PORT || 3001;
const authController = new AuthController();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/auth/register', (req, res) => authController.registrar(req, res));
app.post('/api/auth/login', (req, res) => authController.login(req, res));
app.get('/api/auth/profile/:usuarioId', (req, res) => authController.obtenerPerfil(req, res));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'auth-service',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
  console.log(`📝 Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/api/auth/profile/:id`);
});