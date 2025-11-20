import mongoose from "mongoose";

const tiendaSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['supermercado', 'mercado_popular', 'mercado_sobre_ruedas'],
    required: true
  },
  direccion: {
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    estado: { type: String, required: true },
    codigo_postal: { type: String },
    coordenadas: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  telefono: {
    type: String,
    trim: true
  },
  horario: {
    apertura: { type: String },
    cierre: { type: String },
    dias: [{ type: String }]
  },
  calificacion_promedio: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  total_calificaciones: {
    type: Number,
    default: 0
  },
  imagen_url: { type: String },
  estado: {
    type: String,
    enum: ['activa', 'inactiva', 'suspendida'],
    default: 'activa'
  }
}, {
  timestamps: true
});

tiendaSchema.index({ "direccion.coordenadas": "2dsphere" });
tiendaSchema.index({ tipo: 1 });
tiendaSchema.index({ "direccion.ciudad": 1 });

export default mongoose.model("Tienda", tiendaSchema);