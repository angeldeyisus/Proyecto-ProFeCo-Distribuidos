import Oferta from '../models/oferta.model.js';

export class OfertaRepository {

  // Crear nueva oferta
  async crearOferta(ofertaData) {
    try {
      const oferta = new Oferta(ofertaData);
      return await oferta.save();
    } catch (error) {
      throw new Error(`Error al crear oferta: ${error.message}`);
    }
  }

  // Obtener oferta por ID
  async obtenerPorId(ofertaId) {
    try {
      return await Oferta.findById(ofertaId);
    } catch (error) {
      throw new Error(`Error al obtener oferta: ${error.message}`);
    }
  }

  // Obtener ofertas por tienda
  async obtenerPorTienda(tiendaId, pagina = 1, limite = 10, soloActivas = true) {
    try {
      const skip = (pagina - 1) * limite;
      const filtro = { tienda_id: tiendaId };
      
      if (soloActivas) {
        filtro.estado = 'activa';
        filtro.fecha_inicio = { $lte: new Date() };
        filtro.fecha_fin = { $gte: new Date() };
      }

      const [ofertas, total] = await Promise.all([
        Oferta.find(filtro)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limite),
        Oferta.countDocuments(filtro)
      ]);

      return {
        ofertas,
        paginacion: {
          pagina,
          limite,
          total,
          paginas: Math.ceil(total / limite)
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener ofertas: ${error.message}`);
    }
  }

  // Obtener ofertas por producto
  async obtenerPorProducto(productoId, pagina = 1, limite = 10) {
    try {
      const skip = (pagina - 1) * limite;
      const filtro = { 
        producto_id: productoId,
        estado: 'activa',
        fecha_inicio: { $lte: new Date() },
        fecha_fin: { $gte: new Date() }
      };

      const [ofertas, total] = await Promise.all([
        Oferta.find(filtro)
          .sort({ precio_oferta: 1 })
          .skip(skip)
          .limit(limite),
        Oferta.countDocuments(filtro)
      ]);

      return {
        ofertas,
        paginacion: {
          pagina,
          limite,
          total,
          paginas: Math.ceil(total / limite)
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener ofertas del producto: ${error.message}`);
    }
  }

  // Obtener ofertas activas con filtros
  async obtenerOfertasActivas(filtros = {}, pagina = 1, limite = 20) {
    try {
      const skip = (pagina - 1) * limite;
      const baseFiltro = {
        estado: 'activa',
        fecha_inicio: { $lte: new Date() },
        fecha_fin: { $gte: new Date() }
      };

      const filtroFinal = { ...baseFiltro, ...filtros };

      const [ofertas, total] = await Promise.all([
        Oferta.find(filtroFinal)
          .sort({ descuento_porcentaje: -1, createdAt: -1 })
          .skip(skip)
          .limit(limite),
        Oferta.countDocuments(filtroFinal)
      ]);

      return {
        ofertas,
        paginacion: {
          pagina,
          limite,
          total,
          paginas: Math.ceil(total / limite)
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener ofertas activas: ${error.message}`);
    }
  }

  // Actualizar oferta
  async actualizarOferta(ofertaId, updateData) {
    try {
      return await Oferta.findByIdAndUpdate(
        ofertaId,
        { 
          ...updateData,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error al actualizar oferta: ${error.message}`);
    }
  }

  // Cambiar estado de oferta
  async cambiarEstado(ofertaId, nuevoEstado) {
    try {
      return await Oferta.findByIdAndUpdate(
        ofertaId,
        { 
          estado: nuevoEstado,
          updatedAt: new Date()
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al cambiar estado de oferta: ${error.message}`);
    }
  }

  // Obtener ofertas próximas a expirar
  async obtenerProximasAExpirar(dias = 3) {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() + dias);

      return await Oferta.find({
        estado: 'activa',
        fecha_fin: { 
          $lte: fechaLimite,
          $gte: new Date()
        },
        notificaciones_enviadas: false
      });
    } catch (error) {
      throw new Error(`Error al obtener ofertas próximas a expirar: ${error.message}`);
    }
  }

  // Actualizar stock de oferta
  async actualizarStock(ofertaId, nuevoStock) {
    try {
      let updateData = { stock_oferta: nuevoStock };
      
      // Si stock llega a 0, marcar como agotada
      if (nuevoStock === 0) {
        updateData.estado = 'agotada';
      }

      return await Oferta.findByIdAndUpdate(
        ofertaId,
        { 
          ...updateData,
          updatedAt: new Date()
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al actualizar stock: ${error.message}`);
    }
  }

  // Marcar notificaciones como enviadas
  async marcarNotificacionesEnviadas(ofertaIds) {
    try {
      return await Oferta.updateMany(
        { _id: { $in: ofertaIds } },
        { 
          notificaciones_enviadas: true,
          updatedAt: new Date()
        }
      );
    } catch (error) {
      throw new Error(`Error al marcar notificaciones: ${error.message}`);
    }
  }

  // Obtener ofertas expiradas para limpieza
  async obtenerOfertasExpiradas() {
    try {
      return await Oferta.find({
        estado: 'activa',
        fecha_fin: { $lt: new Date() }
      });
    } catch (error) {
      throw new Error(`Error al obtener ofertas expiradas: ${error.message}`);
    }
  }
}