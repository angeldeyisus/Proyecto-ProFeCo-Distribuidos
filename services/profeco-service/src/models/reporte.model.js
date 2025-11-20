import mongoose from "mongoose";

const reporteSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  tienda_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tienda",
    required: true
  },
  producto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true
  },
  tipo: {
    type: String,
    enum: ['inconsistencia_precio', 'producto_no_disponible', 'publicidad_engañosa', 'otros'],
    required: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  evidencia_url: {
    type: String // URL de la foto del ticket
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_revision', 'resuelto', 'rechazado'],
    default: 'pendiente'
  },
  fecha_resolucion: {
    type: Date
  },
  respuesta_profeco: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

reporteSchema.index({ usuario_id: 1 });
reporteSchema.index({ tienda_id: 1 });
reporteSchema.index({ estado: 1 });
reporteSchema.index({ createdAt: 1 });

export default mongoose.model("Reporte", reporteSchema);