// auth-services/src/repositories/auth.repository.js

// DATOS DE PRUEBA EN MEMORIA
const usuariosMock = [];

export class AuthRepository {
  
  async encontrarUsuarioPorEmail(email) {
    console.log('🔍 Buscando usuario por email (MOCK):', email);
    // Simular delay de base de datos
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return usuariosMock.find(usuario => usuario.email === email) || null;
  }

  async encontrarUsuarioPorId(usuarioId) {
    console.log('🔍 Buscando usuario por ID (MOCK):', usuarioId);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return usuariosMock.find(usuario => usuario.usuario_id === usuarioId) || null;
  }

  async crearUsuario(usuarioData) {
    console.log('📝 Creando usuario (MOCK):', usuarioData.email);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const nuevoUsuario = {
      usuario_id: 'mock-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      email: usuarioData.email,
      password_hash: usuarioData.password_hash,
      nombre: usuarioData.nombre,
      tipo_usuario: usuarioData.tipo_usuario,
      telefono: usuarioData.telefono || null,
      estado: 'ACTIVO',
      created_at: new Date(),
      updated_at: new Date()
    };
    
    usuariosMock.push(nuevoUsuario);
    console.log('✅ Usuario creado (MOCK):', nuevoUsuario.usuario_id);
    console.log('📊 Total usuarios en mock:', usuariosMock.length);
    
    return nuevoUsuario;
  }

  async actualizarUsuario(usuarioId, datosActualizados) {
    console.log('✏️ Actualizando usuario (MOCK):', usuarioId);
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const index = usuariosMock.findIndex(u => u.usuario_id === usuarioId);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    
    usuariosMock[index] = {
      ...usuariosMock[index],
      ...datosActualizados,
      updated_at: new Date()
    };
    
    return usuariosMock[index];
  }

  // Método extra para debug
  obtenerTodosLosUsuarios() {
    return usuariosMock;
  }
}