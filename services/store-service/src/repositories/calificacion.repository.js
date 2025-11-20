import Calificacion from "../models/calificacion.model.js";

export async function crearCalificacion(data) {
  try {
    const cal = new Calificacion(data);
    return await cal.save();
  } catch (error) {
    console.error("Error al crear calificación:", error);
    throw new Error("Error en la base de datos al crear calificación.");
  }
}

export async function obtenerCalificacionesDeTienda(tiendaId) {
  try {
    return await Calificacion.find({ tienda_id: tiendaId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
    throw new Error("Error en la base de datos al obtener calificaciones.");
  }
}

export async function obtenerPromedioPorTienda(tiendaId) {
  try {
    const agg = await Calificacion.aggregate([
      { $match: { tienda_id: tiendaId } },
      { $group: { _id: "$tienda_id", promedio: { $avg: "$estrellas" }, total: { $sum: 1 } } }
    ]);
    return agg[0] || { promedio: 0, total: 0 };
  } catch (error) {
    console.error("Error al calcular promedio de calificaciones:", error);
    throw new Error("Error en la base de datos al calcular promedio.");
  }
}
