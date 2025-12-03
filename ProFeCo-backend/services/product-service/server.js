import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes - RUTAS CORREGIDAS CON NOMBRES REALES
import productRoutes from './src/routes/productRoutes.js';
import priceRoutes from './src/routes/priceRoutes.js';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/profeco-products';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Conectado a MongoDB - Product Service');
})
.catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/prices', priceRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Product Service',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🎯 Product Service en puerto ${PORT}`);
});

export default app;