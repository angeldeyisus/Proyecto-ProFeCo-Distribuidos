import mongoose from "mongoose";

const listaCompraSchema = new mongoose.Schema({
    usuario_id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    items: [{
        producto_id: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            default: 1,
            min: 1
        },
        comprado: {
            type: Boolean,
            default: false
        },
        precio_presupuestado: {
            type: Number,
            min: 0
        },
        notas: {
            type: String,
            trim: true
        }
    }],
    presupuesto_total: {
        type: Number,
        min: 0
    },
    fecha_estimada_compra: {
        type: Date
    }
}, {
    timestamps: true
});

listaCompraSchema.index({ usuario_id: 1 });
listaCompraSchema.index({ "items.producto_id": 1 });

export default mongoose.model("ListaCompra", listaCompraSchema);