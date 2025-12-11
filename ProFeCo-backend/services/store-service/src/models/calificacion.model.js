import mongoose from "mongoose";

const calificacionSchema = new mongoose.Schema({
  usuario_id: {
    type: String,
    required: true
  },
  tienda_id: {
    type: String,
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    trim: true,
    maxlength: 500
  },
  titulo: {
    type: String,
    trim: true,
    maxlength: 100
  },
  aspectos: {
    precios: { type: Number, min: 1, max: 5 },
    limpieza: { type: Number, min: 1, max: 5 },
    atencion: { type: Number, min: 1, max: 5 },
    variedad: { type: Number, min: 1, max: 5 }
  },
  recomendada: {
    type: Boolean
  },
  estado: {
    type: String,
    enum: ['activa', 'oculta', 'eliminada'],
    default: 'activa'
  }
}, {
  timestamps: true
});

calificacionSchema.index({ tienda_id: 1, usuario_id: 1 }, { unique: true });
calificacionSchema.index({ tienda_id: 1, puntuacion: 1 });

export default mongoose.model("Calificacion", calificacionSchema);