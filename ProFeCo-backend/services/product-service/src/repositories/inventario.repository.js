import Precio from "../../models/precio.model.js";

export async function actualizarPrecio(tiendaId, productoId, precioNormal, precioOferta) {
    try {
        const esOferta = precioOferta != null && precioOferta < precioNormal;

        const filtro = {tienda_id: tiendaId, producto_id: productoId };
        const actualizacion = {
            $set: {
        precio_normal: precioNormal,
        precio_oferta: precioOferta,
        es_oferta: esOferta,
        fecha_actualizacion: new Date(),
            },
        };

        const resultado = await Precio.updateOne(filtro, actualizacion, { upsert: true });
        return resultado;
    } catch (error) {
        console.error("Error al actualizar precio:", error);
        throw new Error("Error en la base de datos al actualizar precio.");
    }
}

export async function buscarPreciosDeProducto(productoId) {
    try {
        const precios = await Precio.find({ producto_id: productoId }).sort({ precio_normal: 1 });

        return precios;
    } catch (error) {
        console.error("Error al buscar precios:", error);
        throw new Error("Error en la base de datos al buscar precios.");
    }
}