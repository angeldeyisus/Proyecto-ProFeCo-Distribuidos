import Reporte from "../models/reporte.model.js";

export async function crearReporte(data) {
  try {
    const rep = new Reporte(data);
    return await rep.save();
  } catch (error) {
    console.error("Error al crear reporte:", error);
    throw new Error("Error en la base de datos al crear reporte.");
  }
}

export async function obtenerReportesPorTienda(tiendaId) {
  try {
    return await Reporte.find({ tienda_id: tiendaId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error al obtener reportes por tienda:", error);
    throw new Error("Error en la base de datos al obtener reportes.");
  }
}

export async function obtenerReportesPorUsuario(usuarioId) {
  try {
    return await Reporte.find({ usuario_id: usuarioId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error al obtener reportes por usuario:", error);
    throw new Error("Error en la base de datos al obtener reportes.");
  }
}
