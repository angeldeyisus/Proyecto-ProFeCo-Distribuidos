import mongoose from "mongoose";

const precioSchema = new mongoose.Schema({
    producto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
    },
    tienda_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tienda",
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    precio_promocional: {
        type: Number,
        min: 0
    },
    disponible: {
        type: Boolean,
        default: true
    },
    ultima_actualizacion: {
        type: Date,
        default: Date.now
    },
    fuente: {
        type: String,
        enum: ['tienda', 'usuario', 'sistema'],
        default: 'tienda'
    }
}, {
    timestamps: true
});

precioSchema.index({ producto_id: 1, tienda_id: 1 }, { unique: true });
precioSchema.index({ tienda_id: 1 });
precioSchema.index({ precio: 1 });
precioSchema.index({ ultima_actualizacion: 1 });

export default mongoose.model("Precio", precioSchema);