import wishlistRepository from '../repositories/wishlist.repository.js';

class WishlistService {
  
  async obtenerWishlist(usuario_id) {
    try {
      let wishlist = await wishlistRepository.obtenerWishlistPorUsuarioId(usuario_id);

      if (!wishlist) {
        wishlist = await wishlistRepository.crearWishlist({
          usuario_id,
          nombre: "Mi lista de deseos",
          productos: [],
          es_publica: false
        });
      }

      return wishlist;
    } catch (error) {
      throw new Error(`Error obteniendo wishlist: ${error.message}`);
    }
  }

  async agregarProductoWishlist(usuario_id, productoData) {
    try {
      this.validarProductoWishlist(productoData);

      const wishlist = await this.obtenerWishlist(usuario_id);
      const productoExistente = wishlist.productos.find(
        p => p.producto_id === productoData.producto_id
      );

      if (productoExistente) {
        throw new Error('El producto ya está en la wishlist');
      }

      return await wishlistRepository.agregarProductoWishlist(usuario_id, productoData);
    } catch (error) {
      throw new Error(`Error agregando producto a wishlist: ${error.message}`);
    }
  }

  async eliminarProductoWishlist(usuario_id, producto_id) {
    try {
      if (!producto_id) {
        throw new Error('ID de producto es requerido');
      }

      const wishlist = await this.obtenerWishlist(usuario_id);
      const productoExistente = wishlist.productos.find(
        p => p.producto_id === producto_id
      );

      if (!productoExistente) {
        throw new Error('El producto no está en la wishlist');
      }

      return await wishlistRepository.eliminarProductoWishlist(usuario_id, producto_id);
    } catch (error) {
      throw new Error(`Error eliminando producto de wishlist: ${error.message}`);
    }
  }

  async actualizarPrioridadProducto(usuario_id, producto_id, prioridad) {
    try {
      if (!['baja', 'media', 'alta'].includes(prioridad)) {
        throw new Error('Prioridad debe ser: baja, media o alta');
      }

      const wishlist = await this.obtenerWishlist(usuario_id);
      const productoExistente = wishlist.productos.find(
        p => p.producto_id === producto_id
      );

      if (!productoExistente) {
        throw new Error('El producto no está en la wishlist');
      }

      return await wishlistRepository.actualizarPrioridadProducto(usuario_id, producto_id, prioridad);
    } catch (error) {
      throw new Error(`Error actualizando prioridad: ${error.message}`);
    }
  }

  async toggleVisibilidadWishlist(usuario_id, es_publica) {
    try {
      return await wishlistRepository.toggleVisibilidadWishlist(usuario_id, es_publica);
    } catch (error) {
      throw new Error(`Error cambiando visibilidad de wishlist: ${error.message}`);
    }
  }

  async obtenerProductosWishlist(usuario_id) {
    try {
      const wishlist = await this.obtenerWishlist(usuario_id);
      return wishlist.productos.sort((a, b) => {
        const prioridades = { alta: 3, media: 2, baja: 1 };
        return prioridades[b.prioridad] - prioridades[a.prioridad];
      });
    } catch (error) {
      throw new Error(`Error obteniendo productos de wishlist: ${error.message}`);
    }
  }

  validarProductoWishlist(productoData) {
    const { producto_id, prioridad = 'media' } = productoData;

    if (!producto_id) {
      throw new Error('ID de producto es requerido');
    }

    if (!['baja', 'media', 'alta'].includes(prioridad)) {
      throw new Error('Prioridad debe ser: baja, media o alta');
    }
  }
}

export default new WishlistService();