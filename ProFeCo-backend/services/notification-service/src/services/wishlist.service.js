import emailService from './email.service.js';
import NotificationPreference from '../models/notificacionPreferencia.model.js';
import Preferencia from '../models/preferencia.model.js';

class WishlistService {
    
    async notificarPrecioBajado(datosProducto) {
        const { producto_id, producto_nombre, precio_anterior, precio_nuevo, tiendas } = datosProducto;
        
        console.log(`📨 Procesando notificación de precio bajado para: ${producto_nombre}`);

        const usuariosConProducto = await this.obtenerUsuariosConProductoEnWishlist(producto_id);

        const usuariosParaNotificar = await this.filtrarUsuariosPorPreferencias(
            usuariosConProducto, 
            'wishlist'
        );
        
        console.log(`👥 Usuarios a notificar: ${usuariosParaNotificar.length} de ${usuariosConProducto.length}`);

        const resultados = [];
        for (const usuario of usuariosParaNotificar) {
            const resultado = await this.enviarNotificacionWishlist(usuario, {
                tipo: 'precio_bajado',
                producto_id,
                producto_nombre,
                precio_anterior,
                precio_nuevo,
                tiendas,
                descuento: Math.round((1 - precio_nuevo / precio_anterior) * 100)
            });
            resultados.push(resultado);
        }
        
        return {
            success: true,
            producto: producto_nombre,
            total_usuarios: usuariosConProducto.length,
            usuarios_notificados: usuariosParaNotificar.length,
            detalles: resultados
        };
    }
    
    async notificarProductoEnOferta(datosOferta) {
        const { producto_id, producto_nombre, precio_original, precio_oferta, vigencia } = datosOferta;
        
        console.log(`🔥 Procesando notificación de oferta para: ${producto_nombre}`);
        
        const usuariosConProducto = await this.obtenerUsuariosConProductoEnWishlist(producto_id);
        const usuariosParaNotificar = await this.filtrarUsuariosPorPreferencias(usuariosConProducto, 'wishlist');
        
        const resultados = [];
        for (const usuario of usuariosParaNotificar) {
            const resultado = await this.enviarNotificacionWishlist(usuario, {
                tipo: 'producto_en_oferta',
                producto_id,
                producto_nombre,
                precio_original,
                precio_oferta,
                vigencia,
                descuento: Math.round((1 - precio_oferta / precio_original) * 100)
            });
            resultados.push(resultado);
        }
        
        return {
            success: true,
            producto: producto_nombre,
            total_usuarios: usuariosConProducto.length,
            usuarios_notificados: usuariosParaNotificar.length,
            detalles: resultados
        };
    }
    
    async notificarDisponibilidad(datosDisponibilidad) {
        const { producto_id, producto_nombre, tienda_nombre, es_tienda_favorita } = datosDisponibilidad;
        
        console.log(`📦 Procesando notificación de disponibilidad para: ${producto_nombre}`);
        
        const usuariosConProducto = await this.obtenerUsuariosConProductoEnWishlist(producto_id);
        const usuariosParaNotificar = await this.filtrarUsuariosPorPreferencias(usuariosConProducto, 'wishlist');
        
        const resultados = [];
        for (const usuario of usuariosParaNotificar) {
            const resultado = await this.enviarNotificacionWishlist(usuario, {
                tipo: 'disponibilidad',
                producto_id,
                producto_nombre,
                tienda_nombre,
                es_tienda_favorita
            });
            resultados.push(resultado);
        }
        
        return {
            success: true,
            producto: producto_nombre,
            total_usuarios: usuariosConProducto.length,
            usuarios_notificados: usuariosParaNotificar.length,
            detalles: resultados
        };
    }
    
    async enviarNotificacionWishlist(usuario, datos) {
        try {
            const variables = {
                usuario_nombre: usuario.nombre,
                producto_nombre: datos.producto_nombre,
                enlace_producto: `${process.env.FRONTEND_URL || 'http://localhost:4200'}/productos/${datos.producto_id}`,
                ...datos
            };
            
            let plantilla = '';
            let asunto = '';
            
            switch(datos.tipo) {
                case 'precio_bajado':
                    plantilla = 'wishlist_precio_bajado';
                    break;
                case 'producto_en_oferta':
                    plantilla = 'wishlist_producto_oferta';
                    break;
                case 'disponibilidad':
                    plantilla = 'wishlist_disponibilidad';
                    break;
                default:
                    throw new Error(`Tipo de notificación no soportado: ${datos.tipo}`);
            }

            const resultadoEmail = await emailService.enviarPlantilla(
                usuario.email,
                plantilla,
                variables
            );

            await this.actualizarEstadisticasNotificacion(usuario.usuario_id);
            
            return {
                usuario_id: usuario.usuario_id,
                tipo: datos.tipo,
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
    
    // 🔥 MÉTODO REAL CON MONGOOSE
    async obtenerUsuariosConProductoEnWishlist(producto_id) {
        try {
            console.log(`🔍 Buscando usuarios interesados en el producto: ${producto_id}`);

            // 1. Buscamos en la BD real
            // Filtramos quienes tengan el producto en su array 'wishlist'
            const preferencias = await Preferencia.find({ 
                wishlist: producto_id 
            }).select('usuario_id email'); // Solo necesitamos ID y Email

            if (preferencias.length === 0) {
                console.log("⚠️ Nadie tiene este producto en su wishlist.");
                return [];
            }

            // 2. Mapeamos los resultados al formato que espera el sistema
            // Ya no hay mocks, esto es información real de la BD
            const usuariosReales = preferencias.map(pref => ({
                usuario_id: pref.usuario_id,
                email: pref.email, // ¡Aquí está el email real!
                nombre: 'Usuario'  // El nombre es opcional para la notificación, o puedes guardarlo también
            }));

            console.log(`✅ Se encontraron ${usuariosReales.length} interesados reales.`);
            return usuariosReales;

        } catch (error) {
            console.error('❌ Error buscando en wishlist:', error);
            return [];
        }
    }
}

export default new WishlistService();