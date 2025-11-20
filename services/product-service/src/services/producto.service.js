import * as productoRepository from "../../models-repository/producto.repository.js";

export class ProductoService {

    async registrarProducto(data) {

        if (!data.nombre || data.nombre.trim() === "") {
            throw new Error("El nombre del producto es obligatorio.");
        }

        if (data.precio != null && data.precio < 0) {
            throw new Error("El precio del producto no puede ser negativo.");
        }

        const producto = await productoRepository.crearProducto(data);
        return producto;
    }

    async obtenerDetallesProducto(id) {
        if (!id) {
            throw new Error("Debe proporcionarse un ID de producto.");
        }

        const producto = await productoRepository.obtenerProductoPorId(id);

        if (!producto) {
            throw new Error("No se encontró el producto solicitado.");
        }

        return producto;
    }

    async buscarProductos(nombre) {
        if (!nombre || nombre.trim().length < 2) {
            throw new Error("La búsqueda requiere al menos 2 caracteres.");
        }

        const productos = await productoRepository.buscarProductosPorNombre(nombre);

        if (!productos || productos.length === 0) {
            throw new Error("No se encontraron productos que coincidan.");
        }

        return productos;
    }

    async obtenerCatalogoCompleto() {
        const lista = await productoRepository.listarTodos();

        return {
            total_productos: lista.length,
            productos: lista
        };
    }
}