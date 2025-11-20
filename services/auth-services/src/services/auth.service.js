import { AuthRepository } from '../repositories/auth.repository.js';

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    this.verificarConexionDB();
  }

  async verificarConexionDB() {
    try {
      const conexionActiva = await this.authRepository.verificarConexion();
      if (conexionActiva) {
        console.log('✅ [AUTH SERVICE] Conectado a PostgreSQL correctamente');
      } else {
        console.log('❌ [AUTH SERVICE] Error conectando a PostgreSQL');
      }
      return conexionActiva;
    } catch (error) {
      console.error('❌ [AUTH SERVICE] Error verificando conexión DB:', error);
      return false;
    }
  }

  async registrarUsuario(datosUsuario) {
    try {
      console.log('🚀 [AUTH SERVICE] Iniciando registro de usuario...');

      if (!datosUsuario.email || !datosUsuario.password || !datosUsuario.nombre || !datosUsuario.tipo_usuario) {
        throw new Error('Faltan campos obligatorios: email, password, nombre, tipo_usuario');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(datosUsuario.email)) {
        throw new Error('El formato del email no es válido');
      }

      if (datosUsuario.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      const tiposValidos = ['CONSUMIDOR', 'TIENDA', 'PROFECO'];
      if (!tiposValidos.includes(datosUsuario.tipo_usuario)) {
        throw new Error('Tipo de usuario no válido. Debe ser: CONSUMIDOR, TIENDA o PROFECO');
      }

      console.log('🔍 [AUTH SERVICE] Verificando email único...');
      const usuarioExistente = await this.authRepository.encontrarUsuarioPorEmail(datosUsuario.email);
      if (usuarioExistente) {
        throw new Error(`El email ${datosUsuario.email} ya está registrado en el sistema`);
      }

      console.log('📝 [AUTH SERVICE] Creando usuario en PostgreSQL...');
      const nuevoUsuario = await this.authRepository.crearUsuario({
        email: datosUsuario.email,
        password_hash: datosUsuario.password, 
        nombre: datosUsuario.nombre,
        tipo_usuario: datosUsuario.tipo_usuario,
        telefono: datosUsuario.telefono || null
      });

      console.log('✅ [AUTH SERVICE] Usuario registrado exitosamente en PostgreSQL');

      const { password_hash, ...usuarioSeguro } = nuevoUsuario;
      return {
        mensaje: 'Usuario registrado exitosamente en el sistema',
        usuario: usuarioSeguro,
        database: 'PostgreSQL'
      };

    } catch (error) {
      console.error('❌ [AUTH SERVICE ERROR] Registrar usuario:', error.message);
      throw error; 
    }
  }

  async login(email, password) {
    try {
      console.log('🔐 [AUTH SERVICE] Iniciando proceso de login...');

      if (!email || !password) {
        throw new Error('Email y password son requeridos');
      }

      console.log('🔍 [AUTH SERVICE] Buscando usuario en PostgreSQL...');
      const usuario = await this.authRepository.encontrarUsuarioPorEmail(email);
      if (!usuario) {
        throw new Error('Credenciales incorrectas');
      }

      console.log('🔑 [AUTH SERVICE] Verificando contraseña...');
      if (usuario.password_hash !== password) {
        throw new Error('Credenciales incorrectas');
      }

      if (usuario.estado !== 'ACTIVO') {
        throw new Error('Tu cuenta está suspendida o inactiva');
      }

      console.log('✅ [AUTH SERVICE] Login exitoso');

      const { password_hash, ...usuarioSeguro } = usuario;
      return {
        mensaje: 'Login exitoso',
        usuario: usuarioSeguro,
        database: 'PostgreSQL'
      };

    } catch (error) {
      console.error('❌ [AUTH SERVICE ERROR] Login:', error.message);
      throw error;
    }
  }

  async obtenerPerfil(usuarioId) {
    try {
      console.log('👤 [AUTH SERVICE] Obteniendo perfil para:', usuarioId);
      
      const usuario = await this.authRepository.encontrarUsuarioPorId(usuarioId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      const { password_hash, ...usuarioSeguro } = usuario;
      return usuarioSeguro;

    } catch (error) {
      console.error('❌ [AUTH SERVICE ERROR] Obtener perfil:', error.message);
      throw error;
    }
  }

  async obtenerTodosLosUsuarios() {
    try {
      return await this.authRepository.listarTodosLosUsuarios();
    } catch (error) {
      console.error('❌ [AUTH SERVICE ERROR] Listar usuarios:', error.message);
      throw error;
    }
  }

  async verificarConexionBaseDatos() {
    return await this.authRepository.verificarConexion();
  }
}