import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true },
  usuario_nombre: { type: String },
  
  tienda_id: { type: String, required: true },
  tienda_nombre: { type: String, required: true },
  
  producto_id: { type: String, required: true },
  producto_nombre: { type: String, required: true },
  
  precio_publicado: { type: Number, required: true },
  
  motivo: { type: String, required: true },
  comentarios: { type: String },
  
  estado: { 
    type: String, 
    default: 'PENDIENTE' // Asegúrate que coincida con como se guarda
  }
}, {
  timestamps: true,
  collection: 'reportes' // <--- ESTO ES CLAVE: Fuerza a usar tu colección existente
});

// Si el modelo ya existe, lo usamos, si no, lo creamos
const Reporte = mongoose.models.Reporte || mongoose.model('Reporte', reporteSchema);

export default Reporte;