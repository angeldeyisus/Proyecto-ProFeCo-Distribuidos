import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// --- 1. Importación de Rutas ---
import authRoutes from './services/auth-services/src/routes/authRoutes.js';
import productRoutes from './services/product-service/src/routes/productRoutes.js';
import priceRoutes from './services/product-service/src/routes/priceRoutes.js';
import notificationRoutes from './services/notification-service/src/routes/notificationRoutes.js';
// 👇 Importamos las rutas del nuevo servicio PROFECO
import profecoRoutes from './services/profeco-service/src/routes/profecoRoutes.js';

// --- 2. Configuración Inicial ---
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const prisma = new PrismaClient();

// --- 3. Middlewares Globales ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 4. Conexión a Bases de Datos ---

// A. Conexión a MongoDB (Inventario, Precios y PROFECO)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/profeco-main-db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('🍃 MongoDB Conectado (Inventario, Precios y Multas)'))
    .catch((err) => {
        console.error('❌ Error fatal conectando a MongoDB:', err);
    });

// --- 5. Health Check Global ---
app.get('/health', async (req, res) => {
    let pgStatus = 'Desconectado 🔴';
    let mongoStatus = 'Desconectado 🔴';

    // Verificar PostgreSQL
    try {
        await prisma.$queryRaw`SELECT 1`;
        pgStatus = 'Conectado ✅';
    } catch (e) {
        pgStatus = `Error ❌ (${e.message})`;
    }

    // Verificar MongoDB
    if (mongoose.connection.readyState === 1) {
        mongoStatus = 'Conectado ✅';
    }

    res.json({
        status: 'Sistema ProFeCo Activo 🚀',
        mode: 'Microservices Integrated',
        timestamp: new Date().toISOString(),
        databases: {
            postgresql: pgStatus,
            mongodb: mongoStatus
        },
        // Agregamos 'Profeco' a la lista de servicios activos
        services_mounted: ['Auth', 'Products', 'Prices', 'Notifications', 'Profeco'] 
    });
});

// --- 6. Definición de Rutas Maestras ---

// Auth Service
app.use('/api/auth', authRoutes);

// Product & Inventory Service
app.use('/api/products', productRoutes);
app.use('/api/prices', priceRoutes);

// Notification Service 
app.use('/api/notifications', notificationRoutes);

// 👇 Profeco Service (Nuevo)
app.use('/api/profeco', profecoRoutes);


// --- 7. Manejo de Errores Global ---
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `❌ Ruta no encontrada: ${req.originalUrl}`
    });
});

app.use((error, req, res, next) => {
    console.error('🔥 Error Crítico del Servidor:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Consulte los logs del servidor'
    });
});

// --- 8. Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 SERVIDOR PROFECO CORRIENDO EN PUERTO ${PORT}`);
    console.log(`==================================================`);
    console.log(`👉 Health Check:        http://localhost:${PORT}/health`);
    console.log(`📝 Auth:                http://localhost:${PORT}/api/auth`);
    console.log(`📦 Productos:           http://localhost:${PORT}/api/products`);
    console.log(`🏷️  Precios:             http://localhost:${PORT}/api/prices`);
    console.log(`🔔 Notificaciones:      http://localhost:${PORT}/api/notifications`);
    console.log(`⚖️  Profeco (Multas):    http://localhost:${PORT}/api/profeco`); // <--- Nueva ruta
    console.log(`==================================================\n`);
});