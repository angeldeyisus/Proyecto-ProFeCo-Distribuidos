import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthRepository {

  async encontrarUsuarioPorEmail(email) {
    try {
      return await prisma.usuario.findUnique({
        where: { email }
      });
    } catch (error) {
      throw new Error(`Error buscando usuario por email: ${error.message}`);
    }
  }

  async encontrarUsuarioPorId(usuarioId) {
    try {
      return await prisma.usuario.findUnique({
        where: { usuario_id: usuarioId }
      });
    } catch (error) {
      throw new Error(`Error buscando usuario por ID: ${error.message}`);
    }
  }

  async crearUsuario(usuarioData) {
    try {
      return await prisma.usuario.create({
        data: {
          email: usuarioData.email,
          password_hash: usuarioData.password_hash, // Sin hash por ahora
          nombre: usuarioData.nombre,
          tipo_usuario: usuarioData.tipo_usuario,
          telefono: usuarioData.telefono || null,
          estado: 'ACTIVO'
        }
      });
    } catch (error) {
      throw new Error(`Error creando usuario: ${error.message}`);
    }
  }

  async actualizarUsuario(usuarioId, datosActualizados) {
    try {
      return await prisma.usuario.update({
        where: { usuario_id: usuarioId },
        data: datosActualizados
      });
    } catch (error) {
      throw new Error(`Error actualizando usuario: ${error.message}`);
    }
  }

  async desconectar() {
    await prisma.$disconnect();
  }
}