import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {

  async registrar(req, res) {
    try {
      console.log('📨 [CONTROLLER] Solicitud de registro recibida');
      
      const { email, password, nombre, tipo_usuario, telefono } = req.body;

      if (!email || !password || !nombre || !tipo_usuario) {
        return res.status(400).json({
          error: 'Faltan campos obligatorios: email, password, nombre, tipo_usuario',
          campos_recibidos: { email, nombre, tipo_usuario }
        });
      }

      console.log('📝 [CONTROLLER] Datos recibidos:', { email, nombre, tipo_usuario });

      const resultado = await authService.registrarUsuario({
        email,
        password,
        nombre,
        tipo_usuario,
        telefono
      });

      res.status(201).json(resultado);

    } catch (error) {
      console.error('❌ [CONTROLLER ERROR] Registrar:', error.message);
      res.status(400).json({ 
        error: error.message,
        tipo: 'Error en registro'
      });
    }
  }

  async login(req, res) {
    try {
      console.log('📨 [CONTROLLER] Solicitud de login recibida');
      
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email y password son requeridos',
          campos_recibidos: { email: !!email, password: !!password }
        });
      }

      console.log('🔐 [CONTROLLER] Intento de login para:', email);

      const resultado = await authService.login(email, password);
      res.json(resultado);

    } catch (error) {
      console.error('❌ [CONTROLLER ERROR] Login:', error.message);
      res.status(401).json({ 
        error: error.message,
        tipo: 'Error en login'
      });
    }
  }

  async obtenerPerfil(req, res) {
    try {
      const { usuarioId } = req.params;

      if (!usuarioId) {
        return res.status(400).json({ error: 'ID de usuario requerido' });
      }

      console.log('👤 [CONTROLLER] Obteniendo perfil para:', usuarioId);

      const perfil = await authService.obtenerPerfil(usuarioId);
      res.json(perfil);

    } catch (error) {
      console.error('❌ [CONTROLLER ERROR] Obtener perfil:', error.message);
      res.status(404).json({ 
        error: error.message,
        tipo: 'Error obteniendo perfil'
      });
    }
  }

  async listarUsuarios(req, res) {
    try {
      console.log('📊 [CONTROLLER] Listando todos los usuarios');
      
      const usuarios = await authService.obtenerTodosLosUsuarios();
      res.json({
        total: usuarios.length,
        usuarios: usuarios,
        database: 'PostgreSQL'
      });

    } catch (error) {
      console.error('❌ [CONTROLLER ERROR] Listar usuarios:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async healthCheck(req, res) {
    try {
      const dbStatus = await authService.verificarConexionBaseDatos();
      
      res.json({
        status: 'OK',
        service: 'auth-service',
        database: dbStatus ? 'CONECTADO' : 'ERROR',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });

    } catch (error) {
      res.status(500).json({
        status: 'ERROR',
        service: 'auth-service',
        database: 'ERROR',
        error: error.message
      });
    }
  }
}