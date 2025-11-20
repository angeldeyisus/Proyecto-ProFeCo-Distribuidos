import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h2>Iniciar Sesión - PROFECO</h2>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label>Email:</label>
          <input type="email" [(ngModel)]="credentials.email" name="email" required>
        </div>
        
        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" [(ngModel)]="credentials.password" name="password" required>
        </div>
        
        <button type="submit" [disabled]="!loginForm.valid" class="btn-primary">
          {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>
      
      <div *ngIf="mensaje" class="mensaje" [class.error]="isError">
        {{ mensaje }}
      </div>
    </div>
  `,
  styles: [`
    .auth-container { max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
    .btn-primary { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }
    .mensaje { margin-top: 15px; padding: 10px; border-radius: 4px; text-align: center; }
    .mensaje.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .mensaje:not(.error) { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
  `]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  mensaje: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.isLoading = true;
    this.mensaje = '';
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isError = false;
        this.mensaje = '✅ Login exitoso!';

        this.authService.establecerUsuarioLogueado(
          response.token, 
          response.usuario
        );
        
        console.log('Login exitoso:', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.mensaje = '❌ Error: ' + (error.error?.message || 'Credenciales incorrectas');
        console.error('Error en login:', error);
      }
    });
  }
}