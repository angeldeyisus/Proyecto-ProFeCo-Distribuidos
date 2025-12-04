import Precio from '../models/precio.model.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PriceController {

    // ==========================================
    // 1. CRUD DE PRECIOS
    // ==========================================

    // POST /api/prices/ (Antes asignarPrecio)
    async crearOActualizarPrecio(req, res) {
        try {
            const { producto_id, precio, en_oferta, precio_promocional, vigencia_oferta } = req.body;
            // El usuario_id viene del token JWT (middleware authenticateToken)
            const usuario_id = req.user.usuario_id; 

            // Verificar que sea TIENDA (Doble check además del middleware)
            if (req.user.tipo_usuario !== 'TIENDA') {
                return res.status(403).json({ success: false, message: 'Permiso denegado. Solo tiendas.' });
            }

            // Buscar la tienda asociada a este usuario
            const tienda = await prisma.tienda.findUnique({ where: { usuario_id } });
            if (!tienda) return res.status(404).json({ success: false, message: 'Tienda no encontrada para este usuario' });

            // Preparar datos base
            const datosActualizacion = {
                producto_id,
                tienda_id: tienda.tienda_id,
                tienda_nombre: tienda.nombre,
                precio: Number(precio),
                fuente: 'tienda',
                ultima_actualizacion: new Date()
            };

            // Lógica de Ofertas integrada
            if (en_oferta) {
                if (!precio_promocional || precio_promocional >= precio) {
                    return res.status(400).json({ success: false, message: 'El precio promocional debe ser menor al normal' });
                }
                datosActualizacion.en_oferta = true;
                datosActualizacion.precio_original = precio;
                datosActualizacion.precio = precio_promocional; // El precio activo es el de oferta
                datosActualizacion.precio_promocional = precio_promocional;
                datosActualizacion.vigencia_oferta = vigencia_oferta;
            } else {
                // Limpiar datos de oferta si se desactivó
                datosActualizacion.en_oferta = false;
                datosActualizacion.precio_original = null;
                datosActualizacion.precio_promocional = null;
                datosActualizacion.vigencia_oferta = null;
            }

            // Upsert (Crear o Actualizar) en MongoDB
            let precioDoc = await Precio.findOne({ producto_id, tienda_id: tienda.tienda_id });

            if (precioDoc) {
                precioDoc.set(datosActualizacion);
                await precioDoc.save();
                return res.json({ success: true, message: 'Precio actualizado', data: precioDoc });
            } else {
                precioDoc = new Precio(datosActualizacion);
                await precioDoc.save();
                return res.status(201).json({ success: true, message: 'Precio creado', data: precioDoc });
            }

        } catch (error) {
            console.error('Error crearOActualizarPrecio:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/prices/producto/:producto_id/tienda/:tienda_id
    async obtenerPrecio(req, res) {
        try {
            const { producto_id, tienda_id } = req.params;
            const precio = await Precio.findOne({ producto_id, tienda_id });
            if (!precio) return res.status(404).json({ success: false, message: 'Precio no encontrado' });
            res.json({ success: true, data: precio });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/prices/producto/:producto_id
    async obtenerPreciosPorProducto(req, res) {
        try {
            const { producto_id } = req.params;
            // Ordenar por precio ascendente (el más barato primero)
            const precios = await Precio.find({ producto_id }).sort({ precio: 1 });
            res.json({ success: true, count: precios.length, data: precios });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/prices/tienda/:tienda_id
    async obtenerPreciosPorTienda(req, res) {
        try {
            const { tienda_id } = req.params;
            const precios = await Precio.find({ tienda_id }).sort({ ultima_actualizacion: -1 });
            res.json({ success: true, count: precios.length, data: precios });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ==========================================
    // 2. GESTIÓN DE OFERTAS
    // ==========================================

    // POST /api/prices/ofertas (Específico para crear ofertas)
    async crearOferta(req, res) {
        req.body.en_oferta = true; // Forzamos el flag para asegurar que entre en la lógica de oferta
        return this.crearOActualizarPrecio(req, res);
    }

    // DELETE /api/prices/ofertas/producto/:producto_id/tienda/:tienda_id
    async eliminarOferta(req, res) {
        try {
            const { producto_id, tienda_id } = req.params;
            
            // Validar que la tienda sea dueña (si se requiere seguridad estricta aquí)
            // Por ahora confiamos en el endpoint, pero idealmente validaríamos contra req.user

            const precioDoc = await Precio.findOne({ producto_id, tienda_id });
            if (!precioDoc) return res.status(404).json({ success: false, message: 'Precio no encontrado' });

            if (!precioDoc.en_oferta) return res.status(400).json({ success: false, message: 'Este producto no tiene una oferta activa' });

            // Restaurar precio original si existe
            if (precioDoc.precio_original) {
                precioDoc.precio = precioDoc.precio_original;
            }
            
            // Limpiar campos de oferta
            precioDoc.en_oferta = false;
            precioDoc.precio_promocional = null;
            precioDoc.precio_original = null;
            precioDoc.vigencia_oferta = null;
            precioDoc.ultima_actualizacion = new Date();

            await precioDoc.save();
            res.json({ success: true, message: 'Oferta eliminada. Precio restaurado.', data: precioDoc });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/prices/ofertas/activas
    async obtenerOfertasActivas(req, res) {
        try {
            const fechaActual = new Date();
            const ofertas = await Precio.find({
                en_oferta: true,
                "vigencia_oferta.fin": { $gte: fechaActual } // Que no hayan caducado
            }).sort({ "vigencia_oferta.fin": 1 }); // Las que van a caducar pronto primero

            res.json({ success: true, count: ofertas.length, data: ofertas });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ==========================================
    // 3. BÚSQUEDAS Y CONSULTAS AVANZADAS
    // ==========================================

    // GET /api/prices/mejores-precios/:producto_id
    async obtenerMejoresPrecios(req, res) {
        try {
            const { producto_id } = req.params;
            // Top 3 precios más bajos
            const mejores = await Precio.find({ producto_id })
                .sort({ precio: 1 })
                .limit(3);
            
            res.json({ success: true, data: mejores });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/prices/estadisticas/:producto_id
    async obtenerEstadisticasPrecios(req, res) {
        try {
            const { producto_id } = req.params;
            // Pipeline de Agregación de Mongo para calcular stats
            const stats = await Precio.aggregate([
                { $match: { producto_id: producto_id } },
                { 
                    $group: {
                        _id: "$producto_id",
                        precio_promedio: { $avg: "$precio" },
                        precio_minimo: { $min: "$precio" },
                        precio_maximo: { $max: "$precio" },
                        total_tiendas: { $sum: 1 },
                        ofertas_activas: { 
                            $sum: { $cond: ["$en_oferta", 1, 0] } 
                        }
                    }
                }
            ]);

            res.json({ success: true, data: stats[0] || {} });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // POST /api/prices/buscar/rango
    async buscarPreciosPorRango(req, res) {
        try {
            const { producto_id, min, max } = req.body;
            
            const query = { precio: { $gte: min, $lte: max } };
            if (producto_id) query.producto_id = producto_id;

            const resultados = await Precio.find(query).sort({ precio: 1 });
            res.json({ success: true, count: resultados.length, data: resultados });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // ==========================================
    // 4. ADMIN - MANTENIMIENTO
    // ==========================================

    // POST /api/prices/admin/actualizar-ofertas-expiradas
    async actualizarOfertasExpiradas(req, res) {
        try {
            const fechaActual = new Date();
            
            // Buscar ofertas vencidas
            const vencidas = await Precio.find({
                en_oferta: true,
                "vigencia_oferta.fin": { $lt: fechaActual }
            });

            // Actualizar una por una para restaurar precios
            let actualizados = 0;
            for (const doc of vencidas) {
                if (doc.precio_original) {
                    doc.precio = doc.precio_original;
                }
                doc.en_oferta = false;
                doc.precio_promocional = null;
                doc.precio_original = null;
                doc.vigencia_oferta = null;
                await doc.save();
                actualizados++;
            }

            res.json({ 
                success: true, 
                message: `Mantenimiento completado. ${actualizados} ofertas expiradas fueron desactivadas.` 
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}