import Multa from "../models/multa.model.js";

export async function crearMulta(data) {
  try {
    const m = new Multa(data);
    return await m.save();
  } catch (error) {
    console.error("Error al crear multa:", error);
    throw new Error("Error en la base de datos al crear multa.");
  }
}

export async function obtenerMultasDeTienda(tiendaId) {
  try {
    return await Multa.find({ tienda_id: tiendaId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error al obtener multas:", error);
    throw new Error("Error en la base de datos al obtener multas.");
  }
}
