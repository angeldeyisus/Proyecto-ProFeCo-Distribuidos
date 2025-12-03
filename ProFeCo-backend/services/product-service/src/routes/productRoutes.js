import express from 'express';
import ProductController from '../controllers/product.controller.js';

const router = express.Router();
const productController = new ProductController();

// CRUD BÁSICO DE PRODUCTOS
router.get('/', productController.listarProductos.bind(productController));
router.post('/', productController.crearProducto.bind(productController));
router.get('/:id', productController.obtenerProducto.bind(productController));
router.put('/:id', productController.actualizarProducto.bind(productController));
router.delete('/:id', productController.eliminarProducto.bind(productController));

// BÚSQUEDAS Y FILTROS
router.get('/categoria/:categoria_id', productController.obtenerPorCategoria.bind(productController));
router.get('/marca/:marca', productController.obtenerPorMarca.bind(productController));

// ADMIN Y ESTADÍSTICAS
router.get('/admin/estadisticas', productController.obtenerEstadisticas.bind(productController));
router.get('/admin/para-ofertas', productController.obtenerParaOfertas.bind(productController));
router.get('/admin/marcas', productController.obtenerMarcas.bind(productController));

export default router;