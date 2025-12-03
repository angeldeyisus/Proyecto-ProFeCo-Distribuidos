// services/auth-service/src/routes/authRoutes.js
import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();
const authController = new AuthController();

// RUTAS PÚBLICAS
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// RUTAS PROTEGIDAS
router.get('/verify', authenticateToken, authController.verifyToken.bind(authController));
router.get('/profile', authenticateToken, authController.getProfile.bind(authController));
router.post('/logout', authenticateToken, authController.logout.bind(authController));

// RUTAS ADMIN (solo para PROFECO y SUPER_ADMIN)
router.get('/admin/users', 
  authenticateToken, 
  requireRole(['PROFECO', 'SUPER_ADMIN']), 
  (req, res) => {
    res.json({ message: 'Acceso admin permitido' });
  }
);

export default router;