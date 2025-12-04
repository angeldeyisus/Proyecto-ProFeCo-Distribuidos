// services/auth-services/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt.js'; // ✅ Usar JWT real
import { PrismaClient } from '../../../prisma/client/default.js';

const prisma = new PrismaClient();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check (igual)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      success: true,
      status: 'OK ✅', 
      service: 'Auth Service',
      database: 'PostgreSQL Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error de conexión a BD:', error);
    res.status(500).json({
      success: false,
      status: 'ERROR ❌',
      service: 'Auth Service', 
      database: 'Disconnected',
      error: error.message
    });
  }
});

// REGISTRO MEJORADO con bcrypt
app.post('/api/auth/register', async (req, res) => {
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

    // ✅ BCRYPT REAL
    const password_hash = await bcrypt.hash(password, 12);

    const usuario = await prisma.usuario.create({
      data: {
        email,
        password_hash, // ✅ Hash real
        nombre,
        tipo_usuario
      },
      select: {
        usuario_id: true,
        email: true,
        nombre: true,
        tipo_usuario: true,
        created_at: true
      }
    });

    // ✅ JWT REAL
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
        token // ✅ Token real
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el registro: ' + error.message
    });
  }
});

// LOGIN MEJORADO con bcrypt y JWT real
app.post('/api/auth/login', async (req, res) => {
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
      }
    });

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // ✅ BCRYPT REAL para comparar
    const isValidPassword = await bcrypt.compare(password, usuario.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar last_login
    await prisma.usuario.update({
      where: { usuario_id: usuario.usuario_id },
      data: { last_login: new Date() }
    });

    // ✅ JWT REAL
    const token = generateToken({
      usuario_id: usuario.usuario_id,
      email: usuario.email,
      nombre: usuario.nombre,
      tipo_usuario: usuario.tipo_usuario
    });

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        usuario: {
          usuario_id: usuario.usuario_id,
          email: usuario.email,
          nombre: usuario.nombre,
          tipo_usuario: usuario.tipo_usuario,
          is_verified: usuario.is_verified
        },
        token // ✅ Token real
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el login: ' + error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🔐 Auth Service MEJORADO en puerto ${PORT}`);
  console.log(`✅ JWT y BCRYPT implementados correctamente`);
});