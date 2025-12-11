import { connectMongoDB } from '../config/database.js';
import Producto from '../models/producto.model.js';

const productosEjemplo = [
  {
    nombre: "Leche Deslactosada Lala 1L",
    descripcion: "Leche deslactosada ultrapasteurizada",
    marca: "Lala",
    categoria_id: "categoria-lacteos",
    upc: "7501031311301",
    imagen_url: "/images/leche-lala.jpg",
    unidad_medida: "litro",
    contenido: 1,
    atributos: {
      perecedero: true,
      lactosa_free: true
    }
  },
  {
    nombre: "Pan Bimbo Integral Grande",
    descripcion: "Pan de caja integral",
    marca: "Bimbo",
    categoria_id: "categoria-pan",
    upc: "7501031311302",
    imagen_url: "/images/pan-bimbo.jpg",
    unidad_medida: "pieza",
    contenido: 1,
    atributos: {
      perecedero: true,
      organico: false
    }
  },
  {
    nombre: "Arroz SOS 1kg",
    descripcion: "Arroz grano largo",
    marca: "SOS",
    categoria_id: "categoria-granos",
    upc: "7501031311303",
    imagen_url: "/images/arroz-sos.jpg",
    unidad_medida: "kg",
    contenido: 1,
    atributos: {
      perecedero: false,
      gluten_free: true
    }
  },
  {
    nombre: "Jabón Zote",
    descripcion: "Jabón de lavandería",
    marca: "Zote",
    categoria_id: "categoria-limpieza",
    upc: "7501031311304",
    imagen_url: "/images/jabon-zote.jpg",
    unidad_medida: "pieza",
    contenido: 1,
    atributos: {
      perecedero: false
    }
  },
  {
    nombre: "Coca-Cola 600ml",
    descripcion: "Refresco de cola",
    marca: "Coca-Cola",
    categoria_id: "categoria-bebidas",
    upc: "7501031311305",
    imagen_url: "/images/coca-cola.jpg",
    unidad_medida: "ml",
    contenido: 600,
    atributos: {
      perecedero: false
    }
  }
];

async function seedDatabase() {
  try {
    await connectMongoDB();
    
    // Limpiar colección existente
    await Producto.deleteMany({});
    console.log('🧹 Colección limpiada');
    
    // Insertar productos de ejemplo
    await Producto.insertMany(productosEjemplo);
    console.log('✅ Productos de ejemplo insertados:', productosEjemplo.length);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
}

seedDatabase();