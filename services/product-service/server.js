import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './src/config/database.js';
import { ProductController } from './src/controllers/product.controller.js';

const app = express();
const PORT = process.env.PORT || 3002;
const productController = new ProductController();

app.use(cors());
app.use(express.json());

connectMongoDB();

app.get('/api/products', (req, res) => productController.obtenerProductos(req, res));
app.get('/api/products/search', (req, res) => productController.buscarProductos(req, res));
app.get('/api/products/:id', (req, res) => productController.obtenerProducto(req, res));
app.post('/api/products', (req, res) => productController.crearProducto(req, res));
app.get('/api/products/category/:categoriaId', (req, res) => productController.obtenerPorCategoria(req, res));

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'product-service',
    timestamp: new Date().toISOString(),
    database: 'MongoDB'
  });
});

app.get('/', (req, res) => {
  res.json({
    mensaje: '🚀 Product Service - ProFeCo',
    endpoints: {
      obtenerProductos: 'GET /api/products',
      buscarProductos: 'GET /api/products/search?q=texto',
      obtenerProducto: 'GET /api/products/:id',
      crearProducto: 'POST /api/products',
      productosPorCategoria: 'GET /api/products/category/:categoriaId'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.listen(PORT, () => {
  console.log(`🛍️ Product Service running on port ${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
  console.log(`   GET  http://localhost:${PORT}/api/products/search?q=leche`);
  console.log(`   GET  http://localhost:${PORT}/api/products/:id`);
  console.log(`   POST http://localhost:${PORT}/api/products`);
  console.log(`   GET  http://localhost:${PORT}/health`);
});