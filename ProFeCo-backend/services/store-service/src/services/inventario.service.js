import * as inventarioRepository from '../inventario.repository.js';

export class InventarioService{
    /**
     * Regla de Negocio: Actualizar o cargar un Precio
     * ProFeCo requiere que las ofertas sean reales.
     */
    async gestionarPrecio(tiendaId, productoId, precioNormal, precioOferta){
        if(precioNormal < 0 || (precioOferta !== null && precioOferta < 0)){
            throw new Error("Los Precios no pueden ser negativos.");
        }

        if(precioOferta !== null & precioOferta >= precioNormal){
            throw new Error("El precio de oferta debe ser menor que el precio normal para ser valido.");
        }

        const resultado = await inventarioRepository.actualizarPrecio(
            tiendaId,
            productoId,
            precioNormal,
            precioOferta
        );

        return resultado;
    }

    async compararPrecios(productoId){
        const precios = await inventarioRepository.buscarPreciosDeProducto(productoId);

        if(!precios || precios. length === 0){
            throw new Error("Este producto no esta disponible en ninguna tienda registrada.");
        }

        //La base de datos ya los ordena por precio

        const mejorOpcion = precios[0];
        const precioMasAlto = precios[precios.length - 1];
        const ahorroPosible = precioMasAlto.precio_normal - mejorOpcion.precio_normal;

        return {
            mejor_opcion: mejorOpcion,
            lista_completa: precios,
            estadisticas: {
                diferencia_maxima: ahorroPosible,
                total_tiendas: precios.length
            }
        };
    }

    
}