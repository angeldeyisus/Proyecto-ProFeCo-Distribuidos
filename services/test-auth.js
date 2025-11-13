import { PrismaClient } from "@prisma/client";
import { crearUsuario, encontrarUsuarioPorEmail } from "./auth.repository.js";
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function runTest() {
    console.log('Iniciando prueba de Auth Service...');
    try {
    // 1. Probar la creación de usuario
    console.log('Probando crearUsuario...');
    const emailPrueba = `test-${Date.now()}@profeco.com`;
    
    const nuevoUsuario = await crearUsuario(
        emailPrueba,
        'contra123',
        'Gonzalo',
        'CONSUMIDOR'
    );
    console.log('✅ Usuario creado:', nuevoUsuario);

    // 2. Probar la búsqueda de usuario
    console.log('Probando encontrarUsuarioPorEmail...');
    const usuarioEncontrado = await encontrarUsuarioPorEmail(emailPrueba);
    console.log('✅ Usuario encontrado:', usuarioEncontrado);

    if (!usuarioEncontrado || usuarioEncontrado.usuario_id !== nuevoUsuario.usuario_id) {
        throw new Error('La búsqueda de usuario falló.');
    }

    console.log('\n🎉 ¡Prueba de Auth Service completada con éxito!');

    } catch (error) {
    console.error('❌ Error durante la prueba:', error);
    } finally {
    // 3. Desconectar de la base de datos
    await prisma.$disconnect();
    console.log('Desconectado de Prisma.');
    }
}

runTest();