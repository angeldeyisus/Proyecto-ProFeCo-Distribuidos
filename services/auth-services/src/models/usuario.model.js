import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['consumidor', 'tienda', 'profeco'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    ubicacion: {
        latitud: { type: Number },
        longitud: { type: Number },
        direccion: { type: String }
    },
    avatar: { type: String },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'suspendido'],
        default: 'activo'
    }
}, {
    timestamps: true
});

usuarioSchema.index({ email: 1 });
usuarioSchema.index({ tipo: 1 });

export default mongoose.model("Usuario", usuarioSchema);