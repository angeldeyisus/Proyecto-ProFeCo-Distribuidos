import mongoose from "mongoose";

const precioSchema = new mongoose.Schema({
    producto_id: {
        type: String, // ID de referencia a Productos
        required: true
    },
    producto_nombre: {
        type: String,
        trim: true
    },
    tienda_id: {
        type: String, // UUID de referencia a PostgreSQL
        required: true
    },
    tienda_nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },

    en_oferta: {
        type: Boolean,
        default: false
    },
    precio_original: {
        type: Number,
        min: 0
    },
    precio_promocional: {
        type: Number,
        min: 0
    },
    tipo_descuento: {
        type: String,
        enum: ['porcentaje', 'monto_fijo'],
        default: 'porcentaje'
    },
    valor_descuento: {
        type: Number,
        min: 0
    },
    vigencia_oferta: {
        inicio: Date,
        fin: Date
    },
    condiciones_oferta: {
        compra_minima: Number,
        limite_por_cliente: Number,
        exclusivo_membresia: Boolean
    },
    // Historial de cambios de precio
    historial: [{
        precio: Number,
        fecha: { type: Date, default: Date.now },
        fuente: String,
        en_oferta: Boolean
    }],

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

// Índices para búsquedas rápidas
precioSchema.index({ producto_id: 1, tienda_id: 1 }, { unique: true });
precioSchema.index({ tienda_id: 1 });
precioSchema.index({ precio: 1 });
precioSchema.index({ en_oferta: 1 });

// --- CORRECCIÓN DEFINITIVA DEL HOOK ---
// Usamos async function SIN el parámetro 'next'.
// Mongoose esperará a que esta función termine automáticamente.
precioSchema.pre('save', async function() {
    // 'this' se refiere al documento que se está guardando
    if (this.isModified('precio')) {
        if (!this.historial) {
            this.historial = [];
        }
        
        // Agregamos el cambio actual al historial
        this.historial.push({
            precio: this.precio,
            en_oferta: this.en_oferta,
            fuente: this.fuente || 'sistema'
        });

        // Mantenemos solo los últimos 50 registros para no saturar la BD
        if (this.historial.length > 50) {
            this.historial = this.historial.slice(-50);
        }
    }
    // No hace falta llamar a next(), simplemente terminamos la función.
});

export default mongoose.model("Precio", precioSchema);