import mongoose from "mongoose";

const multaSchema = new mongoose.Schema({
  tienda_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tienda",
    required: true
  },
  inconsistencia_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inconsistencia"
  },
  motivo: {
    type: String,
    required: true,
    trim: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  tipo_multa: {
    type: String,
    enum: ['leve', 'grave', 'muy_grave'],
    required: true
  },
  fecha_emision: {
    type: Date,
    default: Date.now
  },
  fecha_limite_pago: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'pagada', 'en_apelacion', 'vencida'],
    default: 'pendiente'
  },
  descripcion: {
    type: String,
    trim: true
  },
  recurrencia: {
    type: Number,
    default: 1
  } // Número de veces que ha sido multada por lo mismo
}, {
  timestamps: true
});

multaSchema.index({ tienda_id: 1 });
multaSchema.index({ estado: 1 });
multaSchema.index({ fecha_limite_pago: 1 });

export default mongoose.model("Multa", multaSchema);