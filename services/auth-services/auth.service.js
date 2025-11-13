import * as authRepository from '../auth.repository.js'

export class AuthService {
    /**
     * Regla de Negocio: Registrar un usuario
     * Valida que no exista uno duplicado
     */
    async registrarUsuario(datos){
        //1. Validacion de correo
        const usuarioExistente = await authRepository.encontrarUsuarioPorEmail(datos.email);
        if(usuarioExistente){
            throw new Error(`El correo ${datos.email} ya esta registrado en el sistema.`);
        }

        //2. Validacion de contraseña
        if(datos.password.length < 6){
            throw new Error("La contraseña debe tener almenos 6 caracteres.");
        }

        //3. Llamar a la Capa de Datos
        //NOTA para Chris y Angel del presente: Hashear la contraseña cuando la capa de seguridad esté creada
        const nuevoUsuario = await authRepository.crearUsuario(
            datos.email,
            datos.password,
            datos.nombre,
            datos.tipo_usuario
        );

        return nuevoUsuario;
    }

    /**
     * Regla de negocio: Login
     * Verifica credenciales
     */
    async login(email, password){
        const usuario = await authRepository.encontrarUsuarioPorEmail(email);
        if(!usuario){
            throw new Error("Usuario no encontrado");
        }

        if(usuario.password_hash != password){
            throw new Error("Coontraseña incorrecta.");
        }

        return {
            mensaje: "Acceso Concedido",
            usuario: {
                id: usuario.usuario_id,
                nombre: usuario.nombre,
                rol: usuario.tipo_usuario
            }
        };
    }
}