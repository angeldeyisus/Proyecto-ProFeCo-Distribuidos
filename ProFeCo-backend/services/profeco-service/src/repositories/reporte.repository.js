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

// 1. Obtener Agrupación para el Tablero
export async function obtenerInfractoresAgrupados() {
  try {
    console.log("🔍 Buscando reportes PENDIENTES en la colección 'reportes'...");
    
    const resultado = await Reporte.aggregate([
      // 1. Filtramos solo los que no se han resuelto
      { $match: { estado: 'PENDIENTE' } }, 
      
      // 2. Agrupamos por tienda
      {
        $group: {
          _id: "$tienda_id", // Agrupar por ID de tienda
          tienda_nombre: { $first: "$tienda_nombre" }, // Tomar el nombre del primer reporte encontrado
          total_quejas: { $sum: 1 }, // Contar cuántos hay
          quejas_detalle: { 
            $push: { 
              motivo: "$motivo", 
              comentario: "$comentarios", 
              fecha: "$createdAt" 
            } 
          }
        }
      },
      
      // 3. Ordenamos: el que tenga más quejas va primero
      { $sort: { total_quejas: -1 } }
    ]);

    console.log(`✅ Se encontraron ${resultado.length} tiendas con reportes.`);
    return resultado;

  } catch (error) {
    console.error("❌ Error en obtenerInfractoresAgrupados:", error);
    throw new Error("Error consultando la colección de reportes.");
  }
}

// 2. Contar pendientes (Para la multa)
export async function contarPendientesPorTienda(tiendaId) {
    // Aseguramos que tiendaId sea string, a veces llega como ObjectId
    return await Reporte.countDocuments({ 
        tienda_id: tiendaId.toString(), 
        estado: 'PENDIENTE' 
    });
}

// 3. Resolver reportes (Cerrarlos)
export async function resolverReportesPorTienda(tiendaId, folioMulta) {
  try {
    return await Reporte.updateMany(
      { tienda_id: tiendaId.toString(), estado: 'PENDIENTE' },
      { 
        $set: { 
          estado: 'RESUELTO', 
          comentarios_resolucion: `Multa aplicada. Folio: ${folioMulta}`
        } 
      }
    );
  } catch (error) {
    console.error("Error resolviendo reportes:", error);
    throw error;
  }
}
