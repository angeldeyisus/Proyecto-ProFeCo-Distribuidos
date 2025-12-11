import notificationOrchestrator from '../services/notificationOrchestrator.js';
import Notification from '../models/notificacion.model.js';
import authNotificationService from '../services/authNotifications.service.js';
import NotificationPreference from '../models/notificacionPreferencia.model.js';
import emailService from '../services/email.service.js';

class NotificationController {

  async recibirEventoServicio(req, res) {
    try {
      // 1. Validar autenticación entre servicios
      const tokenServicio = req.headers['x-service-token'];
      if (!this.validarTokenServicio(tokenServicio)) {
        return res.status(401).json({
          success: false,
          message: 'Token de servicio inválido'
        });
      }

      // 2. Parsear evento
      const { evento, datos, timestamp = new Date() } = req.body;

      if (!evento || !datos) {
        return res.status(400).json({
          success: false,
          message: 'evento y datos son requeridos'
        });
      }

      console.log(`🔗 Evento recibido de servicio externo: ${evento}`);

      // 3. Procesar según tipo de evento
      let resultado;

      switch (evento) {
        case 'auth.user.registered':
          resultado = await this.procesarRegistroUsuario(datos);
          break;

        case 'auth.user.verified':
          resultado = await this.procesarVerificacionUsuario(datos);
          break;

        case 'auth.password.reset.requested':
          resultado = await this.procesarRecuperacionPassword(datos);
          break;

        case 'auth.login.success':
          resultado = await this.procesarLoginExitoso(datos);
          break;

        case 'auth.login.failed':
          resultado = await this.procesarLoginFallido(datos);
          break;

        case 'store.report.received':
          resultado = await this.procesarReporteTienda(datos);
          break;

          // 🔥 NUEVO CASO
        case 'producto_en_oferta':
          // Llamamos al orquestador que ya tienes listo
          resultado = await notificationOrchestrator.enviarNotificacionWishlist('producto_en_oferta', datos);
          break;

        case 'profeco.fine.issued':
          resultado = await this.procesarMultaProfeco(datos);
          break;

        default:
          resultado = {
            success: false,
            message: `Evento no reconocido: ${evento}`
          };
      }

      // 4. Guardar en historial
      await this.guardarEventoEnHistorial(evento, datos, resultado);

      // 5. Responder
      res.json({
        success: true,
        evento,
        procesado: true,
        timestamp: new Date(),
        resultado
      });

    } catch (error) {
      console.error('❌ Error procesando evento de servicio:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno procesando evento: ' + error.message
      });
    }
  }

  validarTokenServicio(token) {
    // En producción, usar tokens JWT o clave compartida
    const tokenValido = process.env.SERVICE_SECRET_TOKEN;
    return token === tokenValido;
  }

  async procesarWebhookAuth(req, res) {
    try {
        const { evento, datos } = req.body;
        
        console.log(`🔔 Webhook auth recibido: ${evento}`);
        console.log(`📧 Usuario: ${datos?.email}`);
        
        // Procesar el evento
        const resultado = await authNotificationService.procesarEventoAuth(evento, datos);
        
        res.json({
            success: true,
            evento,
            procesado: true,
            resultado,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error procesando webhook auth:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

  // En NotificationController, modificar procesarRegistroUsuario:
async procesarRegistroUsuario(datos) {
    console.log(`👤 Nuevo usuario: ${datos.nombre} (${datos.email})`);
    
    try {
        const resultadoEmail = await this.enviarEmailBienvenida(datos);
        
        if (resultadoEmail.success) {
            console.log(`✅ Email de bienvenida enviado a: ${datos.email}`);
        } else {
            console.log(`⚠️ Email no enviado (simulado): ${datos.email}`);
        }
        
        return {
            success: true,
            email_enviado: resultadoEmail.success
        };
        
    } catch (error) {
        console.error(`❌ Error procesando registro: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async enviarEmailBienvenida(datos) {
    try {
        console.log(`📧 Preparando email para: ${datos.email}`);
        
        // Variables comunes
        const variablesBase = {
            usuario_nombre: datos.nombre,
            usuario_email: datos.email,
            tipo_usuario: datos.tipo_usuario === 'CONSUMIDOR' ? 'Consumidor' : 'Tienda',
            fecha_registro: new Date().toLocaleDateString('es-MX'),
            login_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`
        };
        
        let plantilla;
        let variablesEspecificas = {};
        
        // Configurar según tipo de usuario
        if (datos.tipo_usuario === 'CONSUMIDOR') {
            plantilla = 'auth_bienvenida_consumidor';
        } else if (datos.tipo_usuario === 'TIENDA') {
            plantilla = 'auth_bienvenida_tienda';
            variablesEspecificas = {
                tienda_nombre: datos.tienda_nombre || datos.nombre
            };
        } else {
            // Para otros tipos (PROFECO, etc.)
            plantilla = 'auth_bienvenida_consumidor';
        }
        
        const variables = { ...variablesBase, ...variablesEspecificas };
        
        console.log(`📧 Usando plantilla: ${plantilla}`);
        console.log(`📧 Variables:`, Object.keys(variables));
        
        const resultado = await emailService.enviarPlantilla(
            datos.email,
            plantilla,
            variables
        );
        
        return resultado;
        
    } catch (error) {
        console.error('❌ Error en enviarEmailBienvenida:', error);
        return { success: false, error: error.message };
    }
}

async procesarLoginExitoso(datos) {
    try {
        console.log(`🔓 Procesando login exitoso de: ${datos.email}`);
        
        // Aquí puedes:
        // 1. Enviar notificación de nuevo dispositivo (si aplica)
        // 2. Registrar el login en historial
        // 3. Enviar email de seguridad (si es nuevo dispositivo)
        
        const esNuevoDispositivo = datos.es_nuevo_dispositivo || false;
        
        if (esNuevoDispositivo) {
            console.log(`📱 Nuevo dispositivo detectado para: ${datos.email}`);
            console.log(`   Dispositivo: ${datos.dispositivo}`);
            console.log(`   IP: ${datos.ip_address}`);
            
            // Podrías enviar email de alerta aquí
            // await this.enviarAlertaNuevoDispositivo(datos);
        }
        
        // Guardar en historial
        await this.guardarLoginEnHistorial(datos, esNuevoDispositivo);
        
        return {
            success: true,
            email: datos.email,
            es_nuevo_dispositivo: esNuevoDispositivo,
            procesado: true
        };
        
    } catch (error) {
        console.error('❌ Error procesando login:', error);
        return { success: false, error: error.message };
    }
}

async procesarLoginFallido(datos) {
    try {
      console.log(`⚠️ Login fallido reportado para: ${datos.email}`);
      
      // Guardar en historial de seguridad
      await this.guardarLoginFallidoEnHistorial(datos);

      return {
        success: true,
        email: datos.email,
        procesado: true,
        mensaje: 'Login fallido registrado'
      };
      
    } catch (error) {
      console.error('❌ Error procesando login fallido:', error);
      return { success: false, error: error.message };
    }
  }

  async guardarLoginFallidoEnHistorial(datos) {
    try {
      const notificacion = new Notification({
        tipo: 'sistema', 
        categoria: 'seguridad', // Categoría específica para filtros
        usuario_id: datos.usuario_id || 'sistema', // Puede ser null si el usuario no existe
        titulo: '⚠️ Intento de inicio de sesión fallido',
        mensaje: `Intento fallido para el email ${datos.email}`,
        datos: {
          email: datos.email,
          ip_address: datos.ip || datos.ip_address || 'desconocida',
          intentos: datos.intentos || 1,
          timestamp: new Date()
        },
        estado: 'enviada', // Técnicamente se guarda como notificación de sistema
        enviada_en: new Date()
      });

      await notificacion.save();
      console.log('📝 Login fallido registrado en historial');
      
    } catch (error) {
      console.error('❌ Error guardando login fallido en historial:', error.message);
    }
  }

async guardarLoginEnHistorial(datos, esNuevoDispositivo) {
    try {
        const notificacion = new Notification({
            tipo: 'sistema',
            categoria: 'login_nuevo_dispositivo',
            usuario_id: datos.usuario_id || 'sistema',
            titulo: esNuevoDispositivo 
                ? '📱 Nuevo dispositivo detectado'
                : '🔓 Inicio de sesión exitoso',
            mensaje: esNuevoDispositivo
                ? `Nuevo inicio de sesión desde: ${datos.dispositivo?.substring(0, 50) || 'Dispositivo desconocido'}`
                : `Inicio de sesión exitoso para ${datos.email}`,
            datos: {
                email: datos.email,
                dispositivo: datos.dispositivo,
                ip_address: datos.ip_address,
                es_nuevo_dispositivo: esNuevoDispositivo,
                timestamp: datos.timestamp
            },
            estado: 'enviada',
            enviada_en: new Date()
        });

        await notificacion.save();
        console.log('📝 Login registrado en historial');
        
    } catch (error) {
        console.error('❌ Error guardando login en historial:', error.message);
    }
}

async guardarEventoEnHistorial(categoria, datos, resultadoEmail) {
    try {
        const notificacion = new Notification({
            tipo: 'email',  // Usar 'email' en lugar de 'sistema'
            categoria: categoria, // Usar categoría válida
            usuario_id: datos.usuario_id,
            titulo: `Bienvenido a ProFeCo, ${datos.nombre}!`,
            mensaje: `Te damos la bienvenida a ProFeCo como ${datos.tipo_usuario}`,
            datos: {
                email: datos.email,
                tipo_usuario: datos.tipo_usuario,
                nombre: datos.nombre
            },
            estado: resultadoEmail.success ? 'enviada' : 'fallida',
            enviada_en: resultadoEmail.success ? new Date() : null,
            error: resultadoEmail.error || null
        });

        await notificacion.save();
        console.log('✅ Evento guardado en historial');
        
    } catch (error) {
        console.error('Error guardando en historial:', error.message);
    }
}

  async crearPreferenciasPorDefecto(usuario_id, tipo_usuario) {
    try {
      const preferenciasBase = {
        usuario_id,
        email_activo: true,
        push_activo: false,
        sms_activo: false,
        in_app_activo: true,

        preferencias: {
          ofertas_productos: true,
          precio_bajado: true,
          wishlist: true,
          nuevos_productos: false,
          alertas_tienda: true,
          promociones_generales: true,
          notificaciones_sistema: true
        }
      };

      // Ajustar preferencias según tipo de usuario
      if (tipo_usuario === 'TIENDA') {
        preferenciasBase.preferencias.alertas_tienda = true;
        preferenciasBase.preferencias.notificaciones_sistema = true;
      }

      if (tipo_usuario === 'PROFECO') {
        preferenciasBase.preferencias.notificaciones_sistema = true;
      }

      await NotificationPreference.create(preferenciasBase);
      return true;

    } catch (error) {
      // Si ya existe, no hay problema
      if (error.code !== 11000) {
        console.error('Error creando preferencias:', error);
      }
      return false;
    }
  }

  generarTokenVerificacion() {
    return require('crypto').randomBytes(32).toString('hex');
  }

  async guardarEventoEnHistorial(evento, datos, resultado) {
    try {
      const notificacion = new Notification({
        tipo: 'sistema',
        categoria: 'evento_servicio',
        usuario_id: datos.usuario_id || 'sistema',
        titulo: `Evento: ${evento}`,
        mensaje: `Evento recibido del servicio de autenticación`,
        datos: {
          evento,
          datos,
          resultado,
          origen: 'auth-service'
        },
        estado: 'enviada',
        enviada_en: new Date()
      });

      await notificacion.save();

    } catch (error) {
      console.error('Error guardando evento en historial:', error);
    }
  }

  async probarIntegracionAuth(req, res) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Endpoint solo disponible en desarrollo'
      });
    }

    try {
      const { tipo_evento } = req.body;

      const eventosDisponibles = [
        'auth.user.registered',
        'auth.password.reset.requested',
        'auth.login.success',
        'store.report.received'
      ];

      if (!tipo_evento || !eventosDisponibles.includes(tipo_evento)) {
        return res.status(400).json({
          success: false,
          message: `tipo_evento es requerido. Opciones: ${eventosDisponibles.join(', ')}`
        });
      }

      // Datos de prueba
      const datosPrueba = {
        usuario_id: 'user_test_' + Date.now(),
        email: 'test@example.com',
        nombre: 'Usuario de Prueba',
        tipo_usuario: 'CONSUMIDOR',
        timestamp: new Date()
      };

      if (tipo_evento === 'auth.user.registered') {
        datosPrueba.tipo_usuario = req.body.tipo_usuario || 'CONSUMIDOR';
        if (datosPrueba.tipo_usuario === 'TIENDA') {
          datosPrueba.tienda_nombre = 'Tienda de Prueba';
        }
      }

      if (tipo_evento === 'auth.password.reset.requested') {
        datosPrueba.reset_token = 'reset_token_test_' + Date.now();
        datosPrueba.ip_address = '192.168.1.100';
      }

      if (tipo_evento === 'store.report.received') {
        datosPrueba.tienda_id = 'tienda_test_123';
        datosPrueba.reporte_id = 'reporte_test_456';
        datosPrueba.motivo = 'Precio inconsistente';
      }

      // Simular evento
      const resultado = await this.recibirEventoServicio({
        body: {
          evento: tipo_evento,
          datos: datosPrueba
        },
        headers: {
          'x-service-token': process.env.SERVICE_SECRET_TOKEN || 'test_token'
        }
      }, {
        json: (data) => data // Mock response object
      });

      res.json({
        success: true,
        message: 'Prueba de integración ejecutada',
        evento: tipo_evento,
        datos_enviados: datosPrueba,
        resultado
      });

    } catch (error) {
      console.error('Error en prueba de integración:', error);
      res.status(500).json({
        success: false,
        message: 'Error en prueba: ' + error.message
      });
    }
  }

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

  async guardarEnHistorial(categoria, resultado, subtipo = null, metadata = {}) {
    try {
      // Si es evento de auth, usar lógica diferente
      if (categoria === 'evento_auth') {
        const notificacion = new Notification({
          tipo: 'sistema',
          categoria: 'autenticacion',
          usuario_id: metadata.usuario_id || 'sistema',
          titulo: metadata.titulo || 'Evento de autenticación',
          mensaje: metadata.mensaje || 'Evento del sistema de autenticación',
          datos: {
            subtipo: metadata.evento,
            resultado: resultado.success ? 'procesado' : 'fallido',
            detalles: metadata.detalles || {}
          },
          estado: resultado.success ? 'enviada' : 'fallida',
          enviada_en: new Date(),
          error: resultado.error || null
        });

        await notificacion.save();
        return;
      }

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

  async recibirEventoTienda(req, res) {
    try {
      const { evento, datos } = req.body;

      console.log(`🏪 Evento de tienda recibido: ${evento}`);

      let resultado;

      switch (evento) {
        case 'store.price_updated':
          resultado = await this.procesarActualizacionPrecio(datos);
          break;

        case 'store.offer_published':
          resultado = await this.procesarOfertaPublicada(datos);
          break;

        case 'store.report_received':
          resultado = await this.procesarReporteRecibido(datos);
          break;

        case 'store.rating_received':
          resultado = await this.procesarCalificacionRecibida(datos);
          break;

        default:
          resultado = {
            success: false,
            message: `Evento de tienda no reconocido: ${evento}`
          };
      }

      res.json({
        success: true,
        evento,
        procesado: true,
        resultado
      });

    } catch (error) {
      console.error('❌ Error procesando evento de tienda:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno: ' + error.message
      });
    }
  }

  async recibirEventoProfeco(req, res) {
    try {
      const { evento, datos } = req.body;

      console.log(`⚖️ Evento de PROFECO recibido: ${evento}`);

      let resultado;

      switch (evento) {
        case 'profeco.fine_issued':
          resultado = await this.procesarMultaEmitida(datos);
          break;

        case 'profeco.report_resolved':
          resultado = await this.procesarReporteResuelto(datos);
          break;

        case 'profeco.store_suspended':
          resultado = await this.procesarTiendaSuspendida(datos);
          break;

        default:
          resultado = {
            success: false,
            message: `Evento de PROFECO no reconocido: ${evento}`
          };
      }

      res.json({
        success: true,
        evento,
        procesado: true,
        resultado
      });

    } catch (error) {
      console.error('❌ Error procesando evento de PROFECO:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno: ' + error.message
      });
    }
  }

  // Métodos helper para procesar eventos específicos
  async procesarMultaEmitida(datos) {
    const { tienda_id, tienda_nombre, monto, motivo, multa_id } = datos;

    // Buscar administradores de la tienda
    const administradores = await this.obtenerAdministradoresTienda(tienda_id);

    const resultados = [];

    for (const admin of administradores) {
      const resultado = await this.enviarEmailMulta(admin, {
        tienda_nombre,
        monto,
        motivo,
        multa_id,
        fecha_emision: new Date().toLocaleDateString('es-MX')
      });
      resultados.push(resultado);
    }

    return {
      success: true,
      multa_id,
      tienda_nombre,
      administradores_notificados: administradores.length,
      resultados
    };
  }

  async enviarEmailMulta(admin, datosMulta) {
    // TODO: Integrar con EmailService
    console.log(`📧 Enviando email de multa a: ${admin.email}`);

    return {
      success: true,
      email: admin.email,
      enviado: true,
      simulated: process.env.NODE_ENV !== 'production'
    };
  }

  async obtenerAdministradoresTienda(tienda_id) {
    // TODO: Integrar con auth-service para obtener administradores
    // Mock por ahora
    return [
      {
        usuario_id: 'admin_1',
        email: 'admin@tienda.com',
        nombre: 'Administrador de Tienda'
      }
    ];
  }

  async suscribirPush(req, res) {
    try {
        const { usuario_id } = req.params;
        const { token, dispositivo, navegador } = req.body;
        
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token de push es requerido'
            });
        }
        
        await NotificationPreference.findOneAndUpdate(
            { usuario_id },
            {
                $addToSet: {
                    tokens_push: {
                        token,
                        dispositivo: dispositivo || 'desconocido',
                        navegador: navegador || 'desconocido',
                        ultima_actividad: new Date()
                    }
                },
                $set: { push_activo: true }
            },
            { upsert: true, new: true }
        );
        
        res.json({
            success: true,
            message: 'Dispositivo suscrito para notificaciones push'
        });
        
    } catch (error) {
        console.error('❌ Error suscribiendo push:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno: ' + error.message
        });
    }
}

