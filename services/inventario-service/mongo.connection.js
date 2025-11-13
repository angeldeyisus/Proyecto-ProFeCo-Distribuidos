import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export async function conectar(){
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a mongoDB (Servicio de Inventario)')
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}