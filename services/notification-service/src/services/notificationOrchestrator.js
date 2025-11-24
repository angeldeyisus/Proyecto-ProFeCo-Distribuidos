import emailService from './email.service.js';
import wishlistService from './wishlist.service.js';
import NotificationPreference from '../models/notificacionPreferencia.model.js';

class NotificationOrchestrator {

    async enviarNotificacionOferta(datosOferta) {
    try {
        // Mapear los campos correctos de la base de datos
        const ofertaProcesada = {
            producto_id: datosOferta.producto_id?.replace(',', '') || datosOferta._id?.toString(), // Limpiar la coma
            producto_nombre: datosOferta.producto_nombre || datosOferta.nombre || 'Producto en oferta',
            precio_anterior: datosOferta.precio_original, // ← Este es el campo correcto
            precio_nuevo: datosOferta.precio_promocional, // ← Este es el campo correcto
            precio_actual: datosOferta.precio_promocional,
            precio_original: datosOferta.precio_original,
            categoria: datosOferta.categoria,
            supermercado: datosOferta.tienda_nombre?.replace(',', '') || datosOferta.fumta?.replace(',', '') || 'Supermercado', // Limpiar comas
            tienda_nombre: datosOferta.tienda_nombre?.replace(',', '') || datosOferta.fumta?.replace(',', '') || 'Supermercado',
            descuento: datosOferta.valor_descuento,
            en_oferta: datosOferta.en_oferta,
            ...datosOferta
        };

        console.log(`🎯 Procesando notificación de oferta: ${ofertaProcesada.producto_nombre}`);
        console.log('💰 Precios mapeados:', {
            anterior: ofertaProcesada.precio_anterior,
            nuevo: ofertaProcesada.precio_nuevo,
            descuento: `${ofertaProcesada.descuento}%`
        });

        const usuariosInteresados = await this.obtenerUsuariosInteresados(ofertaProcesada.categoria);
        
        const usuariosParaNotificar = await this.filtrarUsuariosPorPreferencias(
            usuariosInteresados, 
            'ofertas_productos'
        );

        console.log(`👥 Usuarios para notificar: ${usuariosParaNotificar.length} de ${usuariosInteresados.length}`);

        const resultados = [];
        for (const usuario of usuariosParaNotificar) {
            const resultado = await this.enviarNotificacionUsuario(usuario, ofertaProcesada);
            resultados.push(resultado);
        }

        return {
            success: true,
            producto: ofertaProcesada.producto_nombre,
            total_usuarios: usuariosInteresados.length,
            usuarios_notificados: usuariosParaNotificar.length,
            notificaciones_enviadas: resultados.filter(r => r.success).length,
            detalles: resultados
        };

    } catch (error) {
        console.error('❌ Error en orchestrator:', error);
        return { success: false, error: error.message };
    }
}

    async enviarNotificacionWishlist(tipo, datos) {
        try {
            switch(tipo) {
                case 'precio_bajado':
                    return await wishlistService.notificarPrecioBajado(datos);
                case 'producto_en_oferta':
                    return await wishlistService.notificarProductoEnOferta(datos);
                case 'disponibilidad':
                    return await wishlistService.notificarDisponibilidad(datos);
                default:
                    throw new Error(`Tipo de notificación wishlist no soportado: ${tipo}`);
            }
        } catch (error) {
            console.error('❌ Error en notificación wishlist:', error);
            return { success: false, error: error.message };
        }
    }

    async enviarNotificacionUsuario(usuario, datosOferta) {
    try {
        console.log('📦 Datos oferta procesados:', {
            producto: datosOferta.producto_nombre,
            precio_anterior: datosOferta.precio_anterior,
            precio_nuevo: datosOferta.precio_nuevo,
            supermercado: datosOferta.supermercado
        });
        
        const variables = {
            usuario_nombre: usuario.nombre || 'Usuario',
            producto_nombre: datosOferta.producto_nombre || 'Producto',
            precio_anterior: datosOferta.precio_anterior || 0,
            precio_nuevo: datosOferta.precio_nuevo || 0,
            precio_actual: datosOferta.precio_nuevo || 0,
            precio_original: datosOferta.precio_anterior || 0,
            descuento: datosOferta.descuento || (datosOferta.precio_anterior > 0 ? 
                Math.round((1 - datosOferta.precio_nuevo / datosOferta.precio_anterior) * 100) : 0),
            tienda_nombre: datosOferta.tienda_nombre || datosOferta.supermercado,
            supermercado: datosOferta.supermercado,
            enlace_producto: `${process.env.FRONTEND_URL || 'http://localhost:4200'}/productos/${datosOferta.producto_id || 'unknown'}`
        };

        console.log('🔧 Variables finales para plantilla:', variables);

        const resultadoEmail = await emailService.enviarPlantilla(
            usuario.email,
            'oferta_producto',
            variables
        );

        await this.actualizarEstadisticasNotificacion(usuario.usuario_id);

        return {
            usuario_id: usuario.usuario_id,
            email: resultadoEmail,
            success: resultadoEmail.success
        };

    } catch (error) {
        console.error(`❌ Error notificando usuario ${usuario.usuario_id}:`, error);
        return {
            usuario_id: usuario.usuario_id,
            error: error.message,
            success: false
        };
    }
}
    async filtrarUsuariosPorPreferencias(usuarios, tipoNotificacion) {
        const usuariosFiltrados = [];
        
        for (const usuario of usuarios) {
            const preferencias = await NotificationPreference.findOne({ 
                usuario_id: usuario.usuario_id 
            });
            if (!preferencias) {
                usuariosFiltrados.push(usuario);
                continue;
            }
            if (preferencias.puedeRecibirNotificacion(tipoNotificacion, 'email')) {
                usuariosFiltrados.push(usuario);
            }
        }
        
        return usuariosFiltrados;
    }

    async actualizarEstadisticasNotificacion(usuario_id) {
        try {
            await NotificationPreference.findOneAndUpdate(
                { usuario_id },
                { 
                    $inc: { 'estadisticas.total_notificaciones_enviadas': 1 },
                    $set: { 'estadisticas.ultima_notificacion': new Date() }
                },
                { upsert: true }
            );
        } catch (error) {
            console.error('Error actualizando estadísticas:', error);
        }
    }

    // En obtenerUsuariosInteresados - TEMPORAL PARA PRUEBAS
async obtenerUsuariosInteresados(categoria) {
    // Simular delay de base de datos
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return [
        {
            usuario_id: 'user_real_1',
            email: 'paxin83966@bipochub.com', // ← PON TU EMAIL REAL AQUÍ
            nombre: 'Tú (Pruebas)',
            notificaciones_activas: true
        },
    ];
}
}

export default new NotificationOrchestrator();