import Wishlist from '../models/wishlist.model.js';
import { BaseRepository } from './base.repository.js';

export class WishlistRepository extends BaseRepository {
  constructor() {
    super(Wishlist);
  }

  async findByUsuarioId(usuarioId) {
    try {
      return await this.model.find({ usuario_id: usuarioId })
        .sort({ updatedAt: -1 });
    } catch (error) {
      throw new Error(`Error finding wishlists by user: ${error.message}`);
    }
  }

  async findWishlistPrincipal(usuarioId) {
    try {
      return await this.model.findOne({
        usuario_id: usuarioId,
        nombre: "Mi lista de deseos"
      });
    } catch (error) {
      throw new Error(`Error finding main wishlist: ${error.message}`);
    }
  }

  async agregarProducto(wishlistId, productoId, prioridad = 'media') {
    try {
      const productoExistente = await this.model.findOne({
        _id: wishlistId,
        'productos.producto_id': productoId
      });

      if (productoExistente) {
        throw new Error('El producto ya está en la wishlist');
      }

      return await this.model.findByIdAndUpdate(
        wishlistId,
        {
          $push: {
            productos: {
              producto_id: productoId,
              fecha_agregado: new Date(),
              prioridad: prioridad
            }
          },
          $set: { updatedAt: new Date() }
        },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error adding product to wishlist: ${error.message}`);
    }
  }

  async eliminarProducto(wishlistId, productoId) {
    try {
      return await this.model.findByIdAndUpdate(
        wishlistId,
        {
          $pull: { productos: { producto_id: productoId } },
          $set: { updatedAt: new Date() }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error removing product from wishlist: ${error.message}`);
    }
  }

  async actualizarPrioridad(wishlistId, productoId, prioridad) {
    try {
      return await this.model.findOneAndUpdate(
        {
          _id: wishlistId,
          'productos.producto_id': productoId
        },
        {
          $set: {
            'productos.$.prioridad': prioridad,
            updatedAt: new Date()
          }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating priority: ${error.message}`);
    }
  }

  async encontrarPorProducto(usuarioId, productoId) {
    try {
      return await this.model.findOne({
        usuario_id: usuarioId,
        'productos.producto_id': productoId
      });
    } catch (error) {
      throw new Error(`Error finding wishlist by product: ${error.message}`);
    }
  }

  async contarProductos(wishlistId) {
    try {
      const wishlist = await this.model.findById(wishlistId);
      return wishlist ? wishlist.productos.length : 0;
    } catch (error) {
      throw new Error(`Error counting products: ${error.message}`);
    }
  }
}
