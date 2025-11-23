import priceRepository from '../repositories/price.repository.js';
import axios from 'axios';

class PriceService {

    async crearOActualizarPrecio(precioData) {
        try {
            if (precioData.en_oferta) {
                this.validarDatosOferta(precioData);
            }
            
            const precio = await priceRepository.crearOActualizarPrecio(precioData);

            if (precioData.en_oferta && !precioData._id) {
                await this.notificarOfertaCreada(precio);
            }
            
            return precio;
        } catch (error) {
            throw new Error(`Error gestionando precio: ${error.message}`);
        }
    }

    async obtenerPrecio(producto_id, tienda_id) {
        const precio = await priceRepository.obtenerPrecio(producto_id, tienda_id);
        if (!precio) {
            throw new Error('Precio no encontrado');
        }
        return precio;
    }

    async obtenerPreciosPorProducto(producto_id, soloDisponibles = true) {
        return await priceRepository.obtenerPreciosPorProducto(producto_id, soloDisponibles);
    }

    async obtenerPreciosPorTienda(tienda_id, paginacion = {}) {
        const precios = await priceRepository.obtenerPreciosPorTienda(tienda_id, paginacion);
        const total = await this.contarPreciosPorTienda(tienda_id);
        
        return {
            precios,
            paginacion: {
                ...paginacion,
                total,
                totalPaginas: Math.ceil(total / (paginacion.limite || 50))
            }
        };
    }

    async crearOferta(ofertaData) {
        try {
            this.validarDatosOferta(ofertaData);
            
            const oferta = {
                ...ofertaData,
                en_oferta: true,
                precio_original: ofertaData.precio_original || ofertaData.precio,
                fuente: 'tienda'
            };
            
            const ofertaCreada = await priceRepository.crearOActualizarPrecio(oferta);

            await this.notificarOfertaCreada(ofertaCreada);
            
            return ofertaCreada;
        } catch (error) {
            throw new Error(`Error creando oferta: ${error.message}`);
        }
    }

    async eliminarOferta(producto_id, tienda_id) {
        try {
            const precio = await this.obtenerPrecio(producto_id, tienda_id);
            
            if (!precio.en_oferta) {
                throw new Error('Este producto no tiene una oferta activa');
            }
            
            return await priceRepository.eliminarOferta(producto_id, tienda_id);
        } catch (error) {
            throw new Error(`Error eliminando oferta: ${error.message}`);
        }
    }

    async obtenerOfertasActivas(tienda_id = null) {
        if (tienda_id) {
            return await priceRepository.obtenerOfertasActivasPorTienda(tienda_id);
        }
        return [];
    }

    async obtenerMejoresPrecios(producto_id, limite = 10) {
        return await priceRepository.obtenerMejoresPrecios(producto_id, limite);
    }

    async obtenerEstadisticasPrecios(producto_id) {
        return await priceRepository.obtenerEstadisticasPrecios(producto_id);
    }

    async buscarPreciosPorRango(precioMin, precioMax, criterios = {}) {
        if (precioMin < 0 || precioMax < 0 || precioMin > precioMax) {
            throw new Error('Rango de precios inválido');
        }
        
        return await priceRepository.buscarPreciosPorRango(precioMin, precioMax, criterios);
    }

    async actualizarOfertasExpiradas() {
        const resultado = await priceRepository.actualizarOfertasExpiradas();
        console.log(`Ofertas expiradas actualizadas: ${resultado.modifiedCount}`);
        return resultado;
    }

    validarDatosOferta(ofertaData) {
        const { vigencia_oferta, valor_descuento, tipo_descuento, precio_original } = ofertaData;
        
        if (!vigencia_oferta || !vigencia_oferta.inicio || !vigencia_oferta.fin) {
            throw new Error('Vigencia de oferta incompleta');
        }
        
        const inicio = new Date(vigencia_oferta.inicio);
        const fin = new Date(vigencia_oferta.fin);
        const ahora = new Date();
        
        if (inicio >= fin) {
            throw new Error('Fecha de inicio debe ser anterior a fecha fin');
        }
        
        if (fin <= ahora) {
            throw new Error('La fecha fin debe ser futura');
        }
        
        if (!valor_descuento || valor_descuento <= 0) {
            throw new Error('Valor de descuento inválido');
        }
        
        if (tipo_descuento === 'porcentaje' && valor_descuento > 100) {
            throw new Error('Descuento porcentual no puede ser mayor a 100%');
        }
        
        if (tipo_descuento === 'monto_fijo' && valor_descuento >= precio_original) {
            throw new Error('Descuento en monto no puede ser mayor o igual al precio original');
        }
    }

    async notificarOfertaCreada(oferta) {
        try {
            await axios.post('http://localhost:3006/api/notifications/ofertas', {
                tipo: 'nueva_oferta',
                producto_id: oferta.producto_id,
                tienda_id: oferta.tienda_id,
                producto_nombre: oferta.producto_nombre,
                tienda_nombre: oferta.tienda_nombre,
                precio_original: oferta.precio_original,
                precio_promocional: oferta.precio_promocional,
                valor_descuento: oferta.valor_descuento,
                tipo_descuento: oferta.tipo_descuento,
                vigencia_oferta: oferta.vigencia_oferta
            });
            
            console.log(`Notificación de oferta enviada para producto: ${oferta.producto_id}`);
        } catch (error) {
            console.error('Error notificando oferta:', error.message);
        }
    }

    async contarPreciosPorTienda(tienda_id) {
        const precios = await priceRepository.obtenerPreciosPorTienda(tienda_id, { limite: 1000 });
        return precios.length;
    }
}

export default new PriceService();