async desuscribirPush(req, res) {
    try {
        const { usuario_id } = req.params;
        const { token } = req.body;
        
        await NotificationPreference.findOneAndUpdate(
            { usuario_id },
            {
                $pull: { tokens_push: { token } }
            }
        );
        
        res.json({
            success: true,
            message: 'Dispositivo desuscrito'
        });
        
    } catch (error) {
        console.error('❌ Error desuscribiendo push:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno: ' + error.message
        });
    }
}

async enviarEmailPrueba(req, res) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
            success: false,
            message: 'Solo disponible en desarrollo'
        });
    }
    
    try {
        const { email, plantilla } = req.body;
        
        const datosPrueba = {
            usuario_nombre: 'Usuario de Prueba',
            producto_nombre: 'Producto de Prueba',
            precio_anterior: 100,
            precio_nuevo: 75,
            tienda_nombre: 'Supermercado Test',
            descuento: 25
        };
        
        // TODO: Integrar con EmailService
        console.log(`📧 Email de prueba a: ${email}, plantilla: ${plantilla}`);
        
        res.json({
            success: true,
            message: 'Email de prueba simulado',
            datos: datosPrueba
        });
        
    } catch (error) {
        console.error('Error en email de prueba:', error);
        res.status(500).json({
            success: false,
            message: 'Error: ' + error.message
        });
    }
}

async probarWebhook(req, res) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
            success: false,
            message: 'Solo disponible en desarrollo'
        });
    }
    
    try {
        // Simular llamada desde auth-service
        const evento = req.body.evento || 'auth.user.registered';
        
        const datosSimulados = {
            usuario_id: 'test_' + Date.now(),
            email: 'test@example.com',
            nombre: 'Usuario Test',
            tipo_usuario: 'CONSUMIDOR',
            timestamp: new Date()
        };
        
        // Procesar el evento
        const resultado = await this.recibirEventoServicio({
            body: { evento, datos: datosSimulados },
            headers: { 'x-service-token': process.env.SERVICE_SECRET_TOKEN || 'test' }
        }, {
            json: (data) => data
        });
        
        res.json({
            success: true,
            message: 'Webhook probado exitosamente',
            evento,
            datos_enviados: datosSimulados,
            resultado
        });
        
    } catch (error) {
        console.error('Error probando webhook:', error);
        res.status(500).json({
            success: false,
            message: 'Error: ' + error.message
        });
    }
}
}

export default NotificationController;