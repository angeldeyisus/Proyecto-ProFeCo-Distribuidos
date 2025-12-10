import * as multaRepository from "../repositories/multa.repository.js"
import * as reporteRepository from "../repositories/reporte.repository.js"

export class MultaService {

    // --- LÓGICA DEL TABLERO ---
    async obtenerTableroProfeco() {
        return await reporteRepository.obtenerInfractoresAgrupados();
    }

    // --- LÓGICA DE IMPONER MULTA ---
    async imponerMulta(data) {
        const { tienda_id, tienda_nombre, motivo, monto, agente_id, agente_nombre } = data;

        // 1. Validaciones
        if (!tienda_id) throw new Error("ID de tienda requerido.");
        if (!monto || monto <= 0) throw new Error("Monto inválido.");

        // 2. Contar cuántas quejas estamos castigando
        const cantidadReportes = await reporteRepository.contarPendientesPorTienda(tienda_id);

        // 3. Crear la Multa
        const datosMulta = {
            tienda_id,
            tienda_nombre,
            agente_id,
            agente_nombre,
            monto,
            motivo,
            cantidad_reportes_asociados: cantidadReportes
        };

        const nuevaMulta = await multaRepository.crearMulta(datosMulta);

        // 4. Cerrar los reportes automáticamente ("Justicia aplicada")
        await reporteRepository.resolverReportesPorTienda(tienda_id, nuevaMulta._id);

        return nuevaMulta;
    }

    // (Tus métodos anteriores pueden quedarse si los usas para historial)
    async obtenerMultasDeTienda(tiendaId) {
        // ... tu código existente ...
        const multas = await multaRepository.obtenerMultasDeTienda(tiendaId);
        return multas;
    }
}