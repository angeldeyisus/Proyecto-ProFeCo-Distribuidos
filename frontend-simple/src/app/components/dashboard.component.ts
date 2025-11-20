import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ✅ Agregar ChangeDetectorRef
import { CommonModule } from '@angular/common';

interface Producto {
  _id?: string;
  nombre: string;
  descripcion: string;
  marca: string;
  categoria_id: string;
  contenido: number;
  unidad_medida: string;
  estado?: string;
  atributos?: any;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2>Bienvenido, {{ usuario?.nombre }}! 👋</h2>
        <p class="user-email">{{ usuario?.email }} | {{ usuario?.tipo_usuario }}</p>
      </div>

      <!-- ✅ DEBUG SIMPLIFICADO -->
      <div *ngIf="debug" class="debug-info">
        <p><strong>Estado:</strong> {{ cargando ? 'Cargando...' : 'Listo' }}</p>
        <p><strong>Productos:</strong> {{ productos.length }}</p>
        <p><strong>Error:</strong> {{ error || 'No' }}</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Productos Disponibles</h3>
          <p class="stat-number">{{ productos.length }}</p>
        </div>
        <div class="stat-card">
          <h3>Tu Tipo</h3>
          <p class="stat-type">{{ usuario?.tipo_usuario }}</p>
        </div>
      </div>

      <div class="products-section">
        <div class="section-header">
          <h3>📦 Productos Disponibles ({{ productos.length }})</h3>
          <div>
            <button (click)="cargarProductos()" class="btn-refresh">
              🔄 Actualizar
            </button>
            <button (click)="toggleDebug()" class="btn-debug">
              {{ debug ? '❌ Debug' : '🐛 Debug' }}
            </button>
          </div>
        </div>

        <div *ngIf="cargando" class="loading">
          <p>🔄 Cargando productos desde MongoDB...</p>
        </div>

        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
        </div>

        <!-- ✅ MOSTRAR SI HAY PRODUCTOS -->
        <div *ngIf="!cargando && productos.length > 0" class="products-grid">
          <div *ngFor="let producto of productos; let i = index" class="product-card">
            <div class="product-header">
              <h4>{{ i + 1 }}. {{ producto.nombre }}</h4>
              <span class="product-marca">{{ producto.marca }}</span>
            </div>
            
            <p class="product-description">{{ producto.descripcion || 'Sin descripción' }}</p>
            
            <div class="product-details">
              <span class="product-category">📁 {{ producto.categoria_id }}</span>
              <span class="product-measure">📏 {{ producto.contenido }} {{ producto.unidad_medida }}</span>
            </div>

            <div class="product-footer">
              <span class="product-status" [class.active]="producto.estado === 'activo'">
                {{ producto.estado === 'activo' ? '✅ Activo' : '❌ Inactivo' }}
              </span>
            </div>
          </div>
        </div>

        <div *ngIf="!cargando && !error && productos.length === 0" class="no-products">
          <p>No hay productos disponibles.</p>
          <button (click)="cargarProductos()" class="btn-retry">🔄 Intentar de nuevo</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    
    .dashboard-header { 
      text-align: center; 
      margin-bottom: 2rem; 
      padding: 2rem; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
    }
    
    .debug-info {
      background: #fff3cd;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
    }
    
    .dashboard-stats { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 1rem; 
      margin-bottom: 2rem;
    }
    
    .stat-card { 
      padding: 1.5rem; 
      background: white; 
      border-radius: 8px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .products-section { 
      background: white; 
      padding: 2rem; 
      border-radius: 8px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .section-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 1.5rem;
    }
    
    .btn-refresh, .btn-retry, .btn-debug { 
      padding: 8px 16px; 
      margin-left: 0.5rem;
      color: white; 
      border: none; 
      border-radius: 4px; 
      cursor: pointer;
    }
    
    .btn-refresh { background: #3498db; }
    .btn-retry { background: #f39c12; }
    .btn-debug { background: #9b59b6; }
    
    .products-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 1.5rem; 
    }
    
    .product-card { 
      padding: 1.5rem; 
      border: 1px solid #e1e8ed; 
      border-radius: 8px; 
      transition: transform 0.2s;
    }
    
    .product-card:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .product-marca { 
      background: #e1f0fa; 
      padding: 4px 8px; 
      border-radius: 4px;
      color: #3498db;
      font-weight: bold;
    }
    
    /* ... resto de estilos igual ... */
  `]
})
export class DashboardComponent implements OnInit {
  usuario: any = null;
  productos: Producto[] = [];
  cargando: boolean = false;
  error: string = '';
  debug: boolean = true; // ✅ Debug visible por defecto

  constructor(private cdr: ChangeDetectorRef) {} // ✅ Inyectar ChangeDetectorRef

  ngOnInit() {
    console.log('🎯 DashboardComponent iniciado');
    
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      console.log('👤 Usuario cargado:', this.usuario);
    }
    
    this.cargarProductos();
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  async cargarProductos() {
    console.log('🚀 INICIANDO carga de productos...');
    this.cargando = true;
    this.error = '';
    this.productos = [];
    
    // ✅ Forzar detección de cambios inmediatamente
    this.cdr.detectChanges();
    
    try {
      console.log('📡 Haciendo fetch...');
      const response = await fetch('http://localhost:3002/api/products');
      
      console.log('✅ Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Data recibida, productos:', data.productos?.length);
      
      // ✅ ASIGNAR PRODUCTOS
      this.productos = data.productos || [];
      console.log('🎯 Productos asignados:', this.productos.length);
      
    } catch (error) {
      console.error('❌ Error:', error);
      
    } finally {
      this.cargando = false;
      console.log('🏁 Carga finalizada. Productos:', this.productos.length);
      
      // ✅ FORZAR DETECCIÓN DE CAMBIOS AL FINAL
      this.cdr.detectChanges();
      console.log('🔄 Detección de cambios forzada');
    }
  }
}