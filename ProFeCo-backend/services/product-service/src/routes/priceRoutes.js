import { Router } from 'express';
import { PriceController } from '../controllers/price.controller.js';
import { authenticateToken } from '../../../auth-services/src/middleware/auth.js'; 

const router = Router();
const priceController = new PriceController();

// ==========================
// 1. CRUD DE PRECIOS
// ==========================

// Crear o Actualizar precio (Requiere ser TIENDA)
// POST /api/prices/
router.post('/', authenticateToken, (req, res) => priceController.crearOActualizarPrecio(req, res));

// Obtener precio específico de un producto en una tienda
// GET /api/prices/producto/:producto_id/tienda/:tienda_id
router.get('/producto/:producto_id/tienda/:tienda_id', (req, res) => priceController.obtenerPrecio(req, res));

// Obtener todos los precios de un producto (Comparador)
// GET /api/prices/producto/:producto_id
router.get('/producto/:producto_id', (req, res) => priceController.obtenerPreciosPorProducto(req, res));

// Obtener todos los precios de una tienda
// GET /api/prices/tienda/:tienda_id
router.get('/tienda/:tienda_id', (req, res) => priceController.obtenerPreciosPorTienda(req, res));


// ==========================
// 2. GESTIÓN DE OFERTAS
// ==========================

// Crear una oferta específica (Requiere ser TIENDA)
// POST /api/prices/ofertas
router.post('/ofertas', authenticateToken, (req, res) => priceController.crearOferta(req, res));

// Eliminar una oferta (Restaurar precio normal)
// DELETE /api/prices/ofertas/producto/:producto_id/tienda/:tienda_id
router.delete('/ofertas/producto/:producto_id/tienda/:tienda_id', authenticateToken, (req, res) => priceController.eliminarOferta(req, res));

// Ver ofertas activas globales (Público)
// GET /api/prices/ofertas/activas
router.get('/ofertas/activas', (req, res) => priceController.obtenerOfertasActivas(req, res));


// ==========================
// 3. BÚSQUEDAS Y CONSULTAS
// ==========================

// Obtener los N mejores precios de un producto
// GET /api/prices/mejores-precios/:producto_id
router.get('/mejores-precios/:producto_id', (req, res) => priceController.obtenerMejoresPrecios(req, res));

// Obtener estadísticas (max, min, promedio)
// GET /api/prices/estadisticas/:producto_id
router.get('/estadisticas/:producto_id', (req, res) => priceController.obtenerEstadisticasPrecios(req, res));

// Buscar precios en un rango
// POST /api/prices/buscar/rango
router.post('/buscar/rango', (req, res) => priceController.buscarPreciosPorRango(req, res));


// ==========================
// 4. ADMIN - MANTENIMIENTO
// ==========================

// Limpiar ofertas vencidas (Puede ser llamado por un Cron Job o Admin)
// POST /api/prices/admin/actualizar-ofertas-expiradas
router.post('/admin/actualizar-ofertas-expiradas', authenticateToken, (req, res) => priceController.actualizarOfertasExpiradas(req, res));

export default router;