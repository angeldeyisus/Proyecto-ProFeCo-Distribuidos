import wishlistService from '../services/wishlist.service.js';

class WishlistController {

  async obtenerWishlist(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const wishlist = await wishlistService.obtenerWishlist(usuario_id);
      
      res.json({
        success: true,
        data: wishlist
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async agregarProductoWishlist(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const productoData = req.body;

      const wishlist = await wishlistService.agregarProductoWishlist(usuario_id, productoData);
      
      res.status(201).json({
        success: true,
        message: 'Producto agregado a la wishlist',
        data: wishlist
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async eliminarProductoWishlist(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { producto_id } = req.params;

      const wishlist = await wishlistService.eliminarProductoWishlist(usuario_id, producto_id);
      
      res.json({
        success: true,
        message: 'Producto eliminado de la wishlist',
        data: wishlist
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarPrioridadProducto(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { producto_id } = req.params;
      const { prioridad } = req.body;

      if (!prioridad) {
        return res.status(400).json({
          success: false,
          message: 'Prioridad es requerida'
        });
      }

      const wishlist = await wishlistService.actualizarPrioridadProducto(usuario_id, producto_id, prioridad);
      
      res.json({
        success: true,
        message: 'Prioridad actualizada',
        data: wishlist
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async toggleVisibilidadWishlist(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { es_publica } = req.body;

      if (typeof es_publica !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'es_publica debe ser true o false'
        });
      }

      const wishlist = await wishlistService.toggleVisibilidadWishlist(usuario_id, es_publica);
      
      res.json({
        success: true,
        message: `Wishlist ${es_publica ? 'pública' : 'privada'}`,
        data: wishlist
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerProductosWishlist(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const productos = await wishlistService.obtenerProductosWishlist(usuario_id);
      
      res.json({
        success: true,
        data: productos
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default WishlistController;