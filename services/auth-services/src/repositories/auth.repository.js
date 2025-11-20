import { PrismaClient } from './../../../prisma/client/index.js';

const prisma = new PrismaClient();

export class AuthRepository {

  async encontrarUsuarioPorEmail(email) {
    try {
      console.log('🔍 [POSTGRESQL] Buscando usuario por email:', email);
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });
      console.log('🔍 [POSTGRESQL] Resultado:', usuario ? 'ENCONTRADO' : 'NO ENCONTRADO');
      return usuario;
    } catch (error) {
      console.error('❌ [POSTGRESQL ERROR] Buscar usuario:', error);
      throw new Error(`Error buscando usuario: ${error.message}`);
    }
  }

  async crearUsuario(usuarioData) {
    try {
      console.log('📝 [POSTGRESQL] Creando usuario con datos:', {
        email: usuarioData.email,
        nombre: usuarioData.nombre,
        tipo_usuario: usuarioData.tipo_usuario
      });
      
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          email: usuarioData.email,
          password_hash: usuarioData.password_hash,
          nombre: usuarioData.nombre,
          tipo_usuario: usuarioData.tipo_usuario,
        }
      });
      
      console.log('✅ [POSTGRESQL] Usuario creado exitosamente:', nuevoUsuario.usuario_id);
      return nuevoUsuario;
      
    } catch (error) {
      console.error('❌ [POSTGRESQL ERROR] Crear usuario:', error);

      if (error.code === 'P2002') {
        throw new Error('El email ya está registrado en el sistema');
      }
      throw new Error(`Error creando usuario: ${error.message}`);
    }
  }

  async encontrarUsuarioPorId(usuarioId) {
    try {
      console.log('🔍 [POSTGRESQL] Buscando usuario por ID:', usuarioId);
      const usuario = await prisma.usuario.findUnique({
        where: { usuario_id: usuarioId }
      });
      return usuario;
    } catch (error) {
      console.error('❌ [POSTGRESQL ERROR] Buscar por ID:', error);
      throw new Error(`Error buscando usuario: ${error.message}`);
    }
  }

  async listarTodosLosUsuarios() {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          usuario_id: true,
          email: true,
          nombre: true,
          tipo_usuario: true,
          estado: true,
          created_at: true,
          updated_at: true
        },
        orderBy: { created_at: 'desc' }
      });
      console.log('📊 [POSTGRESQL] Total usuarios en DB:', usuarios.length);
      return usuarios;
    } catch (error) {
      console.error('❌ [POSTGRESQL ERROR] Listar usuarios:', error);
      throw new Error(`Error listando usuarios: ${error.message}`);
    }
  }

  async verificarConexion() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ [POSTGRESQL] Conexión verificada correctamente');
      return true;
    } catch (error) {
      console.error('❌ [POSTGRESQL ERROR] Verificar conexión:', error);
      return false;
    }
  }

  async obtenerEstadisticas() {
    try {
      const totalUsuarios = await prisma.usuario.count();
      const usuariosActivos = await prisma.usuario.count({
        where: { estado: 'ACTIVO' }
      });
      
      return {
        total_usuarios: totalUsuarios,
        usuarios_activos: usuariosActivos,
        database: 'PostgreSQL'
      };
    } catch (error) {
      console.error('❌ [POSTGRESQL ERROR] Obtener estadísticas:', error);
      throw new Error(`Error obteniendo estadísticas: ${error.message}`);
    }
  }
}