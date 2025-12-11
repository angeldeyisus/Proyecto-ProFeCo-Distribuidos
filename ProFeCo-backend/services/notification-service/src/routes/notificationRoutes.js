import express from 'express';
import NotificationController from '../controllers/notification.controller.js';
import authNotificationService from '../services/authNotifications.service.js';

const router = express.Router();
const notificationController = new NotificationController();

// 👇 --- AGREGA ESTA RUTA NUEVA ---
// Esta es la ruta que recibe el evento 'producto_en_oferta' desde PriceController
router.post('/', async (req, res) => {
    try {
        const { evento, datos } = req.body;
        console.log(`📨 Evento recibido en raíz: ${evento}`);

        let resultado;

        if (evento === 'producto_en_oferta') {
            // Delegar al controlador o al orquestador
            // Opción A: Usar el método que ya tienes en el controller
            resultado = await notificationController.recibirEventoServicio(req, res);
        } else {
            console.log(`⚠️ Evento no manejado en raíz: ${evento}`);
            res.status(400).json({ success: false, message: 'Evento no soportado en raíz' });
        }
        
        // Si el controlador no responde (porque lo llamamos directamente), respondemos aquí
        if (!res.headersSent) {
             res.json({ success: true, message: 'Evento procesado', resultado });
        }

    } catch (error) {
        console.error('Error en ruta raíz:', error);
        if (!res.headersSent) res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/', notificationController.recibirEventoServicio.bind(notificationController));

// =====================
// MIDDLEWARE DE AUTENTICACIÓN ENTRE SERVICIOS
// =====================
const validateServiceToken = (req, res, next) => {
    const token = req.headers['x-service-token'];
    const validToken = process.env.SERVICE_SECRET_TOKEN || 'profeco_dev_token_123';
    
    console.log('🔐 Token recibido:', token);
    console.log('🔐 Token esperado:', validToken);
    
    if (!token || token !== validToken) {
        console.log('❌ Token inválido o no proporcionado');
        return res.status(401).json({
            success: false,
            message: 'Token de servicio inválido o no proporcionado'
        });
    }
    next();
};


// =====================
// WEBHOOKS PARA OTROS SERVICIOS (Requieren token)
// =====================

// WEBHOOK PARA EVENTOS DE AUTH-SERVICE
router.post(
    '/webhook/auth',
    validateServiceToken,
    notificationController.recibirEventoServicio.bind(notificationController)
);

router.post('/webhook/auth', validateServiceToken, async (req, res) => {
    try {
        const { evento, datos } = req.body;
        
        console.log('🎯 WEBHOOK recibido:', evento);
        console.log('📧 Email:', datos.email);
        
        // SOLO para desarrollo - enviar email simple
        if (evento === 'auth.user.registered') {
            console.log(`📧 Enviando email a: ${datos.email}`);
            
            const resultado = await emailService.enviarEmail(
                datos.email,
                '🎉 ¡Bienvenido a ProFeCo!',
                `Hola ${datos.nombre},\n\n¡Gracias por registrarte en ProFeCo!\n\nTu cuenta ha sido creada exitosamente como ${datos.tipo_usuario}.\n\nSaludos,\nEquipo ProFeCo`
            );
            
            console.log(`✅ Email ${resultado.success ? 'enviado' : 'fallido'}:`, resultado);
        }
        
        res.json({
            success: true,
            message: 'Webhook procesado',
            evento: evento
        });
        
    } catch (error) {
        console.error('Error en webhook:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});



// NOTIFICACIONES DE OFERTAS GENERALES (llamado por Product-Service)
router.post(
    '/ofertas',
    validateServiceToken,
    notificationController.enviarNotificacionOferta.bind(notificationController)
);

// NOTIFICACIONES DE WISHLIST (llamado por Product-Service)
router.post(
    '/wishlist',
    validateServiceToken,
    notificationController.enviarNotificacionWishlist.bind(notificationController)
);

// WEBHOOK PARA EVENTOS DE TIENDAS
router.post(
    '/webhook/store',
    validateServiceToken,
    notificationController.recibirEventoTienda.bind(notificationController)
);

// WEBHOOK PARA EVENTOS DE PROFECO
router.post(
    '/webhook/profeco',
    validateServiceToken,
    notificationController.recibirEventoProfeco.bind(notificationController)
);

// =====================
// ENDPOINTS DE USUARIO (para frontend - Requieren autenticación JWT)
// =====================

// MIDDLEWARE PARA AUTENTICACIÓN DE USUARIOS (JWT)
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token de autenticación requerido'
            });
        }
        
        // TODO: Validar JWT con auth-service
        // Por ahora, asumimos que el usuario_id viene en los params
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};

// GESTIÓN DE PREFERENCIAS DE NOTIFICACIÓN
router.get(
    '/preferencias/:usuario_id',
    authenticateUser,
    notificationController.obtenerPreferencias.bind(notificationController)
);

router.put(
    '/preferencias/:usuario_id',
    authenticateUser,
    notificationController.actualizarPreferencias.bind(notificationController)
);

// HISTORIAL DE NOTIFICACIONES
router.get(
    '/historial/:usuario_id',
    authenticateUser,
    notificationController.obtenerHistorial.bind(notificationController)
);

router.patch(
    '/historial/:notificacion_id/leida',
    authenticateUser,
    notificationController.marcarComoLeida.bind(notificationController)
);

// SUSCRIPCIONES PUSH (para notificaciones en tiempo real)
router.post(
    '/push/subscribe/:usuario_id',
    authenticateUser,
    notificationController.suscribirPush.bind(notificationController)
);

router.delete(
    '/push/unsubscribe/:usuario_id',
    authenticateUser,
    notificationController.desuscribirPush.bind(notificationController)
);

// =====================
// ENDPOINTS DE ADMINISTRACIÓN
// =====================

// ESTADÍSTICAS DEL SERVICIO
router.get(
    '/admin/estadisticas',
    validateServiceToken, // Solo servicios autorizados
    notificationController.obtenerEstadisticas.bind(notificationController)
);

// TESTEO DE NOTIFICACIONES (solo desarrollo)
if (process.env.NODE_ENV !== 'production') {
    router.post('/test/email', notificationController.enviarEmailPrueba.bind(notificationController));
    router.post('/test/webhook', notificationController.probarWebhook.bind(notificationController));
    router.post('/test/integracion', notificationController.probarIntegracionAuth.bind(notificationController));
}

// HEALTH CHECK (para load balancers y monitoreo)
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Notification Service',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        endpoints: {
            webhooks: ['/webhook/auth', '/webhook/store', '/webhook/profeco'],
            usuario: ['/preferencias/:id', '/historial/:id', '/push/subscribe/:id'],
            admin: ['/admin/estadisticas']
        }
    });
});

// RUTA PARA OBTENER INFO DEL SERVICIO
router.get('/info', (req, res) => {
    res.json({
        service: 'Notification Service',
        description: 'Servicio de notificaciones para ProFeCo',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        supports: ['email', 'push', 'in-app', 'sms'],
        integrations: ['auth-service', 'product-service', 'store-service']
    });
});

export default router;