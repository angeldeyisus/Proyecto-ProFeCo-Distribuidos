import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

class AuthController {

  async register(req, res) {
    try {
      const { email, password, nombre, tipo_usuario = 'CONSUMIDOR' } = req.body;

      if (!email || !password || !nombre) {
        return res.status(400).json({
          success: false,
          message: 'Email, password y nombre son requeridos'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres'
        });
      }

      const existingUser = await prisma.usuario.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'El usuario ya existe'
        });
      }

      const password_hash = await bcrypt.hash(password, 12);

      const usuario = await prisma.usuario.create({
        data: {
          email,
          password_hash,
          nombre,
          tipo_usuario
        },
        select: {
          usuario_id: true,
          email: true,
          nombre: true,
          tipo_usuario: true,
          is_verified: true,
          created_at: true
        }
      });

      if (tipo_usuario === 'TIENDA') {
        await prisma.tienda.create({
          data: {
            usuario_id: usuario.usuario_id,
            nombre: `${nombre} - Tienda`,
            direccion: 'Por definir'
          }
        });
      }

      const token = generateToken({
        usuario_id: usuario.usuario_id,
        email: usuario.email,
        nombre: usuario.nombre,
        tipo_usuario: usuario.tipo_usuario
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          usuario,
          token
        }
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error en el registro: ' + error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email y password son requeridos'
        });
      }

      const usuario = await prisma.usuario.findUnique({
        where: { 
          email,
          is_active: true 
        },
        include: {
          tienda: {
            select: {
              tienda_id: true,
              nombre: true
            }
          }
        }
      });

      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const isValidPassword = await bcrypt.compare(password, usuario.password_hash);
      
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      await prisma.usuario.update({
        where: { usuario_id: usuario.usuario_id },
        data: { last_login: new Date() }
      });

      const token = generateToken({
        usuario_id: usuario.usuario_id,
        email: usuario.email,
        nombre: usuario.nombre,
        tipo_usuario: usuario.tipo_usuario,
        tienda_id: usuario.tienda?.tienda_id
      });

      const userResponse = {
        usuario_id: usuario.usuario_id,
        email: usuario.email,
        nombre: usuario.nombre,
        tipo_usuario: usuario.tipo_usuario,
        is_verified: usuario.is_verified,
        tienda: usuario.tienda
      };

      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          usuario: userResponse,
          token
        }
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error en el login: ' + error.message
      });
    }
  }

  async verifyToken(req, res) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { 
          usuario_id: req.user.usuario_id,
          is_active: true 
        },
        select: {
          usuario_id: true,
          email: true,
          nombre: true,
          tipo_usuario: true,
          is_verified: true,
          last_login: true,
          tienda: {
            select: {
              tienda_id: true,
              nombre: true,
              direccion: true
            }
          }
        }
      });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.json({
        success: true,
        data: { usuario }
      });

    } catch (error) {
      console.error('Error verificando token:', error);
      res.status(500).json({
        success: false,
        message: 'Error verificando token: ' + error.message
      });
    }
  }

  async getProfile(req, res) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { 
          usuario_id: req.user.usuario_id,
          is_active: true 
        },
        include: {
          perfil: true,
          tienda: {
            select: {
              tienda_id: true,
              nombre: true,
              direccion: true,
              latitud: true,
              longitud: true,
              logo_url: true,
              horario: true,
              telefono: true
            }
          }
        }
      });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const { password_hash, ...userWithoutPassword } = usuario;

      res.json({
        success: true,
        data: { usuario: userWithoutPassword }
      });

    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error obteniendo perfil: ' + error.message
      });
    }
  }

  async logout(req, res) {
    try {
      res.json({
        success: true,
        message: 'Logout exitoso'
      });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({
        success: false,
        message: 'Error en logout: ' + error.message
      });
    }
  }
}

export default AuthController;