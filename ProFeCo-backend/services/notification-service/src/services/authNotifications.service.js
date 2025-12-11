// services/authNotifications.service.js
import emailService from './email.service.js';
import NotificationPreference from '../models/notificacionPreferencia.model.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AuthNotificationService {
    async enviarNotificacionRegistro(usuarioData) {
        try {
            // 1. Crear preferencias por defecto
            await this.crearPreferenciasPorDefecto(usuarioData.usuario_id);
            
            // 2. Enviar email según tipo de usuario
            switch(usuarioData.tipo_usuario) {
                case 'CONSUMIDOR':
                    return await this.enviarEmailBienvenidaConsumidor(usuarioData);
                case 'TIENDA':
                    return await this.enviarEmailVerificacionTienda(usuarioData);
                case 'PROFECO':
                    return await this.enviarEmailBienvenidaProfeco(usuarioData);
                default:
                    return { success: false, error: 'Tipo de usuario no válido' };
            }
        } catch (error) {
            console.error('Error en notificación de registro:', error);
            return { success: false, error: error.message };
        }
    }
    
    async enviarEmailBienvenidaConsumidor(usuarioData) {
        const variables = {
            usuario_nombre: usuarioData.nombre,
            tipo_usuario: 'Consumidor',
            fecha_registro: new Date().toLocaleDateString('es-MX'),
            login_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`
        };
        
        return await emailService.enviarPlantilla(
            usuarioData.email,
            'bienvenida_consumidor',
            variables
        );
    }
    
    async enviarEmailVerificacionTienda(usuarioData) {
        // Obtener datos de la tienda
        const tienda = await prisma.tienda.findUnique({
            where: { usuario_id: usuarioData.usuario_id }
        });
        
        const verificationToken = this.generarTokenVerificacion();
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        
        // Guardar token en PostgreSQL (añadir campo verification_token a modelo Usuario)
        await prisma.usuario.update({
            where: { usuario_id: usuarioData.usuario_id },
            data: { 
                verification_token: verificationToken,
                verification_expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
            }
        });
        
        const variables = {
            usuario_nombre: usuarioData.nombre,
            tienda_nombre: tienda?.nombre || usuarioData.nombre,
            verification_url: verificationUrl
        };
        
        return await emailService.enviarPlantilla(
            usuarioData.email,
            'verificacion_tienda',
            variables
        );
    }
    
    async enviarNotificacionRecuperacionPassword(usuarioData, resetToken) {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        const variables = {
            usuario_nombre: usuarioData.nombre,
            reset_url: resetUrl,
            ip_address: usuarioData.ip || 'No disponible',
            timestamp: new Date().toLocaleString('es-MX')
        };
        
        return await emailService.enviarPlantilla(
            usuarioData.email,
            'recuperacion_password',
            variables
        );
    }
    
    async crearPreferenciasPorDefecto(usuario_id) {
        try {
            const preferencias = {
                usuario_id,
                // Activar solo email por defecto
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
            
            await NotificationPreference.create(preferencias);
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
        return crypto.randomBytes(32).toString('hex');
    }
}

export default new AuthNotificationService();