import mongoose from "mongoose";

const inconsistenciaSchema = new mongoose.Schema({
    reporte_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reporte",
        required: true
    },
    tienda_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tienda",
        required: true
    },
    producto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
    },
    precio_publicado: {
        type: Number,
        required: true,
        min: 0
    },
    precio_real: {
        type: Number,
        required: true,
        min: 0
    },
    diferencia: {
        type: Number,
        required: true
    },
    porcentaje_diferencia: {
        type: Number,
        required: true
    },
    evidencia_url: {
        type: String
    },
    estado: {
        type: String,
        enum: ['reportada', 'en_investigacion', 'confirmada', 'rechazada', 'resuelta'],
        default: 'reportada'
    },
    fecha_reporte: {
        type: Date,
        default: Date.now
    },
    fecha_resolucion: {
        type: Date
    },
    comentario_investigacion: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

inconsistenciaSchema.index({ tienda_id: 1 });
inconsistenciaSchema.index({ estado: 1 });
inconsistenciaSchema.index({ porcentaje_diferencia: 1 });

export default mongoose.model("Inconsistencia", inconsistenciaSchema);