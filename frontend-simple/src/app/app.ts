import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HomeComponent } from './components/home.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { AuthService } from './services/auth.service';

type VistaActual = 'home' | 'login' | 'register' | 'dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  vistaActual: VistaActual = 'home';
  usuario: any = null;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Suscribirse a cambios en el estado de autenticación
    this.subscription.add(
      this.authService.usuarioActual$.subscribe(usuario => {
        this.usuario = usuario;
        
        if (usuario) {
          this.vistaActual = 'dashboard';
        } else {
          this.vistaActual = 'home';
        }
      })
    );
  }

  cambiarVista(vista: VistaActual) {
    this.vistaActual = vista;
  }

  logout() {
    this.authService.logout();
  }
}