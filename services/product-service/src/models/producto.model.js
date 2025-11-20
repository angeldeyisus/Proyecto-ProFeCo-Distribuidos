import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    marca: {
        type: String,
        trim: true
    },
    categoria_id: {
        type: String,
        required: true
    },
    upc: {
        type: String, // Código de barras
        unique: true,
        sparse: true
    },
    imagen_url: {
        type: String
    },
    unidad_medida: {
        type: String, // "kg", "litro", "pieza", "paquete"
        required: true
    },
    contenido: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'descontinuado'],
        default: 'activo'
    },
    atributos: {
        perecedero: { type: Boolean, default: false },
        organico: { type: Boolean, default: false },
        gluten_free: { type: Boolean, default: false },
        lactosa_free: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

productoSchema.index({ nombre: "text", descripcion: "text" });
productoSchema.index({ categoria_id: 1 });
productoSchema.index({ marca: 1 });
productoSchema.index({ upc: 1 });

export default mongoose.model("Producto", productoSchema);