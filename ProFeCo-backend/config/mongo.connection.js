import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './variables.env' });

const config = {
    url: process.env.MONGODB_URI,
    options: {}
}

export async function conectar(){
    const url = process.env.MONGODB_URI;

    if (!url) {
        throw new Error("FATAL: La variable de entorno MONGO_URI no está definida.");
    }
    try {
        await mongoose.connect(url);
        console.log('🍃 Conectado a MongoDB (Inventario)');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error; // Re-lanzamos para que quien llame sepa que falló
    }
    
}

export async function desconectar(){
    await mongoose.disconnect();
    console.log('🍃 Desconectado de MongoDB');
}
