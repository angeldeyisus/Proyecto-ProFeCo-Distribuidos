import productService from '../services/product.service.js';

class ProductController {

    async crearProducto(req, res) {
        try {
            const productoData = req.body;
            const producto = await productService.crearProducto(productoData);
            
            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                data: producto
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerProducto(req, res) {
        try {
            const { id } = req.params;
            const producto = await productService.obtenerProducto(id);
            
            res.json({
                success: true,
                data: producto
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async actualizarProducto(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            const producto = await productService.actualizarProducto(id, updateData);
            
            res.json({
                success: true,
                message: 'Producto actualizado exitosamente',
                data: producto
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async eliminarProducto(req, res) {
        try {
            const { id } = req.params;
            const producto = await productService.eliminarProducto(id);
            
            res.json({
                success: true,
                message: 'Producto eliminado exitosamente',
                data: producto
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async listarProductos(req, res) {
        try {
            const { 
                pagina = 1, 
                limite = 10, 
                categoria, 
                marca, 
                estado,
                texto 
            } = req.query;
            
            const filtros = {};
            const paginacion = { pagina: parseInt(pagina), limite: parseInt(limite) };

            if (categoria) filtros.categoria_id = categoria;
            if (marca) filtros.marca = marca;
            if (estado) filtros.estado = estado;
            
            let resultado;
            if (texto) {
                resultado = await productService.buscarPorTexto(texto, paginacion);
            } else {
                resultado = await productService.buscarProductos(filtros, paginacion);
            }
            
            res.json({
                success: true,
                data: resultado.productos,
                paginacion: resultado.paginacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerPorCategoria(req, res) {
        try {
            const { categoria_id } = req.params;
            const { pagina = 1, limite = 10 } = req.query;
            
            const paginacion = { pagina: parseInt(pagina), limite: parseInt(limite) };
            const resultado = await productService.obtenerPorCategoria(categoria_id, paginacion);
            
            res.json({
                success: true,
                data: resultado.productos,
                paginacion: resultado.paginacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerPorMarca(req, res) {
        try {
            const { marca } = req.params;
            const { pagina = 1, limite = 10 } = req.query;
            
            const paginacion = { pagina: parseInt(pagina), limite: parseInt(limite) };
            const resultado = await productService.obtenerPorMarca(marca, paginacion);
            
            res.json({
                success: true,
                data: resultado.productos,
                paginacion: resultado.paginacion
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerParaOfertas(req, res) {
        try {
            const { categoria, marca } = req.query;
            
            const filtros = {};
            if (categoria) filtros.categoria_id = categoria;
            if (marca) filtros.marca = marca;
            
            const productos = await productService.obtenerProductosParaOfertas(filtros);
            
            res.json({
                success: true,
                data: productos
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerEstadisticas(req, res) {
        try {
            const estadisticas = await productService.obtenerEstadisticas();
            
            res.json({
                success: true,
                data: estadisticas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerMarcas(req, res) {
        try {
            const productos = await productService.buscarProductos({ estado: 'activo' }, { limite: 1000 });
            const marcas = [...new Set(productos.productos.map(p => p.marca).filter(Boolean))];
            
            res.json({
                success: true,
                data: marcas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default ProductController;