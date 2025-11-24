import preferencesService from '../services/preferences.service.js';

class PreferencesController {

  async obtenerPreferencias(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const preferencias = await preferencesService.obtenerPreferencias(usuario_id);
      
      res.json({
        success: true,
        data: preferencias
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarPreferencias(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const preferenciasData = req.body;

      const preferencias = await preferencesService.crearOActualizarPreferencias({
        usuario_id,
        ...preferenciasData
      });
      
      res.json({
        success: true,
        message: 'Preferencias actualizadas exitosamente',
        data: preferencias
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async agregarSupermercadoFavorito(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { tienda_id } = req.body;

      if (!tienda_id) {
        return res.status(400).json({
          success: false,
          message: 'ID de tienda es requerido'
        });
      }

      const preferencias = await preferencesService.agregarSupermercadoFavorito(usuario_id, tienda_id);
      
      res.json({
        success: true,
        message: 'Supermercado agregado a favoritos',
        data: preferencias
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async eliminarSupermercadoFavorito(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { tienda_id } = req.params;

      const preferencias = await preferencesService.eliminarSupermercadoFavorito(usuario_id, tienda_id);
      
      res.json({
        success: true,
        message: 'Supermercado eliminado de favoritos',
        data: preferencias
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async agregarCategoriaInteres(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { categoria } = req.body;

      if (!categoria) {
        return res.status(400).json({
          success: false,
          message: 'Categoría es requerida'
        });
      }

      const preferencias = await preferencesService.agregarCategoriaInteres(usuario_id, categoria);
      
      res.json({
        success: true,
        message: 'Categoría agregada a intereses',
        data: preferencias
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default PreferencesController;