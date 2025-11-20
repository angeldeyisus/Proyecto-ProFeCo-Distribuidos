import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    icono: {
        type: String
    },
    imagen_url: {
        type: String
    },
    padre_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria"
    },
    nivel: {
        type: Number,
        default: 1
    },
    orden: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['activa', 'inactiva'],
        default: 'activa'
    }
}, {
    timestamps: true
});

categoriaSchema.index({ padre_id: 1 });
categoriaSchema.index({ nivel: 1 });
categoriaSchema.index({ orden: 1 });

export default mongoose.model("Categoria", categoriaSchema);