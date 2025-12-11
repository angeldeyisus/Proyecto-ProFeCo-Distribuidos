import Producto from "../models/producto.model.js";

export async function crearProducto(data) {
    try {
        const producto = new Producto(data);
        return await producto.save();
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw new Error("Error en la base de datos al crear producto.");
    }
}

export async function obtenerProductoPorId(id) {
    try {
        return await Producto.findById(id);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        throw new Error("Error en la base de datos al consultar producto.");
    }
}

export async function buscarProductosPorNombre(nombre) {
    try {
        return await Producto.find({
            nombre: { $regex: nombre, $options: "i" }
        });
    } catch (error) {
        console.error("Error al buscar productos:", error);
        throw new Error("Error en la base de datos al buscar productos.");
    }
}

export async function listarTodos() {
    try {
        return await Producto.find({});
    } catch (error) {
        console.error("Error al listar productos:", error);
        throw new Error("Error en la base de datos al listar productos.");
    }
}
