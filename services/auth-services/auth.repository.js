import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function crearUsuario(email, passwordHash, nombre, tipo){
    try {
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                email: email,
                password_hash: passwordHash,
                nombre: nombre,
                tipo_usuario: tipo,
            },
        });

        return nuevoUsuario;

    } catch (error) {
        console.error("Error al crear al usuario: " + error);
        throw new Error("Error en la base de datos al crear al usuario");
    }
}

export async function encontrarUsuarioPorEmail(email) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });

        return usuario;
        
    } catch (error) {
        console.error("Error al buscar usuario:", error);
        throw new Error("Error en la base de datos al buscar usuario.");
    }
}