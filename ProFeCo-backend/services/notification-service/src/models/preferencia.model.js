import mongoose from 'mongoose';

const preferenciaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true, unique: true },
  email: { type: String, required: true }, // Esto es lo que necesitamos para enviar el correo
  
  wishlist: [{ 
    type: String // Guardamos los IDs de los productos
  }],

  tiendas_favoritas: [{ 
    type: String 
  }]
}, {
  timestamps: true,
  collection: 'preferencias' // ⚠️ IMPORTANTE: Esto conecta con los datos reales creados por el otro servicio
});

// Usamos esta comprobación para evitar errores si el modelo intenta compilarse dos veces
const Preferencia = mongoose.models.Preferencia || mongoose.model('Preferencia', preferenciaSchema);

export default Preferencia;