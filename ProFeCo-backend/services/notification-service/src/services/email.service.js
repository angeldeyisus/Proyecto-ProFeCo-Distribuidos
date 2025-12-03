import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

class EmailService {
    constructor() {
        // Debug: Verificar que las variables de entorno se cargaron
        console.log('🔍 Verificando credenciales SMTP:');
        console.log('   SMTP_HOST:', process.env.SMTP_HOST || '❌ NO CONFIGURADO');
        console.log('   SMTP_PORT:', process.env.SMTP_PORT || '❌ NO CONFIGURADO');
        console.log('   SMTP_USER:', process.env.SMTP_USER ? '✅ Configurado' : '❌ NO CONFIGURADO');
        console.log('   SMTP_PASS:', process.env.SMTP_PASS ? '✅ Configurado (oculto)' : '❌ NO CONFIGURADO');

        // Validar que existen las credenciales necesarias
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.error('❌ ERROR: Faltan credenciales SMTP en el archivo .env');
            throw new Error('Configuración SMTP incompleta. Verifica tu archivo .env');
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        console.log('✅ Transporter SMTP configurado correctamente');
    }

   async enviarEmail(destinatario, asunto, contenido, html = null) {
    try {
        const fromName = process.env.SMTP_FROM_NAME || "Profeco Alertas";
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
        
        // ⚠️ IMPORTANTE: Gmail requiere que el "from" sea el mismo que SMTP_USER
        // pero podemos usar un nombre diferente
        const mailOptions = {
            from: `"${fromName}" <${process.env.SMTP_USER}>`,  // ← FORZAR con SMTP_USER
            to: destinatario,
            subject: asunto,
            text: contenido,
            headers: {
                // Headers adicionales para mejorar la presentación
                'X-Priority': '3',
                'X-Mailer': 'Profeco Notification Service'
            },
            ...(html && { html })
        };

        console.log(`📧 Configuración de envío:`);
        console.log(`   - De: ${fromName} <${process.env.SMTP_USER}>`);
        console.log(`   - Para: ${destinatario}`);
        
        const resultado = await this.transporter.sendMail(mailOptions);
        console.log(`✅ Email enviado a: ${destinatario}`);
        return { success: true, messageId: resultado.messageId };
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        return { success: false, error: error.message };
    }
}

    async enviarPlantilla(destinatario, nombrePlantilla, variables = {}) {
        try {
            const plantilla = this.obtenerPlantilla(nombrePlantilla);
            
            if (!plantilla) {
                throw new Error(`Plantilla ${nombrePlantilla} no encontrada`);
            }

            console.log('📧 Procesando plantilla:', nombrePlantilla);
            console.log('📦 Variables recibidas:', JSON.stringify(variables, null, 2));

            const asunto = this.reemplazarVariables(plantilla.asunto, variables);
            const contenido = this.reemplazarVariables(plantilla.contenido_html, variables);

            console.log('✅ Asunto procesado:', asunto);
            console.log('✅ Contenido procesado (primeros 200 chars):', contenido.substring(0, 200) + '...');

            return await this.enviarEmail(destinatario, asunto, contenido, contenido);
        } catch (error) {
            console.error('❌ Error enviando plantilla:', error);
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

        console.log('🔍 Variables para reemplazo:', safeVariables);

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