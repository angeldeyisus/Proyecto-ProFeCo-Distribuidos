import Wishlist from '../models/wishlist.model.js';

class WishlistRepository {
  
  async obtenerWishlistPorUsuarioId(usuario_id) {
    return await Wishlist.findOne({ usuario_id });
  }

  async crearWishlist(wishlistData) {
    const wishlist = new Wishlist(wishlistData);
    return await wishlist.save();
  }

  async agregarProductoWishlist(usuario_id, productoData) {
    const producto = {
      ...productoData,
      fecha_agregado: new Date()
    };

    return await Wishlist.findOneAndUpdate(
      { usuario_id },
      { $push: { productos: producto } },
      { new: true, upsert: true }
    );
  }

  async eliminarProductoWishlist(usuario_id, producto_id) {
    return await Wishlist.findOneAndUpdate(
      { usuario_id },
      { $pull: { productos: { producto_id } } },
      { new: true }
    );
  }

  async actualizarPrioridadProducto(usuario_id, producto_id, prioridad) {
    return await Wishlist.findOneAndUpdate(
      { usuario_id, "productos.producto_id": producto_id },
      { $set: { "productos.$.prioridad": prioridad } },
      { new: true }
    );
  }

  async obtenerProductosWishlist(usuario_id) {
    const wishlist = await Wishlist.findOne({ usuario_id });
    return wishlist ? wishlist.productos : [];
  }

  async toggleVisibilidadWishlist(usuario_id, es_publica) {
    return await Wishlist.findOneAndUpdate(
      { usuario_id },
      { $set: { es_publica } },
      { new: true }
    );
  }
}

export default new WishlistRepository();