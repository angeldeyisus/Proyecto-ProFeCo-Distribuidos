import PerfilUsuario from '../models/perfilUsuario.model.js';

class ProfileRepository {
  
  async crearPerfil(perfilData) {
    const perfil = new PerfilUsuario(perfilData);
    return await perfil.save();
  }

  async obtenerPerfilPorUsuarioId(usuario_id) {
    return await PerfilUsuario.findOne({ usuario_id });
  }

  async actualizarPerfil(usuario_id, updateData) {
    return await PerfilUsuario.findOneAndUpdate(
      { usuario_id },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async actualizarDireccion(usuario_id, direccionData) {
    return await PerfilUsuario.findOneAndUpdate(
      { usuario_id },
      { $set: { direccion: direccionData } },
      { new: true, runValidators: true }
    );
  }

  async buscarPerfilesPorUbicacion(estado, municipio) {
    const criterios = {};
    if (estado) criterios['direccion.estado'] = estado;
    if (municipio) criterios['direccion.municipio'] = municipio;
    
    return await PerfilUsuario.find(criterios);
  }

  async eliminarPerfil(usuario_id) {
    return await PerfilUsuario.findOneAndDelete({ usuario_id });
  }
}

export default new ProfileRepository();