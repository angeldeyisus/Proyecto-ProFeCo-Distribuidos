import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env
const envPaths = [
    path.join(__dirname, '..', '..', '..', '..', 'prisma', '.env'), // desde services/notification-service/src/services/
    path.join(__dirname, '..', '..', '..', '..', '..', 'prisma', '.env'), // desde ProFeCo-backend/services/
    path.join(__dirname, '..', '.env'), // local
    '.env', // directorio actual
];

for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        break;
    }
}

class EmailService {
    constructor() {
        console.log('📧 Inicializando servicio de email...');

        console.log('🔧 Configuración SMTP:');
        console.log('   Host:', process.env.SMTP_HOST);
        console.log('   Port:', process.env.SMTP_PORT);
        console.log('   User:', process.env.SMTP_USER ? 'Configurado' : 'No configurado');
        console.log('   Pass:', process.env.SMTP_PASS ? 'Configurado' : 'No configurado');
        console.log('   Disabled?:', this.disabled);

        // Solo mostrar warning en desarrollo
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('⚠️ SMTP no configurado. Emails serán simulados.');
            }
            this.disabled = true;
            return;
        }

        try {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT) || 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            this.disabled = false;
        } catch (error) {
            console.error('❌ Error configurando email:', error.message);
            this.disabled = true;
        }
    }

    async enviarEmail(destinatario, asunto, contenido, html = null) {
        if (this.disabled) {
            if (process.env.NODE_ENV !== 'production') {
                console.log(`📧 [SIMULADO] ${destinatario} - ${asunto.substring(0, 30)}...`);
            }
            return {
                success: true,
                message: 'Email simulado',
                simulated: true
            };
        }

        try {
            const fromName = process.env.SMTP_FROM_NAME || "Profeco Alertas";

            const mailOptions = {
                from: `"${fromName}" <${process.env.SMTP_USER}>`,
                to: destinatario,
                subject: asunto,
                text: contenido,
                headers: {
                    'X-Priority': '3',
                    'X-Mailer': 'Profeco Notification Service'
                },
                ...(html && { html })
            };

            const resultado = await this.transporter.sendMail(mailOptions);

            if (process.env.NODE_ENV !== 'production') {
                console.log(`✅ Email enviado: ${destinatario}`);
            }

            return { success: true, messageId: resultado.messageId };
        } catch (error) {
            console.error(`❌ Error email a ${destinatario}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    async enviarPlantilla(destinatario, nombrePlantilla, variables = {}) {
        try {
            const plantilla = this.obtenerPlantilla(nombrePlantilla);

            if (!plantilla) {
                throw new Error(`Plantilla ${nombrePlantilla} no encontrada`);
            }

            const asunto = this.reemplazarVariables(plantilla.asunto, variables);
            const contenido = this.reemplazarVariables(plantilla.contenido_html, variables);

            return await this.enviarEmail(destinatario, asunto, contenido, contenido);
        } catch (error) {
            console.error(`❌ Error plantilla ${nombrePlantilla}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    obtenerPlantilla(nombre) {
        const plantillas = {
            oferta_producto: {
                asunto: '🎉 ¡Oferta especial en {{producto_nombre}}!',
                contenido_html: `
                    <h1>¡Hola {{usuario_nombre}}!</h1>
                    <p>Tenemos una oferta especial para ti en la categoría que te interesa:</p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                        <h2>{{producto_nombre}}</h2>
                        <p><strong>Precio anterior:</strong> <s>{{precio_anterior}}</s></p>
                        <p><strong>Precio nuevo:</strong> {{precio_nuevo}}</p>
                        <p><strong>Descuento:</strong> {{descuento}}%</p>
                        <p><strong>Tienda:</strong> {{tienda_nombre}}</p>
                    </div>
                    <a href="{{enlace_producto}}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver oferta</a>
                    <p style="margin-top: 20px; font-size: 12px; color: #666;">
                        Recibes este email porque tienes activadas las notificaciones de ofertas.
                    </p>
                `
            },

            // PLANTILLAS DE WISHLIST
            wishlist_precio_bajado: {
                asunto: '📉 ¡El precio de {{producto_nombre}} bajó!',
                contenido_html: `
                    <h1>¡Buenas noticias, {{usuario_nombre}}! 🎊</h1>
                    <p>El producto de tu <strong>lista de deseos</strong> bajó de precio:</p>
                    <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 4px solid #28a745;">
                        <h3 style="color: #155724; margin-top: 0;">{{producto_nombre}}</h3>
                        <p><strong>Precio anterior:</strong> <s>{{precio_anterior}}</s></p>
                        <p><strong>Precio actual:</strong> <strong style="color: #28a745; font-size: 1.2em;">{{precio_nuevo}}</strong></p>
                        <p><strong>Ahorras:</strong> <strong style="color: #dc3545;">{{ahorro}} ({{descuento}}%)</strong></p>
                        <p><strong>Tienda:</strong> {{tienda_nombre}}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <a href="{{enlace_producto}}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver producto y comparar precios</a>
                    </div>
                    <p style="font-size: 12px; color: #666;">
                        ⭐ Este producto está en tu lista de deseos. ¡Es el momento perfecto para comprarlo!
                    </p>
                `
            },

            wishlist_producto_oferta: {
                asunto: '🎉 ¡{{producto_nombre}} en OFERTA ESPECIAL!',
                contenido_html: `
                    <h1>¡Oferta especial en tu lista de deseos! 🔥</h1>
                    <p>Tenemos una <strong>oferta limitada</strong> en un producto que guardaste:</p>
                    <div style="background: #fff3cd; padding: 20px; border-radius: 10px; border-left: 4px solid #ffc107;">
                        <h3 style="color: #856404; margin-top: 0;">{{producto_nombre}}</h3>
                        <p><strong>Precio regular:</strong> <s>{{precio_original}}</s></p>
                        <p><strong>Precio oferta:</strong> <strong style="color: #dc3545; font-size: 1.3em;">{{precio_oferta}}</strong></p>
                        <p><strong>Descuento:</strong> <strong style="color: #dc3545;">{{descuento}}% DE DESCUENTO</strong></p>
                        <p><strong>Tienda:</strong> {{tienda_nombre}}</p>
                        <p><strong>⏰ Válido hasta:</strong> {{vigencia}}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <a href="{{enlace_producto}}" style="background: #ffc107; color: black; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">¡Aprovechar oferta ahora!</a>
                    </div>
                    <p style="font-size: 12px; color: #666;">
                        🚀 Oferta por tiempo limitado. ¡No te la pierdas!
                    </p>
                `
            },

            wishlist_disponibilidad: {
                asunto: '🏪 ¡{{producto_nombre}} disponible en {{tienda_nombre}}!',
                contenido_html: `
                    <h1>¡Producto disponible! 📦</h1>
                    <p>El producto de tu lista de deseos <strong>ya está disponible</strong>:</p>
                    <div style="background: #d1ecf1; padding: 20px; border-radius: 10px; border-left: 4px solid #17a2b8;">
                        <h3 style="color: #0c5460; margin-top: 0;">{{producto_nombre}}</h3>
                        <p><strong>🏪 Tienda:</strong> {{tienda_nombre}}</p>
                        {{#if es_tienda_favorita}}
                        <p style="color: #155724;">⭐ <strong>¡Esta es una de tus tiendas favoritas!</strong></p>
                        {{/if}}
                    </div>
                    <div style="margin: 20px 0;">
                        <a href="{{enlace_producto}}" style="background: #17a2b8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Ver disponibilidad y precios</a>
                    </div>
                `
            },

            // AUTH: Registro y verificación
            auth_bienvenida_consumidor: {
                asunto: '🎉 ¡Bienvenido a ProFeCo, {{usuario_nombre}}!',
                contenido_html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a ProFeCo!</h1>
                    <p style="font-size: 18px; opacity: 0.9;">Tu plataforma para comparar precios</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Hola {{usuario_nombre}},</h2>
                    
                    <p style="color: #555; line-height: 1.6;">
                        ¡Gracias por registrarte en ProFeCo! Tu cuenta de <strong>{{tipo_usuario}}</strong> 
                        ha sido creada exitosamente.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4CAF50;">
                        <h3 style="color: #333; margin-top: 0;">🎯 Comienza a explorar:</h3>
                        <ul style="color: #555; line-height: 1.8;">
                            <li><strong>🔍 Compara precios</strong> entre diferentes supermercados</li>
                            <li><strong>❤️ Crea listas de deseos</strong> con tus productos favoritos</li>
                            <li><strong>⚠️ Reporta inconsistencias</strong> en precios</li>
                            <li><strong>⭐ Califica tiendas</strong> y ayuda a otros consumidores</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{{login_url}}" style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                            Comenzar a usar ProFeCo
                        </a>
                    </div>
                    
                    <p style="color: #777; font-size: 14px; border-top: 1px solid #eee; padding-top: 20px;">
                        Fecha de registro: <strong>{{fecha_registro}}</strong><br>
                        Email registrado: <strong>{{usuario_email}}</strong>
                    </p>
                </div>
                
                <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
                    <p>© 2024 ProFeCo - Protección Federal del Consumidor</p>
                    <p>Este es un correo automático, por favor no responder.</p>
                </div>
            </div>
        `
            },

            auth_bienvenida_tienda: {
                asunto: '🏪 ¡Bienvenido a ProFeCo como Tienda, {{usuario_nombre}}!',
                contenido_html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">¡Bienvenido como Tienda!</h1>
                    <p style="font-size: 18px; opacity: 0.9;">Tu conexión directa con los consumidores</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333;">Hola {{usuario_nombre}},</h2>
                    
                    <p style="color: #555; line-height: 1.6;">
                        ¡Bienvenido a ProFeCo como <strong>Tienda registrada</strong>! 
                        Tu establecimiento <strong>{{tienda_nombre}}</strong> ahora forma parte 
                        de nuestra red de comparación de precios.
                    </p>
                    
                    <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="color: #2e7d32; margin-top: 0;">✨ Beneficios para tu tienda:</h3>
                        <ul style="color: #555; line-height: 1.8;">
                            <li><strong>📈 Mayor visibilidad</strong> frente a consumidores</li>
                            <li><strong>📊 Estadísticas detalladas</strong> de búsquedas</li>
                            <li><strong>💬 Comentarios directos</strong> de clientes</li>
                            <li><strong>🎯 Wishlists de productos</strong> demandados</li>
                            <li><strong>🔔 Notificaciones</strong> de productos populares</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{{login_url}}" style="background: #f5576c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                            Acceder al panel de tienda
                        </a>
                    </div>
                    
                    <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="color: #856404; margin: 0;">
                            <strong>📝 Próximo paso:</strong> Comienza subiendo los precios de tus productos 
                            para aparecer en las búsquedas de los consumidores.
                        </p>
                    </div>
                </div>
            </div>
        `
            },

            verificacion_tienda: {
                asunto: '✅ Verifica tu cuenta de tienda en ProFeCo',
                contenido_html: `
      <h1>Verificación de cuenta de tienda</h1>
      <p>Hola <strong>{{usuario_nombre}}</strong>,</p>
      <p>Para activar tu cuenta de tienda en ProFeCo, necesitas verificar tu email.</p>
      <p><strong>Tu tienda:</strong> {{tienda_nombre}}</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <p>🔗 <strong>Enlace de verificación:</strong></p>
        <a href="{{verification_url}}" style="word-break: break-all;">{{verification_url}}</a>
        <p style="color: #dc3545; margin-top: 10px;">
          ⏰ <strong>Válido por 24 horas</strong>
        </p>
      </div>
      <p>Después de verificar, podrás:</p>
      <ul>
        <li>📊 Subir precios y ofertas</li>
        <li>📈 Ver reportes de clientes</li>
        <li>🔔 Recibir wishlists de consumidores</li>
        <li>🏪 Administrar tu perfil de tienda</li>
      </ul>
    `
            },

            recuperacion_password: {
                asunto: '🔒 Restablece tu contraseña en ProFeCo',
                contenido_html: `
      <h1>Restablecimiento de contraseña</h1>
      <p>Hola <strong>{{usuario_nombre}}</strong>,</p>
      <p>Recibimos una solicitud para restablecer tu contraseña en ProFeCo.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{reset_url}}" style="background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          Restablecer contraseña
        </a>
      </div>
      <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
        <p>⚠️ <strong>Importante:</strong></p>
        <ul>
          <li>Este enlace expira en <strong>1 hora</strong></li>
          <li>Si no solicitaste este cambio, ignora este email</li>
          <li>Tu contraseña actual seguirá funcionando hasta que la cambies</li>
        </ul>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">
        IP de la solicitud: {{ip_address}}<br>
        Hora: {{timestamp}}
      </p>
    `
            },

            // AUTH: Seguridad
            login_nuevo_dispositivo: {
                asunto: '📱 Nuevo inicio de sesión en ProFeCo',
                contenido_html: `
      <h1>Nuevo inicio de sesión detectado</h1>
      <p>Hola <strong>{{usuario_nombre}}</strong>,</p>
      <p>Se detectó un nuevo inicio de sesión en tu cuenta:</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
        <p><strong>📅 Fecha y hora:</strong> {{timestamp}}</p>
        <p><strong>📍 Ubicación aproximada:</strong> {{ubicacion}}</p>
        <p><strong>🖥️ Dispositivo/Navegador:</strong> {{dispositivo}}</p>
        <p><strong>🌐 Dirección IP:</strong> {{ip_address}}</p>
      </div>
      <div style="margin: 20px 0;">
        <p>¿No reconoces esta actividad?</p>
        <a href="{{seguridad_url}}" style="background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Revisar actividad de la cuenta
        </a>
      </div>
    `
            },

            // PROFECO
            multa_asignada: {
                asunto: '⚖️ Multa asignada a tu tienda - ProFeCo',
                contenido_html: `
      <h1>Notificación de multa</h1>
      <p>Estimado administrador de <strong>{{tienda_nombre}}</strong>,</p>
      <p>Se ha asignado una multa a tu establecimiento:</p>
      <div style="background: #f8d7da; padding: 20px; border-radius: 10px;">
        <p><strong>📋 Motivo:</strong> {{motivo}}</p>
        <p><strong>📅 Fecha emisión:</strong> {{fecha_emision}}</p>
        <p><strong>📄 Referencia:</strong> {{multa_id}}</p>
      </div>
      <div style="margin: 20px 0;">
        <p>Para más detalles y proceder con el pago o apelación:</p>
        <a href="{{multa_url}}" style="background: #6c757d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Ver detalles de la multa
        </a>
      </div>
    `
            }
        };

        return plantillas[nombre];
    }

    reemplazarVariables(texto, variables) {
        // Crear objeto seguro con valores por defecto
        const safeVariables = {
            usuario_nombre: variables.usuario_nombre || 'Usuario',
            producto_nombre: variables.producto_nombre || 'Producto',
            precio_anterior: variables.precio_anterior || variables.precio_original || '0.00',
            precio_nuevo: variables.precio_nuevo || variables.precio_oferta || variables.precio_actual || '0.00',
            precio_actual: variables.precio_actual || variables.precio_nuevo || '0.00',
            precio_original: variables.precio_original || variables.precio_anterior || '0.00',
            descuento: variables.descuento || 0,
            tienda_nombre: variables.tienda_nombre || variables.supermercado || 'Supermercado',
            enlace_producto: variables.enlace_producto || '#',
            ...variables
        };

        // Reemplazo simple y seguro
        return texto.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            const value = safeVariables[key];
            if (value === undefined) {
                console.warn(`⚠️ Variable no encontrada: {{${key}}}`);
                return 'N/A';
            }
            return value;
        });
    }

    // Métodos helper
    calcularDescuento(precioAnterior, precioNuevo) {
        try {
            const anterior = parseFloat(precioAnterior);
            const nuevo = parseFloat(precioNuevo);

            if (isNaN(anterior) || isNaN(nuevo) || anterior === 0) return 0;

            return Math.round(((anterior - nuevo) / anterior) * 100);
        } catch (error) {
            return 0;
        }
    }

    calcularAhorro(precioAnterior, precioNuevo) {
        try {
            const anterior = parseFloat(precioAnterior);
            const nuevo = parseFloat(precioNuevo);

            if (isNaN(anterior) || isNaN(nuevo)) return '0.00';

            return (anterior - nuevo).toFixed(2);
        } catch (error) {
            return '0.00';
        }
    }
}

export default new EmailService();