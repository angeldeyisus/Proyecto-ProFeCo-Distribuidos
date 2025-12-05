import emailService from './email.service.js';
import wishlistService from './wishlist.service.js';
import NotificationPreference from '../models/notificacionPreferencia.model.js';

class NotificationOrchestrator {
    constructor() {
        this.isProduction = process.env.NODE_ENV === 'production';
    }

    log(message, level = 'info') {
        if (!this.isProduction || level === 'error') {
            const prefixes = { error: '❌', info: '📌', warn: '⚠️' };
            console.log(`${prefixes[level] || '📝'} ${message}`);
        }
    }

    async enviarNotificacionOferta(datosOferta) {
        try {
            const ofertaProcesada = {
                producto_id: datosOferta.producto_id?.replace(',', '') || datosOferta._id?.toString(),
                producto_nombre: datosOferta.producto_nombre || datosOferta.nombre || 'Producto en oferta',
                precio_anterior: datosOferta.precio_original,
                precio_nuevo: datosOferta.precio_promocional,
                precio_actual: datosOferta.precio_promocional,
                precio_original: datosOferta.precio_original,
                categoria: datosOferta.categoria,
                supermercado: datosOferta.tienda_nombre?.replace(',', '') || datosOferta.fumta?.replace(',', '') || 'Supermercado',
                tienda_nombre: datosOferta.tienda_nombre?.replace(',', '') || datosOferta.fumta?.replace(',', '') || 'Supermercado',
                descuento: datosOferta.valor_descuento,
                en_oferta: datosOferta.en_oferta,
                ...datosOferta
            };

            this.log(`Procesando oferta: ${ofertaProcesada.producto_nombre}`);

            const usuariosInteresados = await this.obtenerUsuariosInteresados(ofertaProcesada.categoria);
            const usuariosParaNotificar = await this.filtrarUsuariosPorPreferencias(
                usuariosInteresados, 
                'ofertas_productos'
            );

            this.log(`${usuariosParaNotificar.length} usuarios serán notificados`);

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
                notificaciones_enviadas: resultados.filter(r => r.success).length
            };

        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
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
                    throw new Error(`Tipo no soportado: ${tipo}`);
            }
        } catch (error) {
            this.log(`Error wishlist: ${error.message}`, 'error');
            return { success: false, error: error.message };
        }
    }

    async enviarNotificacionUsuario(usuario, datosOferta) {
        try {
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

            const resultadoEmail = await emailService.enviarPlantilla(
                usuario.email,
                'oferta_producto',
                variables
            );

            await this.actualizarEstadisticasNotificacion(usuario.usuario_id);

            if (resultadoEmail.success) {
                this.log(`✅ Email a: ${usuario.email}`);
            }

            return {
                usuario_id: usuario.usuario_id,
                email: resultadoEmail,
                success: resultadoEmail.success
            };

        } catch (error) {
            this.log(`Error usuario ${usuario.usuario_id}: ${error.message}`, 'error');
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
            // Silencioso
        }
    }

    async obtenerUsuariosInteresados(categoria) {
        await new Promise(resolve => setTimeout(resolve, 150));
        
        return [
            {
                usuario_id: 'user_real_1',
                email: 'bosise8983@feralrex.com',
                nombre: 'Tú (Pruebas)',
                notificaciones_activas: true
            },
        ];
    }
}

export default new NotificationOrchestrator();