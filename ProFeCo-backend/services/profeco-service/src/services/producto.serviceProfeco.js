import * as productoRepo from "../repositories/producto.repository.js";

export class ProductoServiceProfeco {

    async listarTodos() {
        return await productoRepo.listarTodos();
    }

    async bloquearProducto(productoId, motivo) {
        const producto = await productoRepo.obtenerProductoPorId(productoId);
        if (!producto) throw new Error("Producto no existe.");

        return await productoRepo.actualizarProducto(productoId, {
            bloqueado: true,
            motivo_bloqueo: motivo
        });
    }

    async marcarPrecioAbusivo(productoId) {
        const producto = await productoRepo.obtenerProductoPorId(productoId);
        if (!producto) throw new Error("Producto no existe.");

        return await productoRepo.actualizarProducto(productoId, {
            precio_abusivo: true
        });
    }

    async obtenerHistorial(productoId) {
        return await productoRepo.obtenerHistorialCambios(productoId);
    }
}
