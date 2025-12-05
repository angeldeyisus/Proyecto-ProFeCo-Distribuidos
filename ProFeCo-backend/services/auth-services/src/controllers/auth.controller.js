// auth-services/src/controllers/AuthController.js
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../../utils/jwt.js'; // Ajusta la ruta según tu estructura
import { PrismaClient } from '@prisma/client';
import eventDispatcher from '../services/eventDispatcher.service.js'; // Ruta ajustada
import crypto from 'crypto';

const prisma = new PrismaClient();

export class AuthController {

    // --- 1. REGISTRO (modificado) ---
    async registrar(req, res) {
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

            const existingUser = await prisma.usuario.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'El usuario ya existe'
                });
            }

            const password_hash = await bcrypt.hash(password, 12);

            let usuarioCreado;
            let tiendaCreada = null;

            try {
                // Crear usuario
                usuarioCreado = await prisma.usuario.create({
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
                        created_at: true
                    }
                });

                // Si es TIENDA, crear tienda
                if (tipo_usuario === 'TIENDA') {
                    tiendaCreada = await prisma.tienda.create({
                        data: {
                            usuario_id: usuarioCreado.usuario_id,
                            nombre: nombre,
                            is_activa: true
                        }
                    });
                }

            } catch (dbError) {
                console.error('Error en transacción:', dbError);
                throw new Error('Error al crear el usuario en la base de datos');
            }

            const token = generateToken({
                usuario_id: usuarioCreado.usuario_id,
                email: usuarioCreado.email,
                nombre: usuarioCreado.nombre,
                tipo_usuario: usuarioCreado.tipo_usuario
            });

            // 🔥 ENVIAR EVENTO DE REGISTRO A NOTIFICATION-SERVICE
            try {
                eventDispatcher.usuarioRegistrado({
                    usuario_id: usuarioCreado.usuario_id,
                    email: usuarioCreado.email,
                    nombre: usuarioCreado.nombre,
                    tipo_usuario: usuarioCreado.tipo_usuario,
                    tienda_nombre: tiendaCreada?.nombre || null,
                    tienda_id: tiendaCreada?.tienda_id || null
                }).then(result => {
                    if (result.success) {
                        console.log('✅ Evento procesado exitosamente');
                    } else {
                        console.log('ℹ️  Evento no pudo ser enviado (normal en desarrollo)');
                    }
                });
            } catch (eventError) {
                console.error('⚠️ Error enviando evento de registro:', eventError.message);
                // NO fallar el registro si falla el evento
            }

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: {
                    usuario: usuarioCreado,
                    tienda: tiendaCreada,
                    token
                }
            });

        } catch (error) {
            console.error('❌ Error en registro:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el registro: ' + error.message
            });
        }
    }

    // --- 2. LOGIN (modificado) ---
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
                where: { email }
            });

            if (!usuario) {
                // 🔥 EVENTO DE LOGIN FALLIDO
                await eventDispatcher.loginFallido(email, req.ip || 'desconocida', 1);

                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            const isValidPassword = await bcrypt.compare(password, usuario.password_hash);
            if (!isValidPassword) {
                // 🔥 EVENTO DE LOGIN FALLIDO
                await eventDispatcher.loginFallido(email, req.ip || 'desconocida', 1);

                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            // Verificar si es un nuevo dispositivo
            const userAgent = req.headers['user-agent'] || 'Desconocido';
            const ipAddress = req.ip || req.connection.remoteAddress || 'desconocida';
            const esNuevoDispositivo = await this.esNuevoDispositivo(usuario.usuario_id, userAgent);

            // Actualizar último login
            await prisma.usuario.update({
                where: { usuario_id: usuario.usuario_id },
                data: { last_login: new Date() }
            }).catch(e => console.log("⚠️ No se pudo actualizar last_login"));

            const token = generateToken({
                usuario_id: usuario.usuario_id,
                email: usuario.email,
                nombre: usuario.nombre,
                tipo_usuario: usuario.tipo_usuario
            });

            // 🔥 EVENTO DE LOGIN EXITOSO (solo si es nuevo dispositivo)
            if (esNuevoDispositivo) {
                await eventDispatcher.loginExitoso({
                    usuario_id: usuario.usuario_id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    tipo_usuario: usuario.tipo_usuario
                }, {
                    userAgent,
                    ip: ipAddress,
                    isNewDevice: true
                });
            }

            res.json({
                success: true,
                message: 'Login exitoso',
                data: {
                    usuario: {
                        usuario_id: usuario.usuario_id,
                        email: usuario.email,
                        nombre: usuario.nombre,
                        tipo_usuario: usuario.tipo_usuario
                    },
                    token,
                    es_nuevo_dispositivo: esNuevoDispositivo
                }
            });

        } catch (error) {
            console.error('❌ Error en login:', error);
            res.status(500).json({
                success: false,
                message: 'Error en el login: ' + error.message
            });
        }
    }

    // --- 3. VERIFICAR TOKEN ---
    async verifyToken(req, res) {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado o inválido'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Token válido',
            user: req.user
        });
    }

    // --- 4. OBTENER PERFIL ---
    async getProfile(req, res) {
        try {
            const userId = req.user?.usuario_id;
            if (!userId) return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });

            const userProfile = await prisma.usuario.findUnique({
                where: { usuario_id: userId },
                select: {
                    usuario_id: true,
                    nombre: true,
                    email: true,
                    tipo_usuario: true,
                    created_at: true,
                    last_login: true
                }
            });

            if (!userProfile) return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });

            res.json({
                success: true,
                data: userProfile
            });

        } catch (error) {
            console.error('❌ Error al obtener perfil:', error);
            res.status(500).json({
                success: false,
                message: 'Error del servidor al obtener perfil'
            });
        }
    }

    // --- 5. LOGOUT ---
    async logout(req, res) {
        res.status(200).json({
            success: true,
            message: 'Logout exitoso'
        });
    }

    // --- 6. RECUPERACIÓN DE CONTRASEÑA ---
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            const usuario = await prisma.usuario.findUnique({
                where: { email },
                select: {
                    usuario_id: true,
                    email: true,
                    nombre: true
                }
            });

            if (usuario) {
                // Generar token seguro
                const resetToken = crypto.randomBytes(32).toString('hex');
                const resetExpires = new Date(Date.now() + 3600000); // 1 hora

                await prisma.usuario.update({
                    where: { usuario_id: usuario.usuario_id },
                    data: {
                        reset_password_token: resetToken,
                        reset_password_expires: resetExpires
                    }
                });

                // 🔥 ENVIAR EVENTO DE RECUPERACIÓN
                await eventDispatcher.solicitudRecuperacionPassword(
                    usuario,
                    resetToken,
                    req.ip || 'desconocida'
                );

                console.log('✅ Evento de recuperación enviado');
            }

            // Por seguridad, siempre devolver éxito
            res.json({
                success: true,
                message: 'Si el email existe, recibirá instrucciones en unos minutos'
            });

        } catch (error) {
            console.error('❌ Error en forgotPassword:', error);
            res.status(500).json({
                success: false,
                message: 'Error en la solicitud: ' + error.message
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            if (!token || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Token y nueva contraseña son requeridos'
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'La nueva contraseña debe tener al menos 6 caracteres'
                });
            }

            // Buscar usuario con token válido
            const usuario = await prisma.usuario.findFirst({
                where: {
                    reset_password_token: token,
                    reset_password_expires: { gt: new Date() }
                }
            });

            if (!usuario) {
                return res.status(400).json({
                    success: false,
                    message: 'Token inválido o expirado'
                });
            }

            // Hashear nueva contraseña
            const password_hash = await bcrypt.hash(newPassword, 12);

            await prisma.usuario.update({
                where: { usuario_id: usuario.usuario_id },
                data: {
                    password_hash,
                    reset_password_token: null,
                    reset_password_expires: null
                }
            });

            // 🔥 ENVIAR EVENTO DE CONTRASEÑA RESTABLECIDA
            await eventDispatcher.passwordRestablecido({
                usuario_id: usuario.usuario_id,
                email: usuario.email,
                nombre: usuario.nombre || 'Usuario'
            });

            res.json({
                success: true,
                message: 'Contraseña restablecida exitosamente'
            });

        } catch (error) {
            console.error('❌ Error en resetPassword:', error);
            res.status(500).json({
                success: false,
                message: 'Error restableciendo contraseña: ' + error.message
            });
        }
    }

    // --- MÉTODOS HELPER ---

    async esNuevoDispositivo(usuario_id, userAgent) {
        try {
            // Buscar sesiones recientes con el mismo user agent
            const sesionesRecientes = await prisma.sesionUsuario.findMany({
                where: {
                    usuario_id,
                    user_agent: userAgent,
                    expires_at: { gt: new Date() }
                },
                take: 1
            });

            return sesionesRecientes.length === 0;
        } catch (error) {
            console.error('Error verificando dispositivo:', error);
            return true; // Por seguridad, asumir que es nuevo
        }
    }
}