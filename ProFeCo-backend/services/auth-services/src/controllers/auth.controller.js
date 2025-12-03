import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthController {
    
    // --- 1. REGISTRO ---
    async registrar(req, res) {
        try {
            const { email, password, nombre, tipo_usuario = 'CONSUMIDOR' } = req.body;

            if (!email || !password || !nombre) {
                return res.status(400).json({ success: false, message: 'Email, password y nombre son requeridos' });
            }

            if (password.length < 6) {
                return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
            }

            const existingUser = await prisma.usuario.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'El usuario ya existe' });
            }

            const password_hash = await bcrypt.hash(password, 12);

            const usuario = await prisma.usuario.create({
                data: { email, password_hash, nombre, tipo_usuario },
                select: { usuario_id: true, email: true, nombre: true, tipo_usuario: true, created_at: true }
            });

            const token = generateToken({
                usuario_id: usuario.usuario_id, email: usuario.email, nombre: usuario.nombre, tipo_usuario: usuario.tipo_usuario
            });

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: { usuario, token }
            });

        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ success: false, message: 'Error en el registro: ' + error.message });
        }
    }

    // --- 2. LOGIN ---
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email y password son requeridos' });
            }

            const usuario = await prisma.usuario.findUnique({
                where: { email } 
            });

            if (!usuario) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            const isValidPassword = await bcrypt.compare(password, usuario.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            try {
                await prisma.usuario.update({
                    where: { usuario_id: usuario.usuario_id },
                    data: { last_login: new Date() }
                });
            } catch (e) { console.log("Advertencia: No se pudo actualizar last_login"); }

            const token = generateToken({
                usuario_id: usuario.usuario_id, email: usuario.email, nombre: usuario.nombre, tipo_usuario: usuario.tipo_usuario
            });

            res.json({
                success: true,
                message: 'Login exitoso',
                data: {
                    usuario: {
                        usuario_id: usuario.usuario_id, email: usuario.email, nombre: usuario.nombre, tipo_usuario: usuario.tipo_usuario
                    },
                    token
                }
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ success: false, message: 'Error en el login: ' + error.message });
        }
    }

    // --- 3. VERIFICAR TOKEN (Para Frontend) ---
    async verifyToken(req, res) {
        // El middleware 'authenticateToken' ya validó el token y puso los datos en req.user
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Token no proporcionado o inválido' });
        }
        
        res.status(200).json({
            success: true,
            message: 'Token válido',
            user: req.user
        });
    }

    // --- 4. OBTENER PERFIL (getProfile) ---
    async getProfile(req, res) {
        try {
            // req.user viene del middleware authenticateToken
            const userId = req.user?.usuario_id; 

            if (!userId) {
                return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
            }

            // Buscamos datos frescos en la BD (excluyendo password)
            const userProfile = await prisma.usuario.findUnique({
                where: { usuario_id: userId },
                select: {
                    usuario_id: true,
                    nombre: true,
                    email: true,
                    tipo_usuario: true,
                    created_at: true,
                    last_login: true
                    // Agrega aquí otros campos si los tienes (direccion, telefono, etc)
                }
            });

            if (!userProfile) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            res.json({
                success: true,
                data: userProfile
            });

        } catch (error) {
            console.error('Error al obtener perfil:', error);
            res.status(500).json({ success: false, message: 'Error del servidor al obtener perfil' });
        }
    }

    // --- 5. LOGOUT ---
    async logout(req, res) {
        // Como usamos JWT (Stateless), el servidor no necesita borrar nada.
        // El cliente (Frontend) es quien debe borrar el token de su almacenamiento.
        // Aquí solo confirmamos que la petición llegó bien.
        res.status(200).json({
            success: true,
            message: 'Logout exitoso (El cliente debe eliminar el token)'
        });
    }
}