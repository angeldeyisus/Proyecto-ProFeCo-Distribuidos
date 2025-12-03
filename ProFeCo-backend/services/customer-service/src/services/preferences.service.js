import preferencesRepository from '../repositories/preferences.repository.js';

class PreferencesService {
  
  async crearOActualizarPreferencias(preferenciasData) {
    try {
      this.validarPreferencias(preferenciasData);

      const preferenciasExistentes = await preferencesRepository.obtenerPreferenciasPorUsuarioId(preferenciasData.usuario_id);

      if (preferenciasExistentes) {
        return await preferencesRepository.actualizarPreferencias(
          preferenciasData.usuario_id, 
          preferenciasData
        );
      } else {
        return await preferencesRepository.crearPreferencias(preferenciasData);
      }
    } catch (error) {
      throw new Error(`Error gestionando preferencias: ${error.message}`);
    }
  }

  async obtenerPreferencias(usuario_id) {
    try {
      const preferencias = await preferencesRepository.obtenerPreferenciasPorUsuarioId(usuario_id);
      
      if (!preferencias) {
        return {
          usuario_id,
          supermercados_favoritos: [],
          productos_frecuentes: [],
          categorias_interes: [],
          notificaciones_ofertas: true,
          radio_busqueda: 10
        };
      }

      return preferencias;
    } catch (error) {
      throw new Error(`Error obteniendo preferencias: ${error.message}`);
    }
  }

  async agregarSupermercadoFavorito(usuario_id, tienda_id) {
    try {
      if (!tienda_id) {
        throw new Error('ID de tienda es requerido');
      }

      return await preferencesRepository.agregarSupermercadoFavorito(usuario_id, tienda_id);
    } catch (error) {
      throw new Error(`Error agregando supermercado favorito: ${error.message}`);
    }
  }

  async eliminarSupermercadoFavorito(usuario_id, tienda_id) {
    try {
      if (!tienda_id) {
        throw new Error('ID de tienda es requerido');
      }

      return await preferencesRepository.eliminarSupermercadoFavorito(usuario_id, tienda_id);
    } catch (error) {
      throw new Error(`Error eliminando supermercado favorito: ${error.message}`);
    }
  }

  async agregarCategoriaInteres(usuario_id, categoria) {
    try {
      if (!categoria || categoria.trim().length === 0) {
        throw new Error('Categoría es requerida');
      }

      return await preferencesRepository.agregarCategoriaInteres(usuario_id, categoria.trim());
    } catch (error) {
      throw new Error(`Error agregando categoría de interés: ${error.message}`);
    }
  }

  async obtenerUsuariosParaNotificaciones(categoria, ubicacion) {
    try {
      const usuarios = await preferencesRepository.obtenerUsuariosPorCategoriaInteres(categoria);

      return usuarios;
    } catch (error) {
      throw new Error(`Error obteniendo usuarios para notificaciones: ${error.message}`);
    }
  }

  validarPreferencias(preferenciasData) {
    const { radio_busqueda, notificaciones_ofertas } = preferenciasData;

    if (radio_busqueda !== undefined && (radio_busqueda < 1 || radio_busqueda > 100)) {
      throw new Error('El radio de búsqueda debe estar entre 1 y 100 km');
    }

    if (notificaciones_ofertas !== undefined && typeof notificaciones_ofertas !== 'boolean') {
      throw new Error('Las notificaciones de ofertas deben ser true o false');
    }
  }
}

export default new PreferencesService();