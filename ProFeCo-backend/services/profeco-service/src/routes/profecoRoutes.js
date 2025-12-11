import { Router } from 'express';
import { ProfecoController } from '../controllers/profeco.controller.js';
import { authenticateToken } from '../../../auth-services/src/middleware/auth.js';

const router = Router();
const profecoController = new ProfecoController();

// Obtener el tablero de infractores
router.get('/tablero', authenticateToken, (req, res) => profecoController.obtenerTablero(req, res));

// Imponer multa
router.post('/multar', authenticateToken, (req, res) => profecoController.imponerMulta(req, res));

export default router;