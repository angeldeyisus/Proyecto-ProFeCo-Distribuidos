import * as calificacionRepository from "../calificacion.repository.js";

export class CalificacionService {

    async crearCalificacion(data) {
        const { tienda_id, usuario_id, estrellas, comentario } = data;

        if (!tienda_id) {
            throw new Error("El ID de la tienda es obligatorio.");
        }

        if (!usuario_id) {
            throw new Error("El ID del usuario es obligatorio.");
        }

        if (estrellas < 1 || estrellas > 5) {
            throw new Error("La calificación debe ser un valor entre 1 y 5 estrellas.");
        }

        if (comentario && comentario.trim().length > 0 && comentario.trim().length < 3) {
            throw new Error("El comentario, si se incluye, debe tener al menos 3 caracteres.");
        }

        const nuevaCalificacion = await calificacionRepository.crearCalificacion(data);
        return nuevaCalificacion;
    }

    async obtenerCalificacionesDeTienda(tiendaId) {
        if (!tiendaId) {
            throw new Error("Se requiere el ID de la tienda.");
        }

        const calificaciones = await calificacionRepository.obtenerCalificacionesDeTienda(tiendaId);

        return {
            total: calificaciones.length,
            calificaciones
        };
    }

    async obtenerPromedioPorTienda(tiendaId) {
        if (!tiendaId) {
            throw new Error("Se requiere el ID de la tienda para calcular su promedio.");
        }

        const resultado = await calificacionRepository.obtenerPromedioPorTienda(tiendaId);

        return {
            tienda_id: tiendaId,
            promedio: resultado.promedio || 0,
            total_calificaciones: resultado.total || 0
        };
    }
}