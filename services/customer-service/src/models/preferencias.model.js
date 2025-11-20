import mongoose from "mongoose";

const preferenciasSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  supermercados_favoritos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tienda"
  }],
  productos_frecuentes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto"
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