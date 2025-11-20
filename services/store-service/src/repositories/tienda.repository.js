import Tienda from "../../models/tienda.model.js";

export async function obtenerTiendaPorId(id) {
    try {
        return await Tienda.findById(id);
    } catch (error) {
        console.error("Error al obtener tienda por ID:", error);
        throw new Error("Error en la base de datos al consultar tienda.");
    }
}

export async function listarTiendas() {
    try {
        return await Tienda.find({});
    } catch (error) {
        console.error("Error al listar tiendas:", error);
        throw new Error("Error en la base de datos al listar tiendas.");
    }
}
