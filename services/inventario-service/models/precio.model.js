import mongoose from "mongoose";

const precioSchema = new mongoose.Schema({
    producto_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Producto,
        require: true,
    },
    tienda_id: {
        type: String,
        require: true,
    },
    precio_normal: {
        type: Number,
        require: true,
    },
    precio_oferta: {
    type: Number,
    default: null,
    },
    es_oferta: {
    type: Boolean,
    default: false,
    },
    fecha_actualizacion: {
    type: Date,
    default: Date.now,
        },
}, { timestamps: true }); // timestamps añade createdAt y updatedAt

// Indexamos para búsquedas rápidas
precioSchema.index({ producto_id: 1, tienda_id: 1 }, { unique: true });
precioSchema.index({ tienda_id: 1 });

// Creamos el "Modelo" (la clase para interactuar)
const Precio = mongoose.model('Precio', precioSchema);

export default Precio;
