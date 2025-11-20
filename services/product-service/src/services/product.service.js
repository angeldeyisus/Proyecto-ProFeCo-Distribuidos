import { ProductRepository } from '../repositories/product.repository.js';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async obtenerProductos(filtros = {}, opciones = {}) {
    try {
      console.log('🛍️ Obteniendo productos con filtros:', filtros);
      return await this.productRepository.encontrarTodos(filtros, opciones);
    } catch (error) {
      console.error('Error en ProductService.obtenerProductos:', error);
      throw error;
    }
  }

  async buscarProductos(textoBusqueda, opciones = {}) {
    try {
      console.log('🔍 Buscando productos:', textoBusqueda);
      
      if (!textoBusqueda || textoBusqueda.trim() === '') {
        return await this.obtenerProductos({}, opciones);
      }

      const productos = await this.productRepository.buscarPorTexto(textoBusqueda, opciones);
      
      return {
        productos,
        busqueda: textoBusqueda,
        total: productos.length
      };
    } catch (error) {
      console.error('Error en ProductService.buscarProductos:', error);
      throw error;
    }
  }

  async obtenerProductoPorId(productoId) {
    try {
      console.log('📦 Obteniendo producto por ID:', productoId);
      const producto = await this.productRepository.encontrarPorId(productoId);
      
      if (!producto) {
        throw new Error('Producto no encontrado');
      }

      return producto;
    } catch (error) {
      console.error('Error en ProductService.obtenerProductoPorId:', error);
      throw error;
    }
  }

  async crearProducto(datosProducto) {
    try {
      console.log('➕ Creando producto:', datosProducto.nombre);

      // Validaciones básicas
      if (!datosProducto.nombre || !datosProducto.categoria_id) {
        throw new Error('Nombre y categoría son obligatorios');
      }

      const producto = await this.productRepository.crear(datosProducto);
      console.log('✅ Producto creado:', producto._id);
      
      return {
        mensaje: 'Producto creado exitosamente',
        producto
      };
    } catch (error) {
      console.error('Error en ProductService.crearProducto:', error);
      throw error;
    }
  }

  async obtenerProductosPorCategoria(categoriaId, opciones = {}) {
    try {
      console.log('🏷️ Obteniendo productos por categoría:', categoriaId);
      return await this.productRepository.encontrarPorCategoria(categoriaId, opciones);
    } catch (error) {
      console.error('Error en ProductService.obtenerProductosPorCategoria:', error);
      throw error;
    }
  }

  async obtenerProductosPorIds(ids) {
    try {
      console.log('📋 Obteniendo productos por IDs:', ids);
      return await this.productRepository.encontrarPorIds(ids);
    } catch (error) {
      console.error('Error en ProductService.obtenerProductosPorIds:', error);
      throw error;
    }
  }
}