// services/auth-service/src/routes/authRoutes.js
import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import eventDispatcher from '../services/eventDispatcher.service.js';

const router = express.Router();
const authController = new AuthController();

// RUTAS PÚBLICAS
router.post('/register', authController.registrar.bind(authController));
router.post('/login', authController.login.bind(authController));

// RUTAS PROTEGIDAS
router.get('/verify', authenticateToken, authController.verifyToken.bind(authController));
router.get('/profile', authenticateToken, authController.getProfile.bind(authController));
router.post('/logout', authenticateToken, authController.logout.bind(authController));

// Endpoint para verificar estado de servicios
router.get('/health', (req, res) => {
    res.json({
        success: true,
        service: 'Auth Service',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        endpoints: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            profile: 'GET /api/auth/profile',
            verify: 'GET /api/auth/verify',
            forgotPassword: 'POST /api/auth/forgot-password',
            resetPassword: 'POST /api/auth/reset-password'
        }
    });
});

// Endpoint para estadísticas de eventos
router.get('/services/stats', async (req, res) => {
    try {
        const dias = parseInt(req.query.dias) || 7;
        const stats = await eventDispatcher.obtenerEstadisticasEventos(dias);
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo estadísticas: ' + error.message
        });
    }
});

// RUTAS ADMIN (solo para PROFECO y SUPER_ADMIN)
router.get('/admin/users', 
  authenticateToken, 
  requireRole(['PROFECO', 'SUPER_ADMIN']), 
  (req, res) => {
    res.json({ message: 'Acceso admin permitido' });
  }
);

export default router;