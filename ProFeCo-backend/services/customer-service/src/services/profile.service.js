import profileRepository from '../repositories/profile.repository.js';

class ProfileService {
  
  async crearPerfil(perfilData) {
    try {
      const perfilExistente = await profileRepository.obtenerPerfilPorUsuarioId(perfilData.usuario_id);
      
      if (perfilExistente) {
        throw new Error('El usuario ya tiene un perfil creado');
      }

      this.validarPerfil(perfilData);

      return await profileRepository.crearPerfil(perfilData);
    } catch (error) {
      throw new Error(`Error creando perfil: ${error.message}`);
    }
  }

  async obtenerPerfil(usuario_id) {
    try {
      const perfil = await profileRepository.obtenerPerfilPorUsuarioId(usuario_id);
      
      if (!perfil) {
        throw new Error('Perfil no encontrado');
      }

      return perfil;
    } catch (error) {
      throw new Error(`Error obteniendo perfil: ${error.message}`);
    }
  }

  async actualizarPerfil(usuario_id, updateData) {
    try {
      await this.obtenerPerfil(usuario_id);

      if (updateData.telefono || updateData.direccion) {
        this.validarPerfil(updateData, true);
      }

      return await profileRepository.actualizarPerfil(usuario_id, updateData);
    } catch (error) {
      throw new Error(`Error actualizando perfil: ${error.message}`);
    }
  }

  async actualizarDireccion(usuario_id, direccionData) {
    try {
      await this.obtenerPerfil(usuario_id);

      this.validarDireccion(direccionData);

      return await profileRepository.actualizarDireccion(usuario_id, direccionData);
    } catch (error) {
      throw new Error(`Error actualizando dirección: ${error.message}`);
    }
  }

  validarPerfil(perfilData, esActualizacion = false) {
    const { telefono, fecha_nacimiento } = perfilData;

    if (!esActualizacion || telefono !== undefined) {
      if (telefono && telefono.length < 10) {
        throw new Error('El teléfono debe tener al menos 10 caracteres');
      }
    }

    if (!esActualizacion || fecha_nacimiento !== undefined) {
      if (fecha_nacimiento) {
        const fechaNac = new Date(fecha_nacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        
        if (edad < 13) {
          throw new Error('Debes tener al menos 13 años');
        }
        
        if (fechaNac > hoy) {
          throw new Error('La fecha de nacimiento no puede ser futura');
        }
      }
    }
  }

  validarDireccion(direccionData) {
    const { calle, numero_exterior, colonia, municipio, estado, codigo_postal } = direccionData;

    if (calle && calle.length < 3) {
      throw new Error('La calle debe tener al menos 3 caracteres');
    }

    if (codigo_postal && !/^\d{5}$/.test(codigo_postal)) {
      throw new Error('El código postal debe tener 5 dígitos');
    }

    if (estado && estado.length < 3) {
      throw new Error('El estado debe tener al menos 3 caracteres');
    }
  }
}

export default new ProfileService();