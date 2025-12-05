import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['email', 'push', 'sms', 'in_app', 'sistema', 'webhook'] // ← Agregar 'sistema'
    },

    categoria: {
        type: String,
        required: true,
        enum: [
            'oferta_producto', 'precio_bajado', 'nuevo_producto', 'alerta_wishlist', 'general',
            'registro_usuario', 'verificacion_email', 'recuperacion_password', 'login_nuevo_dispositivo', // ← Nuevas
            'reporte_recibido', 'multa_asignada', 'calificacion_nueva',
            'evento_servicio', 'autenticacion' // ← Agregar estas
        ]
    },
    usuario_id: {
        type: String,
        required: true,
        ref: 'Usuario',
        index: true
    },

    tienda_id: {
        type: String,
        ref: 'Tienda'
    },
    producto_id: {
        type: String,
        ref: 'Producto'
    },
    titulo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    prioridad: {
        type: String,
        enum: ['baja', 'media', 'alta', 'critica'],
        default: 'media'
    },
    expira_en: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
    },
    datos: {
        type: mongoose.Schema.Types.Mixed
    },
    estado: {
        type: String,
        enum: ['pendiente', 'enviada', 'fallida', 'leida'],
        default: 'pendiente'
    },
    intentos: {
        type: Number,
        default: 0
    },
    programada_para: {
        type: Date,
        default: Date.now
    },
    enviada_en: Date,
    error: String
}, {
    timestamps: true
});

notificationSchema.index({ usuario_id: 1, estado: 1 });
notificationSchema.index({ categoria: 1 });
notificationSchema.index({ programada_para: 1 });

export default mongoose.model("Notification", notificationSchema);