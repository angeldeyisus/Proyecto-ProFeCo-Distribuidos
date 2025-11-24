import mongoose from "mongoose";

const perfilUsuarioSchema = new mongoose.Schema({
    usuario_id: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        trim: true
    },
    direccion: {
        calle: String,
        numero_exterior: String,
        numero_interior: String,
        colonia: String,
        municipio: String,
        estado: String,
        codigo_postal: String,
        coordenadas: {
            latitud: Number,
            longitud: Number
        }
    },
    fecha_nacimiento: {
        type: Date
    },
    avatar_url: {
        type: String
    },
    genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro', 'prefiero_no_decir'],
        default: 'prefiero_no_decir'
    },
    metadata: {
        total_listas_compra: { type: Number, default: 0 },
        total_productos_wishlist: { type: Number, default: 0 },
        ultima_actualizacion_perfil: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

perfilUsuarioSchema.index({ usuario_id: 1 });
perfilUsuarioSchema.index({ "direccion.estado": 1 });
perfilUsuarioSchema.index({ "direccion.municipio": 1 });

perfilUsuarioSchema.pre('save', function(next) {
    this.metadata.ultima_actualizacion_perfil = new Date();
    next();
});

export default mongoose.model("PerfilUsuario", perfilUsuarioSchema);