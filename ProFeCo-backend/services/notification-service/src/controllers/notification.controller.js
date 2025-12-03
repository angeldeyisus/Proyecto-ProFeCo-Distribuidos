import notificationOrchestrator from '../services/notificationOrchestrator.js';
import Notification from '../models/notificacion.model.js';
import NotificationPreference from '../models/notificacionPreferencia.model.js';

class NotificationController {
  
  async enviarNotificacionOferta(req, res) {
    try {
      const { 
        producto_id, 
        producto_nombre, 
        precio_anterior, 
        precio_nuevo, 
        categoria,
        tienda_id,
        tienda_nombre 
      } = req.body;

      if (!producto_id || !producto_nombre || !precio_anterior || !precio_nuevo || !categoria) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos requeridos: producto_id, producto_nombre, precio_anterior, precio_nuevo, categoria'
        });
      }

      console.log(`📨 Recibida solicitud de notificación: ${producto_nombre}`);

      const resultado = await notificationOrchestrator.enviarNotificacionOferta({
        producto_id,
        producto_nombre,
        precio_anterior: parseFloat(precio_anterior),
        precio_nuevo: parseFloat(precio_nuevo),
        categoria,
        tienda_id,
        tienda_nombre
      });

      if (resultado.success) {
        await this.guardarEnHistorial('oferta_producto', resultado);
      }

      res.json(resultado);

    } catch (error) {
      console.error('❌ Error en controlador de ofertas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor: ' + error.message
      });
    }
  }

  async enviarNotificacionWishlist(req, res) {
    try {
      const { tipo, datos } = req.body;

      if (!tipo) {
        return res.status(400).json({
          success: false,
          message: 'El campo "tipo" es requerido: precio_bajado, producto_en_oferta, disponibilidad'
        });
      }

      if (!datos || !datos.producto_id || !datos.producto_nombre) {
        return res.status(400).json({
          success: false,
          message: 'Faltan datos del producto: producto_id, producto_nombre'
        });
      }

      console.log(`📨 Recibida solicitud de notificación wishlist (${tipo}): ${datos.producto_nombre}`);

      const resultado = await notificationOrchestrator.enviarNotificacionWishlist(tipo, datos);

      if (resultado.success) {
        await this.guardarEnHistorial('wishlist', resultado, tipo);
      }

      res.json(resultado);

    } catch (error) {
      console.error('❌ Error en controlador de wishlist:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor: ' + error.message
      });
    }
  }

  async obtenerPreferencias(req, res) {
    try {
      const { usuario_id } = req.params;

      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          message: 'Usuario ID es requerido'
        });
      }

      let preferencias = await NotificationPreference.findOne({ usuario_id });

      if (!preferencias) {
        preferencias = await NotificationPreference.create({
          usuario_id,
        });
      }

      res.json({
        success: true,
        data: preferencias
      });

    } catch (error) {
      console.error('❌ Error obteniendo preferencias:', error);
      res.status(500).json({
        success: false,
        message: 'Error obteniendo preferencias: ' + error.message
      });
    }
  }

  async actualizarPreferencias(req, res) {
    try {
      const { usuario_id } = req.params;
      const updateData = req.body;

      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          message: 'Usuario ID es requerido'
        });
      }

      const preferencias = await NotificationPreference.findOneAndUpdate(
        { usuario_id },
        updateData,
        { new: true, upsert: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Preferencias actualizadas exitosamente',
        data: preferencias
      });

    } catch (error) {
      console.error('❌ Error actualizando preferencias:', error);
      res.status(500).json({
        success: false,
        message: 'Error actualizando preferencias: ' + error.message
      });
    }
  }

  async obtenerHistorial(req, res) {
    try {
      const { usuario_id } = req.params;
      const { limite = 20, pagina = 1 } = req.query;

      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          message: 'Usuario ID es requerido'
        });
      }

      const skip = (pagina - 1) * limite;

      const notificaciones = await Notification.find({ usuario_id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limite));

      const total = await Notification.countDocuments({ usuario_id });

      res.json({
        success: true,
        data: notificaciones,
        paginacion: {
          pagina: parseInt(pagina),
          limite: parseInt(limite),
          total,
          totalPaginas: Math.ceil(total / limite)
        }
      });

    } catch (error) {
      console.error('❌ Error obteniendo historial:', error);
      res.status(500).json({
        success: false,
        message: 'Error obteniendo historial: ' + error.message
      });
    }
  }

  async marcarComoLeida(req, res) {
    try {
      const { notificacion_id } = req.params;

      const notificacion = await Notification.findByIdAndUpdate(
        notificacion_id,
        { estado: 'leida' },
        { new: true }
      );

      if (!notificacion) {
        return res.status(404).json({
          success: false,
          message: 'Notificación no encontrada'
        });
      }

      await NotificationPreference.findOneAndUpdate(
        { usuario_id: notificacion.usuario_id },
        { 
          $inc: { 'estadisticas.total_notificaciones_leidas': 1 },
          $set: { 'estadisticas.ultima_notificacion': new Date() }
        }
      );

      res.json({
        success: true,
        message: 'Notificación marcada como leída',
        data: notificacion
      });

    } catch (error) {
      console.error('❌ Error marcando notificación como leída:', error);
      res.status(500).json({
        success: false,
        message: 'Error marcando notificación como leída: ' + error.message
      });
    }
  }

  async obtenerEstadisticas(req, res) {
    try {
      const totalNotificaciones = await Notification.countDocuments();
      const notificacionesEnviadas = await Notification.countDocuments({ estado: 'enviada' });
      const notificacionesFallidas = await Notification.countDocuments({ estado: 'fallida' });
      
      const notificacionesPorTipo = await Notification.aggregate([
        {
          $group: {
            _id: '$categoria',
            total: { $sum: 1 },
            enviadas: { $sum: { $cond: [{ $eq: ['$estado', 'enviada'] }, 1, 0] } }
          }
        }
      ]);

      const topProductosNotificados = await Notification.aggregate([
        { $match: { 'datos.producto_nombre': { $exists: true } } },
        {
          $group: {
            _id: '$datos.producto_nombre',
            total: { $sum: 1 }
          }
        },
        { $sort: { total: -1 } },
        { $limit: 10 }
      ]);

      res.json({
        success: true,
        data: {
          general: {
            total_notificaciones: totalNotificaciones,
            notificaciones_enviadas: notificacionesEnviadas,
            notificaciones_fallidas: notificacionesFallidas,
            tasa_exito: totalNotificaciones > 0 ? (notificacionesEnviadas / totalNotificaciones * 100).toFixed(2) : 0
          },
          por_tipo: notificacionesPorTipo,
          productos_populares: topProductosNotificados
        }
      });

    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error obteniendo estadísticas: ' + error.message
      });
    }
  }

  async guardarEnHistorial(categoria, resultado, subtipo = null) {
    try {
      if (resultado.detalles && Array.isArray(resultado.detalles)) {
        const notificaciones = resultado.detalles.map(detalle => ({
          tipo: 'email',
          categoria,
          usuario_id: detalle.usuario_id,
          titulo: this.generarTitulo(categoria, subtipo),
          mensaje: this.generarMensaje(categoria, subtipo, resultado),
          datos: {
            producto_nombre: resultado.producto,
            subtipo,
            resultado: detalle.success ? 'enviada' : 'fallida'
          },
          estado: detalle.success ? 'enviada' : 'fallida',
          enviada_en: detalle.success ? new Date() : null,
          error: detalle.error || null
        }));

        await Notification.insertMany(notificaciones);
      }
    } catch (error) {
      console.error('Error guardando en historial:', error);
    }
  }

  generarTitulo(categoria, subtipo) {
    const titulos = {
      oferta_producto: 'Oferta de producto',
      wishlist: {
        precio_bajado: 'Precio bajó en tu wishlist',
        producto_en_oferta: 'Oferta especial en tu wishlist',
        disponibilidad: 'Producto disponible de tu wishlist'
      }
    };

    return subtipo ? titulos[categoria]?.[subtipo] || 'Notificación del sistema' : titulos[categoria] || 'Notificación del sistema';
  }

  generarMensaje(categoria, subtipo, resultado) {
    const baseMsg = `Notificación sobre ${resultado.producto}`;
    
    if (categoria === 'wishlist') {
      return `${baseMsg} - ${subtipo}`;
    }
    
    return baseMsg;
  }
}

export default NotificationController;