// services/price-service/src/models/reporte.model.js
import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
    usuario_id: { type: String, required: true },
    usuario_nombre: { type: String }, // Opcional, para no buscarlo después

    tienda_id: { type: String, required: true },
    tienda_nombre: { type: String, required: true },

    producto_id: { type: String, required: true },
    producto_nombre: { type: String, required: true },

    precio_publicado: { type: Number, required: true },

    motivo: { 
        type: String, 
        enum: ['PRECIO_MAYOR', 'NO_EXISTENCIA', 'PRECIO_ESCONDIDO', 'OTRO'],
        required: true 
    },
    comentarios: { type: String, trim: true },

    estado: { 
        type: String, 
        enum: ['PENDIENTE', 'EN_REVISION', 'RESUELTO', 'DESCARTADO'],
        default: 'PENDIENTE'
    }
    }, {
        timestamps: true
});

export default mongoose.model('Reporte', reporteSchema);