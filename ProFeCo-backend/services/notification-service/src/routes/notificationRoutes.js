import express from 'express';
import NotificationController from '../controllers/notification.controller.js';

const router = express.Router();
const notificationController = new NotificationController();

// =====================
// ENDPOINTS PÚBLICOS (para otros servicios)
// =====================

// NOTIFICACIONES DE OFERTAS GENERALES (llamado por Product-Service)
router.post('/ofertas', notificationController.enviarNotificacionOferta.bind(notificationController));

// NOTIFICACIONES DE WISHLIST (llamado por Product-Service)
router.post('/wishlist', notificationController.enviarNotificacionWishlist.bind(notificationController));

// =====================
// ENDPOINTS DE USUARIO (para frontend)
// =====================

// GESTIÓN DE PREFERENCIAS DE NOTIFICACIÓN
router.get('/preferencias/:usuario_id', notificationController.obtenerPreferencias.bind(notificationController));
router.put('/preferencias/:usuario_id', notificationController.actualizarPreferencias.bind(notificationController));

// HISTORIAL DE NOTIFICACIONES
router.get('/historial/:usuario_id', notificationController.obtenerHistorial.bind(notificationController));
router.patch('/historial/:notificacion_id/leida', notificationController.marcarComoLeida.bind(notificationController));

// =====================
// ENDPOINTS DE ADMINISTRACIÓN
// =====================

// ESTADÍSTICAS DEL SERVICIO
router.get('/admin/estadisticas', notificationController.obtenerEstadisticas.bind(notificationController));

// HEALTH CHECK (para load balancers y monitoreo)
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Notification Service',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

export default router;