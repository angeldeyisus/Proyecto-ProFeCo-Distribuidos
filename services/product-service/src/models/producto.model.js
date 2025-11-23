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
    categoria_nombre: {
        type: String,
        trim: true
    },
    upc: {
        type: String, // Código de barras
        unique: true,
        sparse: true
    },
    sku: {
        type: String,
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
    },
    tags: [{
        type: String,
        trim: true
    }],
    metadata: {
        tipo: String,
        peso_unitario: Number,
        volumen: Number
    }
}, {
    timestamps: true
});

productoSchema.index({ nombre: "text", descripcion: "text" });
productoSchema.index({ categoria_id: 1 });
productoSchema.index({ marca: 1 });
productoSchema.index({ upc: 1 });
productoSchema.index({ sku: 1 });
productoSchema.index({ estado: 1 });
productoSchema.index({ "atributos.organico": 1 });
productoSchema.index({ tags: 1 });

export default mongoose.model("Producto", productoSchema);