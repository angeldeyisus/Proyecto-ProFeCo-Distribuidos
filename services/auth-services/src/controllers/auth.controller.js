import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {

  async registrar(req, res) {
    try {
      const { email, password, nombre, tipo_usuario, telefono } = req.body;

      if (!email || !password || !nombre || !tipo_usuario) {
        return res.status(400).json({
          error: 'Faltan campos obligatorios: email, password, nombre, tipo_usuario'
        });
      }

      const resultado = await authService.registrarUsuario({
        email,
        password,
        nombre,
        tipo_usuario,
        telefono
      });

      res.status(201).json(resultado);

    } catch (error) {
      console.error('Error en controlador registrar:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email y password son requeridos'
        });
      }

      const resultado = await authService.login(email, password);
      res.json(resultado);

    } catch (error) {
      console.error('Error en controlador login:', error);
      res.status(401).json({ error: error.message });
    }
  }

  async obtenerPerfil(req, res) {
    try {
      const { usuarioId } = req.params;

      if (!usuarioId) {
        return res.status(400).json({ error: 'ID de usuario requerido' });
      }

      const perfil = await authService.obtenerPerfil(usuarioId);
      res.json(perfil);

    } catch (error) {
      console.error('Error en controlador obtenerPerfil:', error);
      res.status(404).json({ error: error.message });
    }
  }
}