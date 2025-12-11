import mongoose from 'mongoose';

const resenaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true },
  usuario_nombre: { type: String, required: true },
  
  tienda_id: { type: String, required: true },
  tienda_nombre: { type: String, required: true },
  
  calificacion: { type: Number, required: true, min: 1, max: 5 }, // 1 a 5 estrellas
  comentario: { type: String, trim: true },
  
  fecha: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Índice compuesto para evitar que un usuario califique 2 veces la misma tienda (opcional)
resenaSchema.index({ usuario_id: 1, tienda_id: 1 }, { unique: true });

export default mongoose.model('Resena', resenaSchema);