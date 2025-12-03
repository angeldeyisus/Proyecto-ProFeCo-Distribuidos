import * as multaRepository from "../multa.repository.js";

export class MultaService {

    async crearMulta(data) {
        const { tienda_id, motivo, monto } = data;

        if (!tienda_id) {
            throw new Error("El ID de la tienda es obligatorio para registrar una multa.");
        }

        if (!motivo || motivo.trim().length < 5) {
            throw new Error("El motivo de la multa debe tener al menos 5 caracteres.");
        }

        if (monto == null || monto <= 0) {
            throw new Error("El monto de la multa debe ser un número mayor a 0.");
        }

        const nuevaMulta = await multaRepository.crearMulta(data);
        return nuevaMulta;
    }

    async obtenerMultasDeTienda(tiendaId) {
        if (!tiendaId) {
            throw new Error("Se requiere el ID de la tienda para obtener sus multas.");
        }

        const multas = await multaRepository.obtenerMultasDeTienda(tiendaId);

        const totalMonto = multas.reduce((acc, m) => acc + (m.monto || 0), 0);

        return {
            tienda_id: tiendaId,
            total_multas: multas.length,
            monto_acumulado: totalMonto,
            multas
        };
    }
}