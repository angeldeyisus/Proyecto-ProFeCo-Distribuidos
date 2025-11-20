import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';


// ✅ Interface que coincide con TU modelo actual
export interface Producto {
  _id?: string;
  nombre: string;
  descripcion: string;
  marca: string;
  categoria_id: string;
  upc?: string;
  imagen_url?: string;
  unidad_medida: string;
  contenido: number;
  estado?: string;
  atributos?: {
    perecedero: boolean;
    organico: boolean;
    gluten_free: boolean;
    lactosa_free: boolean;
  };
}

interface ProductosResponse {
  productos: Producto[];
  paginacion: {
    limite: number;
    pagina: number;
    paginas: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002/api/products';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
    return headers;
  }

  obtenerProductos(): Observable<Producto[]> {
    const headers = this.getHeaders();
    
    console.log('🔄 Haciendo request a:', `${this.apiUrl}`);
    
    return this.http.get<any>(`${this.apiUrl}`, { headers })
      .pipe(
        timeout(10000), // ✅ Timeout de 10 segundos
        map(response => {
          console.log('✅ Respuesta completa del API:', response);
          
          // ✅ Asegurarnos de extraer el array de productos
          const productos = response.productos || response || [];
          console.log('✅ Productos extraídos:', productos);
          
          return productos;
        }),
        catchError(error => {
          console.error('❌ Error en ProductService:', error);
          throw error;
        })
      );
  }
}