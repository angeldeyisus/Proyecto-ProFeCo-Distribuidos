import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['email', 'push', 'sms', 'in_app']
    },
    categoria: {
        type: String,
        required: true,
        enum: ['oferta_producto', 'precio_bajado', 'nuevo_producto', 'alerta_wishlist', 'general']
    },
    usuario_id: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
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