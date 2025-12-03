import priceService from '../services/price.service.js';

class PriceController {

    async crearOActualizarPrecio(req, res) {
        try {
            const precioData = req.body;
            const precio = await priceService.crearOActualizarPrecio(precioData);
            
            res.status(201).json({
                success: true,
                message: 'Precio actualizado exitosamente',
                data: precio
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerPrecio(req, res) {
        try {
            const { producto_id, tienda_id } = req.params;
            const precio = await priceService.obtenerPrecio(producto_id, tienda_id);
            
            res.json({
                success: true,
                data: precio
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerPreciosPorProducto(req, res) {
        try {
            const { producto_id } = req.params;
            const { solo_disponibles = 'true' } = req.query;
            
            const precios = await priceService.obtenerPreciosPorProducto(
                producto_id, 
                solo_disponibles === 'true'
            );
            
            res.json({
                success: true,
                data: precios
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerPreciosPorTienda(req, res) {
        try {
            const { tienda_id } = req.params;
            const { pagina = 1, limite = 50 } = req.query;
            
            const paginacion = { pagina: parseInt(pagina), limite: parseInt(limite) };
            const resultado = await priceService.obtenerPreciosPorTienda(tienda_id, paginacion);
            
            res.json({
                success: true,
                data: resultado.precios,
                paginacion: resultado.paginacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async crearOferta(req, res) {
        try {
            const ofertaData = req.body;
            const oferta = await priceService.crearOferta(ofertaData);
            
            res.status(201).json({
                success: true,
                message: 'Oferta creada exitosamente',
                data: oferta
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async eliminarOferta(req, res) {
        try {
            const { producto_id, tienda_id } = req.params;
            const precio = await priceService.eliminarOferta(producto_id, tienda_id);
            
            res.json({
                success: true,
                message: 'Oferta eliminada exitosamente',
                data: precio
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerOfertasActivas(req, res) {
        try {
            const { tienda_id } = req.query;
            
            const ofertas = await priceService.obtenerOfertasActivas(tienda_id || null);
            
            res.json({
                success: true,
                data: ofertas
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerMejoresPrecios(req, res) {
        try {
            const { producto_id } = req.params;
            const { limite = 10 } = req.query;
            
            const precios = await priceService.obtenerMejoresPrecios(
                producto_id, 
                parseInt(limite)
            );
            
            res.json({
                success: true,
                data: precios
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerEstadisticasPrecios(req, res) {
        try {
            const { producto_id } = req.params;
            const estadisticas = await priceService.obtenerEstadisticasPrecios(producto_id);
            
            res.json({
                success: true,
                data: estadisticas
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async buscarPreciosPorRango(req, res) {
        try {
            const { min, max } = req.query;
            const { categoria, marca } = req.body;
            
            if (!min || !max) {
                return res.status(400).json({
                    success: false,
                    message: 'Los parámetros min y max son requeridos'
                });
            }
            
            const criterios = {};
            if (categoria) criterios.categoria = categoria;
            if (marca) criterios.marca = marca;
            
            const precios = await priceService.buscarPreciosPorRango(
                parseFloat(min),
                parseFloat(max),
                criterios
            );
            
            res.json({
                success: true,
                data: precios
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async actualizarOfertasExpiradas(req, res) {
        try {
            const resultado = await priceService.actualizarOfertasExpiradas();
            
            res.json({
                success: true,
                message: `Se actualizaron ${resultado.modifiedCount} ofertas expiradas`,
                data: resultado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default PriceController;