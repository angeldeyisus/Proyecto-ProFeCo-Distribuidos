import { AuthRepository } from '../repositories/auth.repository.js';

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async registrarUsuario(datosUsuario) {
    try {
      const usuarioExistente = await this.authRepository.encontrarUsuarioPorEmail(datosUsuario.email);
      if (usuarioExistente) {
        throw new Error(`El email ${datosUsuario.email} ya está registrado`);
      }

      if (datosUsuario.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      const tiposValidos = ['CONSUMIDOR', 'TIENDA', 'PROFECO'];
      if (!tiposValidos.includes(datosUsuario.tipo_usuario)) {
        throw new Error('Tipo de usuario no válido');
      }

      const nuevoUsuario = await this.authRepository.crearUsuario({
        email: datosUsuario.email,
        password_hash: datosUsuario.password, 
        nombre: datosUsuario.nombre,
        tipo_usuario: datosUsuario.tipo_usuario,
        telefono: datosUsuario.telefono
      });

      const { password_hash, ...usuarioSeguro } = nuevoUsuario;
      return {
        mensaje: 'Usuario registrado exitosamente',
        usuario: usuarioSeguro
      };

    } catch (error) {
      console.error('Error en AuthService.registrarUsuario:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const usuario = await this.authRepository.encontrarUsuarioPorEmail(email);
      if (!usuario) {
        throw new Error('Credenciales incorrectas');
      }

      if (usuario.password_hash !== password) {
        throw new Error('Credenciales incorrectas');
      }

      if (usuario.estado !== 'ACTIVO') {
        throw new Error('Tu cuenta está suspendida o inactiva');
      }

      const { password_hash, ...usuarioSeguro } = usuario;
      return {
        mensaje: 'Login exitoso',
        usuario: usuarioSeguro
      };

    } catch (error) {
      console.error('Error en AuthService.login:', error);
      throw error;
    }
  }

  async obtenerPerfil(usuarioId) {
    try {
      const usuario = await this.authRepository.encontrarUsuarioPorId(usuarioId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      const { password_hash, ...usuarioSeguro } = usuario;
      return usuarioSeguro;

    } catch (error) {
      console.error('Error en AuthService.obtenerPerfil:', error);
      throw error;
    }
  }
}