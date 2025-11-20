import ListaCompra from '../models/listaCompra.model.js';
import { BaseRepository } from './base.repository.js';

export class ListaCompraRepository extends BaseRepository {
  constructor() {
    super(ListaCompra);
  }

  async findByUsuarioId(usuarioId) {
    try {
      return await this.model.find({ usuario_id: usuarioId })
        .sort({ updatedAt: -1 });
    } catch (error) {
      throw new Error(`Error finding lists by user: ${error.message}`);
    }
  }

  async findListaActiva(usuarioId) {
    try {
      return await this.model.findOne({
        usuario_id: usuarioId,
        fecha_estimada_compra: { $gte: new Date() }
      }).sort({ fecha_estimada_compra: 1 });
    } catch (error) {
      throw new Error(`Error finding active list: ${error.message}`);
    }
  }

  async agregarItem(listaId, itemData) {
    try {
      return await this.model.findByIdAndUpdate(
        listaId,
        {
          $push: { items: itemData },
          $set: { updatedAt: new Date() }
        },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error adding item to list: ${error.message}`);
    }
  }

  async actualizarItem(listaId, productoId, itemData) {
    try {
      return await this.model.findOneAndUpdate(
        {
          _id: listaId,
          'items.producto_id': productoId
        },
        {
          $set: {
            'items.$.cantidad': itemData.cantidad,
            'items.$.comprado': itemData.comprado,
            'items.$.precio_presupuestado': itemData.precio_presupuestado,
            'items.$.notas': itemData.notas,
            updatedAt: new Date()
          }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating item: ${error.message}`);
    }
  }

  async eliminarItem(listaId, productoId) {
    try {
      return await this.model.findByIdAndUpdate(
        listaId,
        {
          $pull: { items: { producto_id: productoId } },
          $set: { updatedAt: new Date() }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error removing item: ${error.message}`);
    }
  }

  async marcarItemComprado(listaId, productoId, comprado = true) {
    try {
      return await this.model.findOneAndUpdate(
        {
          _id: listaId,
          'items.producto_id': productoId
        },
        {
          $set: {
            'items.$.comprado': comprado,
            updatedAt: new Date()
          }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error marking item as purchased: ${error.message}`);
    }
  }

  async calcularTotalPresupuesto(listaId) {
    try {
      const lista = await this.model.findById(listaId);
      if (!lista) return 0;

      return lista.items.reduce((total, item) => {
        return total + (item.precio_presupuestado || 0) * item.cantidad;
      }, 0);
    } catch (error) {
      throw new Error(`Error calculating budget: ${error.message}`);
    }
  }
}