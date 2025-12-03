import Calificacion from '../models/calificacion.model.js';

export class CalificacionRepository {
  
  // Crear nueva calificación
  async crearCalificacion(calificacionData) {
    try {
      const calificacion = new Calificacion(calificacionData);
      return await calificacion.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('El usuario ya ha calificado esta tienda');
      }
      throw new Error(`Error al crear calificación: ${error.message}`);
    }
  }

  // Obtener calificación por ID
  async obtenerPorId(calificacionId) {
    try {
      return await Calificacion.findById(calificacionId);
    } catch (error) {
      throw new Error(`Error al obtener calificación: ${error.message}`);
    }
  }

  // Obtener calificaciones por tienda con paginación
  async obtenerPorTienda(tiendaId, pagina = 1, limite = 10, estado = 'activa') {
    try {
      const skip = (pagina - 1) * limite;
      
      const [calificaciones, total] = await Promise.all([
        Calificacion.find({ 
          tienda_id: tiendaId, 
          estado: estado 
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limite),
        Calificacion.countDocuments({ 
          tienda_id: tiendaId, 
          estado: estado 
        })
      ]);

      return {
        calificaciones,
        paginacion: {
          pagina,
          limite,
          total,
          paginas: Math.ceil(total / limite)
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener calificaciones: ${error.message}`);
    }
  }

  // Obtener calificaciones por usuario
  async obtenerPorUsuario(usuarioId, pagina = 1, limite = 10) {
    try {
      const skip = (pagina - 1) * limite;
      
      const [calificaciones, total] = await Promise.all([
        Calificacion.find({ usuario_id: usuarioId })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limite),
        Calificacion.countDocuments({ usuario_id: usuarioId })
      ]);

      return {
        calificaciones,
        paginacion: {
          pagina,
          limite,
          total,
          paginas: Math.ceil(total / limite)
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener calificaciones del usuario: ${error.message}`);
    }
  }

  // Actualizar calificación
  async actualizarCalificacion(calificacionId, updateData) {
    try {
      // No permitir actualizar usuario_id o tienda_id
      const { usuario_id, tienda_id, ...datosActualizables } = updateData;
      
      return await Calificacion.findByIdAndUpdate(
        calificacionId,
        { 
          ...datosActualizables,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error al actualizar calificación: ${error.message}`);
    }
  }

  // Cambiar estado de calificación
  async cambiarEstado(calificacionId, nuevoEstado) {
    try {
      return await Calificacion.findByIdAndUpdate(
        calificacionId,
        { 
          estado: nuevoEstado,
          updatedAt: new Date()
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al cambiar estado: ${error.message}`);
    }
  }

  // Obtener estadísticas de tienda
  async obtenerEstadisticasTienda(tiendaId) {
    try {
      const estadisticas = await Calificacion.aggregate([
        { 
          $match: { 
            tienda_id: tiendaId, 
            estado: 'activa' 
          } 
        },
        {
          $group: {
            _id: '$tienda_id',
            totalCalificaciones: { $sum: 1 },
            promedioPuntuacion: { $avg: '$puntuacion' },
            promedioPrecios: { $avg: '$aspectos.precios' },
            promedioLimpieza: { $avg: '$aspectos.limpieza' },
            promedioAtencion: { $avg: '$aspectos.atencion' },
            promedioVariedad: { $avg: '$aspectos.variedad' },
            totalRecomendadas: {
              $sum: { $cond: ['$recomendada', 1, 0] }
            },
            distribucionPuntuaciones: {
              $push: '$puntuacion'
            }
          }
        },
        {
          $project: {
            totalCalificaciones: 1,
            promedioPuntuacion: { $round: ['$promedioPuntuacion', 1] },
            promedioPrecios: { $round: ['$promedioPrecios', 1] },
            promedioLimpieza: { $round: ['$promedioLimpieza', 1] },
            promedioAtencion: { $round: ['$promedioAtencion', 1] },
            promedioVariedad: { $round: ['$promedioVariedad', 1] },
            porcentajeRecomendadas: {
              $round: [
                { $multiply: [{ $divide: ['$totalRecomendadas', '$totalCalificaciones'] }, 100] },
                1
              ]
            },
            distribucionPuntuaciones: 1
          }
        }
      ]);

      return estadisticas[0] || null;
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }

  // Verificar si usuario ya calificó la tienda
  async verificarCalificacionExistente(usuarioId, tiendaId) {
    try {
      return await Calificacion.findOne({
        usuario_id: usuarioId,
        tienda_id: tiendaId,
        estado: { $in: ['activa', 'oculta'] }
      });
    } catch (error) {
      throw new Error(`Error al verificar calificación: ${error.message}`);
    }
  }
}