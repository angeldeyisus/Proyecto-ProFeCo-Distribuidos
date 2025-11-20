import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export class ProductController {

  async obtenerProductos(req, res) {
    try {
      const { pagina = 1, limite = 10, categoria, marca } = req.query;
      
      const filtros = {};
      if (categoria) filtros.categoria_id = categoria;
      if (marca) filtros.marca = marca;

      const resultado = await productService.obtenerProductos(filtros, {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        ordenar: { nombre: 1 }
      });

      res.json(resultado);
    } catch (error) {
      console.error('Error en controlador obtenerProductos:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async buscarProductos(req, res) {
    try {
      const { q: query, limite = 10 } = req.query;

      if (!query) {
        return res.status(400).json({ error: 'Parámetro de búsqueda (q) requerido' });
      }

      const resultado = await productService.buscarProductos(query, {
        limite: parseInt(limite)
      });

      res.json(resultado);
    } catch (error) {
      console.error('Error en controlador buscarProductos:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerProducto(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID de producto requerido' });
      }

      const producto = await productService.obtenerProductoPorId(id);
      res.json(producto);
    } catch (error) {
      console.error('Error en controlador obtenerProducto:', error);
      if (error.message === 'Producto no encontrado') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async crearProducto(req, res) {
    try {
      const { nombre, descripcion, marca, categoria_id, upc, imagen_url, unidad_medida, contenido, atributos } = req.body;

      if (!nombre || !categoria_id || !unidad_medida || !contenido) {
        return res.status(400).json({
          error: 'Faltan campos obligatorios: nombre, categoria_id, unidad_medida, contenido'
        });
      }

      const resultado = await productService.crearProducto({
        nombre,
        descripcion,
        marca,
        categoria_id,
        upc,
        imagen_url,
        unidad_medida,
        contenido: parseFloat(contenido),
        atributos: atributos || {}
      });

      res.status(201).json(resultado);
    } catch (error) {
      console.error('Error en controlador crearProducto:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerPorCategoria(req, res) {
    try {
      const { categoriaId } = req.params;
      const { pagina = 1, limite = 10 } = req.query;

      if (!categoriaId) {
        return res.status(400).json({ error: 'ID de categoría requerido' });
      }

      const productos = await productService.obtenerProductosPorCategoria(categoriaId, {
        pagina: parseInt(pagina),
        limite: parseInt(limite)
      });

      res.json(productos);
    } catch (error) {
      console.error('Error en controlador obtenerPorCategoria:', error);
      res.status(500).json({ error: error.message });
    }
  }
}