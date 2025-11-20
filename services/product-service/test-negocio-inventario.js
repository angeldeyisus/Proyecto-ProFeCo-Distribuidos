import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { conectar, desconectar } from "./mongo.connection.js";
import { InventarioService } from "./src/inventario.service.js";

const inventarioService = new InventarioService();
const resultado = dotenv.config(); 

if (resultado.error) {
    console.log("🔴 Error cargando .env:", resultado.error);
} else {
    console.log("🟢 .env cargado correctamente. Contenido:", resultado.parsed);
}

async function runNegocioTest(){
    console.log('👔 Iniciando Prueba de Lógica de Negocio - Inventario...');

    try {
        await conectar();

        const tiendaId = 'tienda-prueba-uuid';
        const productoId = new mongoose.Types.ObjectId();

        // PRUEBA 1: Intentar poner una oferta FALSA (Más cara que el precio normal)
        // Esto DEBERÍA fallar si nuestra lógica funciona.

        console.log('\n--- Prueba 1: Validar Oferta Incoherente ---');
        try {
            await inventarioService.gestionarPrecio(
                tiendaId,
                productoId,
                100,
                150
            );
            console.log('❌ ERROR: El sistema permitió una oferta inválida.');
        } catch (error) {
            console.log('✅ ÉXITO: El sistema detectó el error:', error.message);
        }

        // PRUEBA 2: Insertar precio correcto
        console.log('\n--- Prueba 2: Insertar Precio Correcto ---');
        await inventarioService.gestionarPrecio(tiendaId, productoId, 100, 80);
        console.log('✅ Precio guardado correctamente.');

        // PRUEBA 3: Consultar Comparador
        console.log('\n--- Prueba 3: Comparador de Precios ---');
        const reporte = await inventarioService.compararPrecios(productoId);
        console.log(`✅ Mejor precio encontrado: $${reporte.mejor_opcion.precio_oferta || reporte.mejor_opcion.precio_normal}`);
        console.log(`📊 Estadísticas: ${reporte.estadisticas.total_tiendas} tiendas tienen este producto.`);
    } catch (error) {
        console.error('❌ Error general:', error);
    } finally {
        await desconectar();
    }
}

runNegocioTest();