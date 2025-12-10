// controllers/profeco.controller.js
import { MultaService } from "../services/multa.service.js";

const multaService = new MultaService();

export class ProfecoController {

    async obtenerTablero(req, res) {
        try {
            const data = await multaService.obtenerTableroProfeco();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async imponerMulta(req, res) {
        try {
            // Extraemos datos del Body y del Token (req.user)
            const { tienda_id, tienda_nombre, monto, motivo } = req.body;
            const { usuario_id, nombre } = req.user; // Agente PROFECO autenticado

            const resultado = await multaService.imponerMulta({
                tienda_id,
                tienda_nombre,
                monto,
                motivo,
                agente_id: usuario_id,
                agente_nombre: nombre
            });

            res.status(201).json({ 
                success: true, 
                message: 'Multa aplicada y reportes cerrados.', 
                data: resultado 
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}