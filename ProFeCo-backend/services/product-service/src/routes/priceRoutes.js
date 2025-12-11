import { Router } from 'express';
// CORRECCIÓN IMPORTANTE: Si usaste el controlador que te pasé antes (export default new PriceController),
// la importación debe ser así (sin llaves y sin new):
import { PriceController } from '../controllers/price.controller.js';
import { authenticateToken } from '../../../auth-services/src/middleware/auth.js'; 

const router = Router();
const priceController = new PriceController();

// ==========================
// 1. CRUD DE PRECIOS
// ==========================

// Guardar precio (Tienda)
router.post('/', authenticateToken, (req, res) => priceController.crearOActualizarPrecio(req, res));

// Obtener mis precios (Tienda - Ruta Inteligente)
router.get('/mis-precios', authenticateToken, (req, res) => priceController.obtenerMisPrecios(req, res));

// Obtener precios por producto (Público/Consumidor)
router.get('/product/:productId', (req, res) => priceController.obtenerPreciosPorProducto(req, res));

// Obtener precios por tienda (Público)
router.get('/tienda/:tienda_id', (req, res) => priceController.obtenerPreciosPorTienda(req, res));

// Obtener precio específico (Legacy)
router.get('/producto/:producto_id/tienda/:tienda_id', (req, res) => priceController.obtenerPrecio(req, res));


// ==========================
// 2. GESTIÓN DE OFERTAS
// ==========================

// Crear oferta (Tienda)
router.post('/ofertas', authenticateToken, (req, res) => priceController.crearOferta(req, res));

// Eliminar oferta (Tienda)
// Simplificado: Ya no pedimos tienda_id por URL, lo sacamos del token
router.delete('/ofertas/producto/:producto_id', authenticateToken, (req, res) => priceController.eliminarOferta(req, res));

// Ver ofertas activas
router.get('/ofertas/activas', (req, res) => priceController.obtenerOfertasActivas(req, res));


// ==========================
// 3. FUNCIONES DE USUARIO
// ==========================

router.post('/reportar', authenticateToken, (req, res) => priceController.crearReporte(req, res));
router.post('/resenas', authenticateToken, (req, res) => priceController.crearResena(req, res));
router.get('/resenas/tienda/:tiendaId', (req, res) => priceController.obtenerResenasTienda(req, res));

// Preferencias
router.get('/preferencias', authenticateToken, (req, res) => priceController.obtenerPreferencias(req, res));
router.post('/preferencias/wishlist', authenticateToken, (req, res) => priceController.toggleWishlist(req, res));
router.post('/preferencias/tiendas', authenticateToken, (req, res) => priceController.toggleTiendaFavorita(req, res));


// ==========================
// 4. BÚSQUEDAS
// ==========================
router.get('/mejores-precios/:producto_id', (req, res) => priceController.obtenerMejoresPrecios(req, res));
router.get('/estadisticas/:producto_id', (req, res) => priceController.obtenerEstadisticasPrecios(req, res));
router.post('/buscar/rango', (req, res) => priceController.buscarPreciosPorRango(req, res));


// ==========================
// 5. ADMIN
// ==========================
router.post('/admin/actualizar-ofertas-expiradas', authenticateToken, (req, res) => priceController.actualizarOfertasExpiradas(req, res));


export default router;