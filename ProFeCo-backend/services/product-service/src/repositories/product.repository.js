import Producto from '../models/producto.model.js';

class ProductRepository {

  async crearProducto(productoData) {
    try {
      const producto = new Producto(productoData);
      return await producto.save();
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async crearMultiplesProductos(productosData) {
    try {
      return await Producto.insertMany(productosData, { ordered: false });
    } catch (error) {
      throw new Error(`Error al crear múltiples productos: ${error.message}`);
    }
  }

  async obtenerProductos() {
    try {
      return await Producto.find({ estado: 'activo' })
        .select('_id nombre marca categoria_nombre unidad_medida');
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  // ✔ ESTE SE QUEDA COMO "contarTodos"
  async contarTodos() {
    try {
      return await Producto.countDocuments();
    } catch (error) {
      throw new Error(`Error al contar productos: ${error.message}`);
    }
  }

  async contarProductos(criterios = {}) {
    try {
        return await Producto.countDocuments(criterios);
    } catch (error) {
        throw new Error(`Error al contar productos: ${error.message}`);
    }
}

  async limpiarProductos() {
    try {
      return await Producto.deleteMany({});
    } catch (error) {
      throw new Error(`Error al limpiar productos: ${error.message}`);
    }
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

  // ✔ ESTE SE QUEDA COMO "contarPorCriterios"
  async contarPorCriterios(criterios = {}) {
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
