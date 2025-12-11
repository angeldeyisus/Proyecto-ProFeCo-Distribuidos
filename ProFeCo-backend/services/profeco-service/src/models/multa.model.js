import mongoose from 'mongoose';

const multaSchema = new mongoose.Schema({
  tienda_id: { type: String, required: true },
  tienda_nombre: { type: String, required: true },
  
  agente_id: { type: String, required: true }, // El usuario PROFECO que multó
  agente_nombre: { type: String },

  monto: { type: Number, required: true }, // Dinero
  motivo: { type: String, required: true }, // Texto legal
  
  cantidad_reportes_asociados: { type: Number, default: 0 }, // Cuántas quejas provocaron esto

  fecha_emision: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model('Multa', multaSchema);