import Preferencias from '../models/preferencias.model.js';
import { BaseRepository } from './base.repository.js';

export class PreferenciasRepository extends BaseRepository {
  constructor() {
    super(Preferencias);
  }

  async findByUsuarioId(usuarioId) {
    try {
      return await this.model.findOne({ usuario_id: usuarioId });
    } catch (error) {
      throw new Error(`Error finding preferences by user: ${error.message}`);
    }
  }

  async crearOActualizar(usuarioId, datosPreferencias) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $set: {
            ...datosPreferencias,
            updatedAt: new Date()
          }
        },
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );
    } catch (error) {
      throw new Error(`Error creating/updating preferences: ${error.message}`);
    }
  }

  async agregarSupermercadoFavorito(usuarioId, tiendaId) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $addToSet: { supermercados_favoritos: tiendaId },
          $set: { updatedAt: new Date() }
        },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error(`Error adding favorite store: ${error.message}`);
    }
  }

  async eliminarSupermercadoFavorito(usuarioId, tiendaId) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $pull: { supermercados_favoritos: tiendaId },
          $set: { updatedAt: new Date() }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error removing favorite store: ${error.message}`);
    }
  }

  async agregarProductoFrecuente(usuarioId, productoId) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $addToSet: { productos_frecuentes: productoId },
          $set: { updatedAt: new Date() }
        },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error(`Error adding frequent product: ${error.message}`);
    }
  }

  async eliminarProductoFrecuente(usuarioId, productoId) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $pull: { productos_frecuentes: productoId },
          $set: { updatedAt: new Date() }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error removing frequent product: ${error.message}`);
    }
  }

  async actualizarConfiguracionNotificaciones(usuarioId, notificacionesOfertas) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $set: {
            notificaciones_ofertas: notificacionesOfertas,
            updatedAt: new Date()
          }
        },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error(`Error updating notification settings: ${error.message}`);
    }
  }

  async actualizarRadioBusqueda(usuarioId, radioKm) {
    try {
      return await this.model.findOneAndUpdate(
        { usuario_id: usuarioId },
        {
          $set: {
            radio_busqueda: radioKm,
            updatedAt: new Date()
          }
        },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error(`Error updating search radius: ${error.message}`);
    }
  }
}