import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ProFeCo Frontend';
  
  // Estados de la aplicación
  usuarioLogueado = false;
  modo: 'login' | 'registro' = 'login';
  mensaje = '';
  esError = false;
  
  // Datos para login
  loginData = {
    email: 'test@test.com',
    password: '123456'
  };
  
  // Datos para registro
  registroData = {
    nombre: 'Nuevo Usuario',
    email: 'nuevo@test.com',
    password: '123456',
    tipo_usuario: 'CONSUMIDOR',
    telefono: ''
  };

  // Datos del usuario
  usuarioActual: any = null;
  productos: any[] = [];

  // Control de servicios
  serviciosActivos = false;

  constructor(private http: HttpClient) {
    this.verificarServicios();
  }

  // Verificar servicios
  verificarServicios() {
    this.http.get('http://localhost:3001/health').subscribe({
      next: () => {
        this.serviciosActivos = true;
        this.mostrarMensaje('✅ Servicios backend conectados', false);
      },
      error: () => {
        this.serviciosActivos = false;
        this.mostrarMensaje('⚠️ Modo demo - Servicios no disponibles', true);
      }
    });
  }

  // 🔐 MÉTODOS DE AUTENTICACIÓN
  login() {
    if (this.serviciosActivos) {
      // Login con servicio real
      this.http.post('http://localhost:3001/api/auth/login', this.loginData)
        .subscribe({
          next: (res: any) => this.procesarLoginExitoso(res),
          error: (err) => this.procesarErrorLogin(err)
        });
    } else {
      // Login mock
      this.loginMock();
    }
  }

  registro() {
    if (this.serviciosActivos) {
      // Registro con servicio real
      this.http.post('http://localhost:3001/api/auth/register', this.registroData)
        .subscribe({
          next: (res: any) => this.procesarRegistroExitoso(res),
          error: (err) => this.procesarErrorRegistro(err)
        });
    } else {
      // Registro mock
      this.registroMock();
    }
  }

  // ✅ Procesar login exitoso
  procesarLoginExitoso(res: any) {
    this.usuarioLogueado = true;
    this.usuarioActual = res.usuario;
    this.mostrarMensaje('✅ ¡Login exitoso! Bienvenido a ProFeCo', false);
    this.cargarProductos();
  }

  // ✅ Procesar registro exitoso
  procesarRegistroExitoso(res: any) {
    this.mostrarMensaje('✅ ¡Registro exitoso! Ahora puedes iniciar sesión', false);
    this.modo = 'login';
    // Pre-llenar el login con los datos del registro
    this.loginData.email = this.registroData.email;
    this.loginData.password = this.registroData.password;
  }

  // ❌ Procesar errores
  procesarErrorLogin(err: any) {
    this.mostrarMensaje('❌ Error: ' + (err.error?.error || 'Credenciales incorrectas'), true);
  }

  procesarErrorRegistro(err: any) {
    this.mostrarMensaje('❌ Error: ' + (err.error?.error || 'Error en el registro'), true);
  }

  // 🔄 MÉTODOS MOCK (fallback)
  loginMock() {
    if (this.loginData.email && this.loginData.password) {
      this.usuarioLogueado = true;
      this.usuarioActual = {
        nombre: this.loginData.email.split('@')[0],
        tipo_usuario: 'CONSUMIDOR'
      };
      this.mostrarMensaje('✅ Login exitoso (Modo Demo)', false);
      this.cargarProductosMock();
    } else {
      this.mostrarMensaje('❌ Ingresa email y password', true);
    }
  }

  registroMock() {
    if (this.registroData.nombre && this.registroData.email && this.registroData.password) {
      this.mostrarMensaje('✅ Usuario registrado (Modo Demo)', false);
      this.modo = 'login';
      this.loginData.email = this.registroData.email;
      this.loginData.password = this.registroData.password;
    } else {
      this.mostrarMensaje('❌ Completa todos los campos', true);
    }
  }

  // 🛍️ MÉTODOS DE PRODUCTOS
  cargarProductos() {
    if (this.serviciosActivos) {
      this.http.get('http://localhost:3002/api/products')
        .subscribe({
          next: (res: any) => this.procesarProductos(res),
          error: (err) => this.cargarProductosMock()
        });
    } else {
      this.cargarProductosMock();
    }
  }

  procesarProductos(res: any) {
    this.productos = res.productos || res || this.getProductosMock();
    this.mostrarMensaje(`📦 ${this.productos.length} productos cargados`, false);
  }

  cargarProductosMock() {
    this.productos = this.getProductosMock();
    this.mostrarMensaje(`📦 ${this.productos.length} productos de demostración`, false);
  }

  getProductosMock() {
    return [
      { 
        nombre: 'Leche Deslactosada Lala 1L', 
        marca: 'Lala', 
        descripcion: 'Leche deslactosada ultrapasteurizada', 
        contenido: 1, 
        unidad_medida: 'litro',
        precio: 25.50 
      },
      { 
        nombre: 'Pan Bimbo Integral Grande', 
        marca: 'Bimbo', 
        descripcion: 'Pan de caja integral', 
        contenido: 1, 
        unidad_medida: 'pieza',
        precio: 38.90 
      },
      { 
        nombre: 'Arroz SOS 1kg', 
        marca: 'SOS', 
        descripcion: 'Arroz grano largo', 
        contenido: 1, 
        unidad_medida: 'kg',
        precio: 28.75 
      },
      { 
        nombre: 'Jabón Zote', 
        marca: 'Zote', 
        descripcion: 'Jabón de lavandería', 
        contenido: 1, 
        unidad_medida: 'pieza',
        precio: 15.00 
      }
    ];
  }

  // 🎯 MÉTODOS AUXILIARES
  logout() {
    this.usuarioLogueado = false;
    this.usuarioActual = null;
    this.productos = [];
    this.mostrarMensaje('👋 Sesión cerrada', false);
  }

  cambiarModo(nuevoModo: 'login' | 'registro') {
    this.modo = nuevoModo;
    this.mensaje = '';
  }

  mostrarMensaje(texto: string, error: boolean) {
    this.mensaje = texto;
    this.esError = error;
    setTimeout(() => this.mensaje = '', 5000);
  }
}