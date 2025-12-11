import productRepository from '../repositories/product.repository.js';

class ProductService {
    
    async crearProducto(productoData) {
        try {
            this.validarProducto(productoData);

            if (!productoData.sku) {
                productoData.sku = await this.generarSKU(productoData);
            }
            
            return await productRepository.crearProducto(productoData);
        } catch (error) {
            throw new Error(`Error creando producto: ${error.message}`);
        }
    }

    async obtenerProducto(id) {
        const producto = await productRepository.obtenerProductoPorId(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        return producto;
    }

    async actualizarProducto(id, updateData) {
        try {
            await this.obtenerProducto(id);

            if (updateData.nombre || updateData.descripcion) {
                this.validarProducto(updateData, true);
            }
            
            return await productRepository.actualizarProducto(id, updateData);
        } catch (error) {
            throw new Error(`Error actualizando producto: ${error.message}`);
        }
    }

    async eliminarProducto(id) {
        try {
            await this.obtenerProducto(id);
            return await productRepository.eliminarProducto(id);
        } catch (error) {
            throw new Error(`Error eliminando producto: ${error.message}`);
        }
    }

    async buscarProductos(filtros = {}, paginacion = {}) {
        try {
            const productos = await productRepository.buscarProductos(filtros, paginacion);
            const total = await productRepository.contarProductos(filtros);
            
            return {
                productos,
                paginacion: {
                    ...paginacion,
                    total,
                    totalPaginas: Math.ceil(total / (paginacion.limite || 10))
                }
            };
        } catch (error) {
            throw new Error(`Error buscando productos: ${error.message}`);
        }
    }

    async buscarPorTexto(texto, paginacion = {}) {
        if (!texto || texto.trim().length < 2) {
            throw new Error('El texto de búsqueda debe tener al menos 2 caracteres');
        }
        
        return await this.buscarProductos(
            { $text: { $search: texto } },
            paginacion
        );
    }

    async obtenerPorCategoria(categoria_id, paginacion = {}) {
        return await this.buscarProductos(
            { categoria_id, estado: 'activo' },
            paginacion
        );
    }

    async obtenerPorMarca(marca, paginacion = {}) {
        return await this.buscarProductos(
            { marca, estado: 'activo' },
            paginacion
        );
    }

    async obtenerProductosParaOfertas(filtros = {}) {
        return await productRepository.obtenerProductosParaOfertas({
            estado: 'activo',
            ...filtros
        });
    }

    async obtenerEstadisticas() {
        const [totalProductos, totalActivos, marcas, categorias] = await Promise.all([
            productRepository.contarProductos(),
            productRepository.contarProductos({ estado: 'activo' }),
            productRepository.obtenerMarcas(),
            productRepository.obtenerCategorias()
        ]);

        return {
            totalProductos,
            totalActivos,
            totalInactivos: totalProductos - totalActivos,
            totalMarcas: marcas.length,
            totalCategorias: categorias.length,
            marcas: marcas.slice(0, 10),
            categorias: categorias.slice(0, 10)
        };
    }

    validarProducto(productoData, esActualizacion = false) {
        const { nombre, unidad_medida, contenido } = productoData;
        
        if (!esActualizacion || nombre !== undefined) {
            if (!nombre || nombre.trim().length < 2) {
                throw new Error('El nombre del producto es requerido y debe tener al menos 2 caracteres');
            }
        }
        
        if (!esActualizacion || unidad_medida !== undefined) {
            const unidadesValidas = ['kg', 'litro', 'pieza', 'paquete', 'gramo', 'mililitro'];
            if (!unidad_medida || !unidadesValidas.includes(unidad_medida.toLowerCase())) {
                throw new Error(`Unidad de medida inválida. Use: ${unidadesValidas.join(', ')}`);
            }
        }
        
        if (!esActualizacion || contenido !== undefined) {
            if (!contenido || contenido <= 0) {
                throw new Error('El contenido debe ser un número positivo');
            }
        }
    }

    async generarSKU(productoData) {
        const { nombre, marca, categoria_id } = productoData;
        const prefix = nombre.substring(0, 3).toUpperCase();
        const marcaCode = marca ? marca.substring(0, 2).toUpperCase() : 'GN';
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        return `${prefix}${marcaCode}${random}`;
    }
}

export default new ProductService();