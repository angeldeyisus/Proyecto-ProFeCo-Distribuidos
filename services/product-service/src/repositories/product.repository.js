import Producto from '../models/producto.model.js';

class ProductRepository {
    
    async crearProducto(productoData) {
        const producto = new Producto(productoData);
        return await producto.save();
    }

    async obtenerProductoPorId(id) {
        return await Producto.findById(id);
    }

    async actualizarProducto(id, updateData) {
        return await Producto.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );
    }

    async eliminarProducto(id) {
        return await Producto.findByIdAndUpdate(
            id, 
            { estado: 'inactivo' }, 
            { new: true }
        );
    }

    async buscarProductos(criterios = {}, paginacion = {}) {
        const { pagina = 1, limite = 10 } = paginacion;
        const skip = (pagina - 1) * limite;

        return await Producto.find(criterios)
            .skip(skip)
            .limit(limite)
            .sort({ createdAt: -1 });
    }

    async buscarPorTexto(texto, paginacion = {}) {
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
        const criterios = { estado: 'activo', ...filtros };
        return await Producto.find(criterios)
            .select('nombre marca categoria_id imagen_url unidad_medida')
            .limit(50); 
    }

    async contarProductos(criterios = {}) {
        return await Producto.countDocuments(criterios);
    }

    async obtenerMarcas() {
        return await Producto.distinct('marca', { estado: 'activo' });
    }

    async obtenerCategorias() {
        return await Producto.distinct('categoria_id', { estado: 'activo' });
    }
}

export default new ProductRepository();