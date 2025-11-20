import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Usuario } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Registro - PROFECO</h2>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
        <div>
          <label>Email:</label>
          <input type="email" [(ngModel)]="usuario.email" name="email" required>
        </div>
        
        <div>
          <label>Contraseña:</label>
          <input type="password" [(ngModel)]="usuario.password" name="password" required>
        </div>
        
        <div>
          <label>Nombre:</label>
          <input type="text" [(ngModel)]="usuario.nombre" name="nombre" required>
        </div>
        
        <div>
          <label>Tipo de Usuario:</label>
          <select [(ngModel)]="usuario.tipo_usuario" name="tipo_usuario">
            <option value="CONSUMIDOR">Consumidor</option>
            <option value="VENDEDOR">Vendedor</option>
          </select>
        </div>
        
        <button type="submit" [disabled]="!registerForm.valid">Registrarse</button>
      </form>
      
      <div *ngIf="mensaje" class="mensaje">{{ mensaje }}</div>
    </div>
  `,
  styles: [`
    .register-container { max-width: 400px; margin: 20px auto; padding: 20px; }
    div { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input, select { width: 100%; padding: 8px; }
    button { padding: 10px 20px; }
    .mensaje { margin-top: 15px; padding: 10px; background: #f0f0f0; }
  `]
})
export class RegisterComponent {
  usuario: Usuario = {
    email: '',
    password: '',
    nombre: '',
    tipo_usuario: 'CONSUMIDOR'
  };
  
  mensaje: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.usuario).subscribe({
      next: (response) => {
        this.mensaje = '✅ Registro exitoso!';
        console.log('Registro exitoso:', response);
      },
      error: (error) => {
        this.mensaje = '❌ Error en el registro';
        console.error('Error en registro:', error);
      }
    });
  }
}