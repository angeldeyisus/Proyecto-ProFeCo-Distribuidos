import Preferencias from "../models/preferencias.model.js";

export async function obtenerPreferenciasUsuario(usuarioId) {
  try {
    return await Preferencias.findOne({ usuario_id: usuarioId });
  } catch (error) {
    console.error("Error al obtener preferencias:", error);
    throw new Error("Error en la base de datos al obtener preferencias.");
  }
}

export async function guardarPreferencias(data) {
  try {
    return await Preferencias.findOneAndUpdate(
      { usuario_id: data.usuario_id },
      data,
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error al guardar preferencias:", error);
    throw new Error("Error en la base de datos al guardar preferencias.");
  }
}
