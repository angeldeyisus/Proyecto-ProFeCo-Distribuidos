import Precio from '../models/precio.model.js';

class PriceRepository {

    async crearPrecio(precioData) {
        try {
            const precio = new Precio(precioData);
            return await precio.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Ya existe un precio para este producto en esta tienda');
            }
            throw new Error(`Error al crear precio: ${error.message}`);
        }
    }

    async crearMultiplesPrecios(preciosData) {
        try {
            return await Precio.insertMany(preciosData, { ordered: false });
        } catch (error) {
            throw new Error(`Error al crear múltiples precios: ${error.message}`);
        }
    }

    async contarPrecios() {
        try {
            return await Precio.countDocuments();
        } catch (error) {
            throw new Error(`Error al contar precios: ${error.message}`);
        }
    }

    async limpiarPrecios() {
        try {
            return await Precio.deleteMany({});
        } catch (error) {
            throw new Error(`Error al limpiar precios: ${error.message}`);
        }
    }

    async crearOActualizarPrecio(precioData) {
        const { producto_id, tienda_id } = precioData;

        if (precioData.en_oferta && precioData.valor_descuento) {
            if (precioData.tipo_descuento === 'porcentaje') {
                precioData.precio_promocional = precioData.precio_original * (1 - precioData.valor_descuento / 100);
            } else {
                precioData.precio_promocional = precioData.precio_original - precioData.valor_descuento;
            }
            precioData.precio = Math.max(0, precioData.precio_promocional);
        }

        return await Precio.findOneAndUpdate(
            { producto_id, tienda_id },
            precioData,
            { upsert: true, new: true, runValidators: true }
        );
    }

    async obtenerPrecio(producto_id, tienda_id) {
        return await Precio.findOne({ producto_id, tienda_id });
    }

    async obtenerPreciosPorProducto(producto_id, soloDisponibles = true) {
        const criterios = { producto_id };
        if (soloDisponibles) criterios.disponible = true;

        return await Precio.find(criterios)
            .sort({ precio: 1 });
    }

    async obtenerPreciosPorTienda(tienda_id, paginacion = {}) {
        const { pagina = 1, limite = 50 } = paginacion;
        const skip = (pagina - 1) * limite;

        return await Precio.find({ tienda_id, disponible: true })
            .skip(skip)
            .limit(limite)
            .sort({ ultima_actualizacion: -1 });
    }

    async obtenerOfertasActivasPorTienda(tienda_id) {
        const ahora = new Date();
        return await Precio.find({
            tienda_id,
            en_oferta: true,
            'vigencia_oferta.fin': { $gte: ahora },
            'vigencia_oferta.inicio': { $lte: ahora },
            disponible: true
        }).sort({ valor_descuento: -1 });
    }

    async obtenerOfertasPorProducto(producto_id) {
        const ahora = new Date();
        return await Precio.find({
            producto_id,
            en_oferta: true,
            'vigencia_oferta.fin': { $gte: ahora },
            'vigencia_oferta.inicio': { $lte: ahora },
            disponible: true
        }).sort({ precio: 1 });
    }

    async obtenerMejoresPrecios(producto_id, limite = 10) {
        return await Precio.find({
            producto_id,
            disponible: true
        })
            .sort({ precio: 1 })
            .limit(limite);
    }

    async buscarOfertasPorFecha(inicio, fin) {
        return await Precio.find({
            en_oferta: true,
            $or: [
                {
                    'vigencia_oferta.inicio': { $lte: fin },
                    'vigencia_oferta.fin': { $gte: inicio }
                }
            ]
        });
    }

    async actualizarOfertasExpiradas() {
        const ahora = new Date();
        return await Precio.updateMany(
            {
                en_oferta: true,
                'vigencia_oferta.fin': { $lt: ahora }
            },
            {
                $set: {
                    en_oferta: false,
                    precio: '$precio_original',
                    precio_promocional: null,
                    valor_descuento: null,
                    tipo_descuento: null
                }
            }
        );
    }

    async eliminarOferta(producto_id, tienda_id) {
        return await Precio.findOneAndUpdate(
            { producto_id, tienda_id, en_oferta: true },
            {
                $set: {
                    en_oferta: false,
                    precio: '$precio_original',
                    precio_promocional: null,
                    valor_descuento: null,
                    tipo_descuento: null,
                    vigencia_oferta: null,
                    condiciones_oferta: null
                }
            },
            { new: true }
        );
    }

    async obtenerEstadisticasPrecios(producto_id) {
        const resultados = await Precio.aggregate([
            { $match: { producto_id, disponible: true } },
            {
                $group: {
                    _id: null,
                    precioMinimo: { $min: '$precio' },
                    precioMaximo: { $max: '$precio' },
                    precioPromedio: { $avg: '$precio' },
                    totalTiendas: { $sum: 1 },
                    tiendasConOferta: {
                        $sum: { $cond: ['$en_oferta', 1, 0] }
                    }
                }
            }
        ]);

        return resultados[0] || {
            precioMinimo: 0,
            precioMaximo: 0,
            precioPromedio: 0,
            totalTiendas: 0,
            tiendasConOferta: 0
        };
    }

    async buscarPreciosPorRango(precioMin, precioMax, criterios = {}) {
        return await Precio.find({
            ...criterios,
            precio: { $gte: precioMin, $lte: precioMax },
            disponible: true
        }).sort({ precio: 1 });
    }
}

export default new PriceRepository();