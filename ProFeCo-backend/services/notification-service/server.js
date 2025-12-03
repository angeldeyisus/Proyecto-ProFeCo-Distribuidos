// ⚠️ IMPORTANTE: dotenv DEBE ir primero, antes de cualquier import que use variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Ahora sí, importar el resto después de cargar las variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes (estos pueden importar servicios que usan process.env)
import notificationRoutes from './src/routes/notificationRoutes.js';

// Configuración
const app = express();
const PORT = process.env.PORT || 3004;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/profeco-notifications';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Conectado a MongoDB - Notification Service');
})
.catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
});

// Routes
app.use('/api/notifications', notificationRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: '📨 Notification Service - Profeco API',
        version: '1.0.0',
        endpoints: {
            notifications: '/api/notifications',
            health: '/api/notifications/health'
        },
        description: 'Servicio de notificaciones por email, push y WebSockets'
    });
});

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.originalUrl}`
    });
});

// Manejo global de errores
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`📨 Notification Service ejecutándose en puerto ${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/api/notifications/health`);
    console.log(`🎯 Endpoints disponibles:`);
    console.log(`   POST http://localhost:${PORT}/api/notifications/ofertas`);
    console.log(`   POST http://localhost:${PORT}/api/notifications/wishlist`);
    console.log(`   GET  http://localhost:${PORT}/api/notifications/preferencias/:usuario_id`);
    console.log(`   GET  http://localhost:${PORT}/api/notifications/historial/:usuario_id`);
    console.log(`\n💡 Variables de entorno cargadas correctamente`);
});

export default app;