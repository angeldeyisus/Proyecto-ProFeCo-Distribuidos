import profileService from '../services/profile.service.js';

class ProfileController {

  async crearPerfil(req, res) {
    try {
      const perfilData = {
        ...req.body,
        usuario_id: req.user.usuario_id 
      };

      const perfil = await profileService.crearPerfil(perfilData);
      
      res.status(201).json({
        success: true,
        message: 'Perfil creado exitosamente',
        data: perfil
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerPerfil(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const perfil = await profileService.obtenerPerfil(usuario_id);
      
      res.json({
        success: true,
        data: perfil
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarPerfil(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const updateData = req.body;

      const perfil = await profileService.actualizarPerfil(usuario_id, updateData);
      
      res.json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: perfil
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarDireccion(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const direccionData = req.body;

      const perfil = await profileService.actualizarDireccion(usuario_id, direccionData);
      
      res.json({
        success: true,
        message: 'Dirección actualizada exitosamente',
        data: perfil
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

}

export default ProfileController;