import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  nombre: {
    type: String,
    default: "Mi lista de deseos"
  },
  productos: [{
    producto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true
    },
    fecha_agregado: {
      type: Date,
      default: Date.now
    },
    prioridad: {
      type: String,
      enum: ['baja', 'media', 'alta'],
      default: 'media'
    }
  }],
  es_publica: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

wishlistSchema.index({ usuario_id: 1 });
wishlistSchema.index({ "productos.producto_id": 1 });

export default mongoose.model("Wishlist", wishlistSchema);