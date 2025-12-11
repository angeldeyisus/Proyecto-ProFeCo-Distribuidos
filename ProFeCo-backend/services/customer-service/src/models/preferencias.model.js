import mongoose from "mongoose";

const preferenciasSchema = new mongoose.Schema({
  usuario_id: {
    type: String,
    required: true
  },
  supermercados_favoritos: [{
    type: String,
  }],
  productos_frecuentes: [{
    type: String, 
  }],
  categorias_interes: [{
    type: String
  }],
  notificaciones_ofertas: {
    type: Boolean,
    default: true
  },
  radio_busqueda: {
    type: Number,
    default: 10
  } // en kilómetros
}, {
  timestamps: true
});

preferenciasSchema.index({ usuario_id: 1 }, { unique: true });

export default mongoose.model("Preferencias", preferenciasSchema);