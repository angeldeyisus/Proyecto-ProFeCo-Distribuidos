import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    asunto: {
        type: String,
        required: true
    },
    contenido_html: {
        type: String,
        required: true
    },
    contenido_texto: {
        type: String
    },
    variables: [String], // ['usuario_nombre', 'producto_nombre', 'precio_nuevo']
    categoria: {
        type: String,
        enum: ['oferta', 'wishlist', 'bienvenida', 'general']
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
}, {
    timestamps: true
});

export default mongoose.model("EmailTemplate", emailTemplateSchema);