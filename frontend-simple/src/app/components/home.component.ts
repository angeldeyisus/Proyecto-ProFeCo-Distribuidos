import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Bienvenido a PROFECO</h1>
        <p>Sistema de Protección al Consumidor</p>
      </div>
      
      <div class="actions-section">
        <div class="action-card">
          <h2>¿Ya tienes cuenta?</h2>
          <p>Inicia sesión para acceder a tu panel</p>
          <button (click)="irALogin()" class="btn-primary">Iniciar Sesión</button>
        </div>
        
        <div class="action-card">
          <h2>¿Nuevo usuario?</h2>
          <p>Regístrate para comenzar a usar nuestros servicios</p>
          <button (click)="irARegistro()" class="btn-secondary">Registrarse</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .hero-section { text-align: center; margin-bottom: 3rem; }
    .hero-section h1 { color: #2c3e50; font-size: 2.5rem; margin-bottom: 1rem; }
    .hero-section p { color: #7f8c8d; font-size: 1.2rem; }
    .actions-section { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .action-card { 
      padding: 2rem; 
      border: 1px solid #e1e8ed; 
      border-radius: 12px; 
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .action-card h2 { color: #2c3e50; margin-bottom: 1rem; }
    .action-card p { color: #7f8c8d; margin-bottom: 1.5rem; }
    .btn-primary, .btn-secondary { 
      padding: 12px 30px; 
      border: none; 
      border-radius: 6px; 
      font-size: 1rem; 
      cursor: pointer; 
      transition: all 0.3s;
    }
    .btn-primary { background: #3498db; color: white; }
    .btn-primary:hover { background: #2980b9; }
    .btn-secondary { background: #2ecc71; color: white; }
    .btn-secondary:hover { background: #27ae60; }
    
    @media (max-width: 768px) {
      .actions-section { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  irALogin() {
    // Navegar al login - por ahora cambiamos el componente en app.ts
    window.location.href = '/login';
  }

  irARegistro() {
    // Navegar al registro
    window.location.href = '/register';
  }
}