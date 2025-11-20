import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema({
    usuario_id: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: [
            'oferta',
            'inconsistencia_resuelta', 
            'nuevo_producto',
            'multa_publicada',
            'precio_bajo',
            'producto_favorito_en_oferta',
            'recordatorio_lista'
        ],
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    },
    datos: {
        type: mongoose.Schema.Types.Mixed
    },
    leida: {
        type: Boolean,
        default: false
    },
    fecha_envio: {
        type: Date,
        default: Date.now
    },
    fecha_leida: {
        type: Date
    },
    canal: {
        type: String,
        enum: ['push', 'email', 'sms'],
        default: 'push'
    },
    estado_envio: {
        type: String,
        enum: ['pendiente', 'enviada', 'fallida'],
        default: 'pendiente'
    }
}, {
    timestamps: true
});

notificacionSchema.index({ usuario_id: 1, leida: 1 });
notificacionSchema.index({ tipo: 1 });
notificacionSchema.index({ fecha_envio: 1 });

export default mongoose.model("Notificacion", notificacionSchema);