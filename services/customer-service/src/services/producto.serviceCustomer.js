import * as productoRepo from "../../models-repository/producto.repository.js";

export class ProductoServiceCustomer {

    async listarProductos() {
        return await productoRepo.listarTodos();
    }

    async buscar(nombre) {
        if (!nombre || nombre.length < 2) {
            throw new Error("El criterio de búsqueda es muy corto.");
        }
        return await productoRepo.buscarProductosPorNombre(nombre);
    }

    async obtenerDetalle(productoId) {
        const producto = await productoRepo.obtenerProductoPorId(productoId);
        if (!producto) throw new Error("Producto no encontrado.");
        return producto;
    }

    async obtenerTopVendidos(limit = 10) {
        return await productoRepo.obtenerTopProductosVendidos(limit);
    }
}
