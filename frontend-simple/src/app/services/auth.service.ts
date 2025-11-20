import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Usuario {
  email: string;
  password: string;
  nombre: string;
  tipo_usuario: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: {
    usuario_id: string;
    email: string;
    nombre: string;
    tipo_usuario: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  private usuarioActual = new BehaviorSubject<any>(null);
  
  public usuarioActual$ = this.usuarioActual.asObservable();

  constructor(private http: HttpClient) {
    this.verificarUsuarioGuardado();
  }

  private verificarUsuarioGuardado() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioActual.next(JSON.parse(usuarioGuardado));
    }
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  establecerUsuarioLogueado(token: string, usuario: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioActual.next(usuario); 
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null); 
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuarioActual() {
    return this.usuarioActual.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}