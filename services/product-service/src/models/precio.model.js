import mongoose from "mongoose";

const precioSchema = new mongoose.Schema({
    producto_id: {
        type: String,
        required: true
    },
    producto_nombre: {
        type: String,
        trim: true
    },
    tienda_id: {
        type: String,
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

precioSchema.index({ producto_id: 1, tienda_id: 1 }, { unique: true });
precioSchema.index({ tienda_id: 1 });
precioSchema.index({ precio: 1 });
precioSchema.index({ en_oferta: 1 });
precioSchema.index({ "vigencia_oferta.fin": 1 });
precioSchema.index({ "vigencia_oferta.inicio": 1 });
precioSchema.index({ producto_nombre: "text", tienda_nombre: "text" });
precioSchema.index({ disponible: 1 });

precioSchema.pre('save', function(next) {
    if (this.isModified('precio')) {
        if (!this.historial) this.historial = [];
        this.historial.push({
            precio: this.precio,
            en_oferta: this.en_oferta,
            fuente: this.fuente
        });

        if (this.historial.length > 50) {
            this.historial = this.historial.slice(-50);
        }
    }
    next();
});

export default mongoose.model("Precio", precioSchema);