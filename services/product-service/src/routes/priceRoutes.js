import express from 'express';
import PriceController from '../controllers/price.controller.js';

const router = express.Router();
const priceController = new PriceController();

// CRUD DE PRECIOS
router.post('/', priceController.crearOActualizarPrecio.bind(priceController));
router.get('/producto/:producto_id/tienda/:tienda_id', priceController.obtenerPrecio.bind(priceController));
router.get('/producto/:producto_id', priceController.obtenerPreciosPorProducto.bind(priceController));
router.get('/tienda/:tienda_id', priceController.obtenerPreciosPorTienda.bind(priceController));

// GESTIÓN DE OFERTAS
router.post('/ofertas', priceController.crearOferta.bind(priceController));
router.delete('/ofertas/producto/:producto_id/tienda/:tienda_id', priceController.eliminarOferta.bind(priceController));
router.get('/ofertas/activas', priceController.obtenerOfertasActivas.bind(priceController));

// BÚSQUEDAS Y CONSULTAS
router.get('/mejores-precios/:producto_id', priceController.obtenerMejoresPrecios.bind(priceController));
router.get('/estadisticas/:producto_id', priceController.obtenerEstadisticasPrecios.bind(priceController));
router.post('/buscar/rango', priceController.buscarPreciosPorRango.bind(priceController));

// ADMIN - MANTENIMIENTO
router.post('/admin/actualizar-ofertas-expiradas', priceController.actualizarOfertasExpiradas.bind(priceController));

export default router;