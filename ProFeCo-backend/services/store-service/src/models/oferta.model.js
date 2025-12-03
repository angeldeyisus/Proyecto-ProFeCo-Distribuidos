import mongoose from "mongoose";

const ofertaSchema = new mongoose.Schema({
    tienda_id: {
        type: String,
        required: true
    },
    producto_id: {
        type: String,
        required: true
    },
    precio_oferta: {
        type: Number,
        required: true,
        min: 0
    },
    precio_regular: {
        type: Number,
        required: true,
        min: 0
    },
    descuento_porcentaje: {
        type: Number,
        min: 0,
        max: 100
    },
    descripcion: {
        type: String,
        trim: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    stock_oferta: {
        type: Number
    },
    estado: {
        type: String,
        enum: ['activa', 'expirada', 'cancelada', 'agotada'],
        default: 'activa'
    },
    notificaciones_enviadas: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

ofertaSchema.index({ tienda_id: 1, producto_id: 1 });
ofertaSchema.index({ fecha_fin: 1 });
ofertaSchema.index({ estado: 1 });

export default mongoose.model("Oferta", ofertaSchema);