import * as productoRepo from "../repositories/producto.repository.js";

export class ProductoServiceTienda {

    async crearProducto(tiendaId, data) {
        if (!data.nombre) throw new Error("El nombre es obligatorio.");
        if (data.precio < 0) throw new Error("Precio inválido.");

        data.tienda_id = tiendaId;

        return await productoRepo.crearProducto(data);
    }

    async actualizarProducto(productoId, tiendaId, data) {
        const producto = await productoRepo.obtenerProductoPorId(productoId);

        if (!producto) throw new Error("Producto no existe.");
        if (producto.tienda_id.toString() !== tiendaId.toString()) {
            throw new Error("No puedes editar un producto que no es tuyo.");
        }

        return await productoRepo.actualizarProducto(productoId, data);
    }

    async eliminarProducto(productoId, tiendaId) {
        const producto = await productoRepo.obtenerProductoPorId(productoId);

        if (!producto) throw new Error("Producto no existe.");
        if (producto.tienda_id.toString() !== tiendaId.toString()) {
            throw new Error("No puedes eliminar un producto que no es tuyo.");
        }

        return await productoRepo.eliminarProducto(productoId);
    }

    async actualizarInventario(productoId, tiendaId, cantidad) {
        const producto = await productoRepo.obtenerProductoPorId(productoId);

        if (!producto) throw new Error("Producto no existe.");
        if (producto.tienda_id.toString() !== tiendaId.toString()) {
            throw new Error("No puedes modificar inventario de productos ajenos.");
        }

        return await productoRepo.actualizarInventario(productoId, cantidad);
    }
}
