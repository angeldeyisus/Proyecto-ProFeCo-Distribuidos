import mongoose from 'mongoose';

const preferenciaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true, unique: true },
  
  // Lista de IDs de productos que el usuario quiere comprar
  wishlist: [{ 
    type: String, // Guardamos el _id del producto
    ref: 'Producto' 
  }],

  // Lista de IDs de tiendas favoritas
  tiendas_favoritas: [{ 
    type: String // Guardamos el tienda_id
  }]
}, {
  timestamps: true
});

export default mongoose.model('Preferencia', preferenciaSchema);