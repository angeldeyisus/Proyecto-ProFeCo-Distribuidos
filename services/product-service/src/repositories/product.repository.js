import Producto from '../models/producto.model.js';

export class ProductRepository {

  async encontrarTodos(filtros = {}, opciones = {}) {
    try {
      const { pagina = 1, limite = 10, ordenar = { nombre: 1 } } = opciones;
      const skip = (pagina - 1) * limite;

      const productos = await Producto.find(filtros)
        .sort(ordenar)
        .skip(skip)
        .limit(limite);

      const total = await Producto.countDocuments(filtros);

      return {
        productos,
        paginacion: {
          pagina: parseInt(pagina),
          limite: parseInt(limite),
          total,
          paginas: Math.ceil(total / limite)
        }
      };
    } catch (error) {
      throw new Error(`Error buscando productos: ${error.message}`);
    }
  }

  async encontrarPorId(productoId) {
    try {
      return await Producto.findById(productoId);
    } catch (error) {
      throw new Error(`Error buscando producto por ID: ${error.message}`);
    }
  }

  async buscarPorTexto(texto, opciones = {}) {
    try {
      const { limite = 10 } = opciones;

      return await Producto.find(
        { $text: { $search: texto } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(limite);
    } catch (error) {
      throw new Error(`Error buscando productos por texto: ${error.message}`);
    }
  }

  async encontrarPorCategoria(categoriaId, opciones = {}) {
    try {
      const { limite = 10, pagina = 1 } = opciones;
      const skip = (pagina - 1) * limite;

      return await Producto.find({ categoria_id: categoriaId })
        .skip(skip)
        .limit(limite)
        .sort({ nombre: 1 });
    } catch (error) {
      throw new Error(`Error buscando productos por categoría: ${error.message}`);
    }
  }

  async crear(productoData) {
    try {
      const producto = new Producto(productoData);
      return await producto.save();
    } catch (error) {
      throw new Error(`Error creando producto: ${error.message}`);
    }
  }

  async actualizar(productoId, datosActualizados) {
    try {
      return await Producto.findByIdAndUpdate(
        productoId,
        { $set: datosActualizados },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error actualizando producto: ${error.message}`);
    }
  }

  async eliminar(productoId) {
    try {
      return await Producto.findByIdAndDelete(productoId);
    } catch (error) {
      throw new Error(`Error eliminando producto: ${error.message}`);
    }
  }

  async encontrarPorIds(ids) {
    try {
      return await Producto.find({ _id: { $in: ids } });
    } catch (error) {
      throw new Error(`Error buscando productos por IDs: ${error.message}`);
    }
  }
}