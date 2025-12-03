import Preferencias from '../models/preferencias.model.js';

class PreferencesRepository {
  
  async crearPreferencias(preferenciasData) {
    const preferencias = new Preferencias(preferenciasData);
    return await preferencias.save();
  }

  async obtenerPreferenciasPorUsuarioId(usuario_id) {
    return await Preferencias.findOne({ usuario_id });
  }

  async actualizarPreferencias(usuario_id, updateData) {
    return await Preferencias.findOneAndUpdate(
      { usuario_id },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async agregarSupermercadoFavorito(usuario_id, tienda_id) {
    return await Preferencias.findOneAndUpdate(
      { usuario_id },
      { $addToSet: { supermercados_favoritos: tienda_id } },
      { new: true }
    );
  }

  async eliminarSupermercadoFavorito(usuario_id, tienda_id) {
    return await Preferencias.findOneAndUpdate(
      { usuario_id },
      { $pull: { supermercados_favoritos: tienda_id } },
      { new: true }
    );
  }

  async agregarCategoriaInteres(usuario_id, categoria) {
    return await Preferencias.findOneAndUpdate(
      { usuario_id },
      { $addToSet: { categorias_interes: categoria } },
      { new: true }
    );
  }

  async obtenerUsuariosPorCategoriaInteres(categoria) {
    return await Preferencias.find({ 
      categorias_interes: categoria 
    });
  }
}

export default new PreferencesRepository();