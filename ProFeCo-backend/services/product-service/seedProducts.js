// seedProducts.js
import mongoose from 'mongoose';

// --- CONFIGURACIÓN ---
// Asegúrate de que apunte a tu base de datos de PRODUCTOS en Mongo
const MONGO_URI = 'mongodb://localhost:27017/profeco_inventario';

// --- TU ESQUEMA (Copiado exactamente como lo mandaste) ---
const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    marca: { type: String, trim: true },
    categoria_id: { type: String, required: true },
    categoria_nombre: { type: String, trim: true },
    upc: { type: String, unique: true, sparse: true },
    sku: { type: String, unique: true, sparse: true },
    imagen_url: { type: String },
    unidad_medida: { type: String, required: true }, // "kg", "litro", "pieza", "paquete", "ml", "g"
    contenido: { type: Number, required: true },
    estado: { 
        type: String, 
        enum: ['activo', 'inactivo', 'descontinuado'], 
        default: 'activo' 
    },
    atributos: {
        perecedero: { type: Boolean, default: false },
        organico: { type: Boolean, default: false },
        gluten_free: { type: Boolean, default: false },
        lactosa_free: { type: Boolean, default: false }
    },
    tags: [{ type: String, trim: true }],
    metadata: {
        tipo: String,
        peso_unitario: Number,
        volumen: Number
    }
}, {
    timestamps: true
});

// Definir índices (tal cual tu modelo)
productoSchema.index({ nombre: "text", descripcion: "text" });
productoSchema.index({ categoria_id: 1 });
productoSchema.index({ marca: 1 });
productoSchema.index({ upc: 1 });
productoSchema.index({ sku: 1 });
productoSchema.index({ estado: 1 });
productoSchema.index({ "atributos.organico": 1 });
productoSchema.index({ tags: 1 });

const Producto = mongoose.model("productos", productoSchema);

// --- DATOS DE PRUEBA ADAPTADOS ---
const productosSeed = [
  // BEBIDAS
  {
    nombre: "Coca-Cola Original",
    descripcion: "Refresco de cola carbonatado con azúcar",
    marca: "Coca-Cola",
    categoria_id: "CAT_BEBIDAS",
    categoria_nombre: "Bebidas",
    sku: "BEB-001",
    upc: "7501055300075",
    contenido: 600,
    unidad_medida: "ml",
    imagen_url: "https://placehold.co/400x400/red/white?text=Coca+Cola+600ml",
    tags: ["refresco", "soda", "cola", "azucar"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Agua Purificada Ciel",
    descripcion: "Agua natural purificada sin sodio",
    marca: "Ciel",
    categoria_id: "CAT_BEBIDAS",
    categoria_nombre: "Bebidas",
    sku: "BEB-002",
    upc: "7501055311111",
    contenido: 1,
    unidad_medida: "litro",
    imagen_url: "https://placehold.co/400x400/blue/white?text=Agua+Ciel+1L",
    tags: ["agua", "natural", "hidratacion"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Jugo de Naranja",
    descripcion: "Jugo 100% de naranja con pulpa",
    marca: "Del Valle",
    categoria_id: "CAT_BEBIDAS",
    categoria_nombre: "Bebidas",
    sku: "BEB-003",
    upc: "7501055322222",
    contenido: 1,
    unidad_medida: "litro",
    imagen_url: "https://placehold.co/400x400/orange/white?text=Jugo+Del+Valle",
    tags: ["jugo", "fruta", "desayuno"],
    atributos: { perecedero: true }
  },
  
  // LACTEOS Y HUEVO
  {
    nombre: "Leche Entera Pasteurizada",
    descripcion: "Leche entera de vaca pasteurizada",
    marca: "Lala",
    categoria_id: "CAT_LACTEOS",
    categoria_nombre: "Lácteos",
    sku: "LAC-001",
    upc: "7501020542312",
    contenido: 1,
    unidad_medida: "litro",
    imagen_url: "https://placehold.co/400x400/white/blue?text=Leche+Lala",
    tags: ["leche", "entera", "calcio"],
    atributos: { perecedero: true, lactosa_free: false }
  },
  {
    nombre: "Leche Deslactosada",
    descripcion: "Leche de vaca deslactosada light",
    marca: "Alpura",
    categoria_id: "CAT_LACTEOS",
    categoria_nombre: "Lácteos",
    sku: "LAC-002",
    upc: "7501020542333",
    contenido: 1,
    unidad_medida: "litro",
    imagen_url: "https://placehold.co/400x400/white/purple?text=Leche+Alpura",
    tags: ["leche", "deslactosada", "light"],
    atributos: { perecedero: true, lactosa_free: true }
  },
  {
    nombre: "Huevo Blanco (Paquete)",
    descripcion: "Huevo blanco fresco seleccionado",
    marca: "San Juan",
    categoria_id: "CAT_HUEVO",
    categoria_nombre: "Huevo",
    sku: "HUE-001",
    upc: "7502223334445",
    contenido: 12,
    unidad_medida: "pieza",
    imagen_url: "https://placehold.co/400x400/yellow/black?text=Huevo+San+Juan",
    tags: ["huevo", "desayuno", "proteina"],
    atributos: { perecedero: true, gluten_free: true }
  },
  {
    nombre: "Yoghurt Natural",
    descripcion: "Yoghurt batido natural sin azúcar añadido",
    marca: "Yoplait",
    categoria_id: "CAT_LACTEOS",
    categoria_nombre: "Lácteos",
    sku: "LAC-004",
    upc: "7501020545555",
    contenido: 1,
    unidad_medida: "kg",
    imagen_url: "https://placehold.co/400x400/pink/white?text=Yoghurt+Yoplait",
    tags: ["yoghurt", "natural", "probioticos"],
    atributos: { perecedero: true }
  },

  // DESPENSA BÁSICA
  {
    nombre: "Pan Blanco Grande",
    descripcion: "Pan de caja blanco suave",
    marca: "Bimbo",
    categoria_id: "CAT_PANADERIA",
    categoria_nombre: "Panadería",
    sku: "PAN-001",
    upc: "7501000111222",
    contenido: 680,
    unidad_medida: "g", // Adaptado para que sea lógico
    imagen_url: "https://placehold.co/400x400/white/blue?text=Pan+Bimbo",
    tags: ["pan", "sandwich", "blanco"],
    atributos: { perecedero: true }
  },
  {
    nombre: "Tortillinas (Harina)",
    descripcion: "Tortillas de harina de trigo",
    marca: "Tía Rosa",
    categoria_id: "CAT_PANADERIA",
    categoria_nombre: "Panadería",
    sku: "PAN-002",
    upc: "7501000111333",
    contenido: 12,
    unidad_medida: "pieza",
    imagen_url: "https://placehold.co/400x400/yellow/red?text=Tortillinas",
    tags: ["tortillas", "harina", "quesadillas"],
    atributos: { perecedero: true }
  },
  {
    nombre: "Arroz Super Extra",
    descripcion: "Arroz blanco de grano largo",
    marca: "Verde Valle",
    categoria_id: "CAT_GRANOS",
    categoria_nombre: "Granos y Semillas",
    sku: "GRA-001",
    upc: "7503000444111",
    contenido: 1,
    unidad_medida: "kg",
    imagen_url: "https://placehold.co/400x400/green/white?text=Arroz+Verde+Valle",
    tags: ["arroz", "granos", "comida"],
    atributos: { perecedero: false, gluten_free: true }
  },
  {
    nombre: "Frijol Negro",
    descripcion: "Frijol negro limpio y seleccionado",
    marca: "La Sierra",
    categoria_id: "CAT_GRANOS",
    categoria_nombre: "Granos y Semillas",
    sku: "GRA-002",
    upc: "7503000444222",
    contenido: 1,
    unidad_medida: "kg",
    imagen_url: "https://placehold.co/400x400/black/white?text=Frijol+Negro",
    tags: ["frijol", "leguminosas", "hierro"],
    atributos: { perecedero: false, gluten_free: true }
  },
  {
    nombre: "Aceite Vegetal",
    descripcion: "Aceite comestible puro de canola",
    marca: "1-2-3",
    categoria_id: "CAT_ACEITES",
    categoria_nombre: "Aceites y Grasas",
    sku: "ACE-001",
    upc: "7504000555111",
    contenido: 1,
    unidad_medida: "litro",
    imagen_url: "https://placehold.co/400x400/yellow/red?text=Aceite+123",
    tags: ["aceite", "cocina", "freir"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Atún en Agua",
    descripcion: "Lomo de atún aleta amarilla en agua",
    marca: "Dolores",
    categoria_id: "CAT_ENLATADOS",
    categoria_nombre: "Enlatados",
    sku: "LAT-001",
    upc: "7505000666111",
    contenido: 140,
    unidad_medida: "g",
    imagen_url: "https://placehold.co/400x400/blue/yellow?text=Atun+Dolores",
    tags: ["atun", "pescado", "proteina", "lata"],
    atributos: { perecedero: false, gluten_free: true }
  },
  {
    nombre: "Pasta para Sopa (Fideo)",
    descripcion: "Pasta de sémola de trigo duro",
    marca: "La Moderna",
    categoria_id: "CAT_PASTAS",
    categoria_nombre: "Pastas",
    sku: "PAS-001",
    upc: "7506000777111",
    contenido: 200,
    unidad_medida: "g",
    imagen_url: "https://placehold.co/400x400/yellow/green?text=Fideo+La+Moderna",
    tags: ["pasta", "sopa", "fideo"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Azúcar Estándar",
    descripcion: "Azúcar de caña estándar",
    marca: "Zulka",
    categoria_id: "CAT_AZUCARES",
    categoria_nombre: "Azúcares",
    sku: "AZU-001",
    upc: "7507000888111",
    contenido: 1,
    unidad_medida: "kg",
    imagen_url: "https://placehold.co/400x400/white/black?text=Azucar+Zulka",
    tags: ["azucar", "postres", "dulce"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Café Soluble Clásico",
    descripcion: "Café 100% puro soluble",
    marca: "Nescafé",
    categoria_id: "CAT_CAFE",
    categoria_nombre: "Café y Té",
    sku: "CAF-001",
    upc: "7508000999111",
    contenido: 120,
    unidad_medida: "g",
    imagen_url: "https://placehold.co/400x400/brown/white?text=Nescafe+Clasico",
    tags: ["cafe", "mañana", "bebida caliente"],
    atributos: { perecedero: false }
  },

  // LIMPIEZA
  {
    nombre: "Detergente en Polvo",
    descripcion: "Detergente biodegradable para ropa",
    marca: "Ace",
    categoria_id: "CAT_LIMPIEZA",
    categoria_nombre: "Limpieza del Hogar",
    sku: "LIM-001",
    upc: "7509000000111",
    contenido: 1,
    unidad_medida: "kg",
    imagen_url: "https://placehold.co/400x400/blue/white?text=Detergente+Ace",
    tags: ["detergente", "ropa", "lavado"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Jabón de Tocador",
    descripcion: "Jabón de tocador neutro",
    marca: "Zest",
    categoria_id: "CAT_HIGIENE",
    categoria_nombre: "Higiene Personal",
    sku: "LIM-002",
    upc: "7509000000222",
    contenido: 150,
    unidad_medida: "g",
    imagen_url: "https://placehold.co/400x400/green/white?text=Jabon+Zest",
    tags: ["jabon", "baño", "limpieza"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Papel Higiénico (4 Rollos)",
    descripcion: "Papel higiénico hoja doble",
    marca: "Pétalo",
    categoria_id: "CAT_HIGIENE",
    categoria_nombre: "Higiene Personal",
    sku: "LIM-003",
    upc: "7509000000333",
    contenido: 4,
    unidad_medida: "pieza", // o paquete
    imagen_url: "https://placehold.co/400x400/pink/white?text=Papel+Petalo",
    tags: ["papel", "baño", "higiene"],
    atributos: { perecedero: false }
  },
  {
    nombre: "Cloro",
    descripcion: "Blanqueador desinfectante",
    marca: "Cloralex",
    categoria_id: "CAT_LIMPIEZA",
    categoria_nombre: "Limpieza del Hogar",
    sku: "LIM-004",
    upc: "7509000000444",
    contenido: 950,
    unidad_medida: "ml",
    imagen_url: "https://placehold.co/400x400/green/white?text=Cloralex",
    tags: ["cloro", "desinfectante", "limpieza"],
    atributos: { perecedero: false }
  }
];

// --- FUNCIÓN PRINCIPAL ---
const seedDB = async () => {
  try {
    console.log('🌱 Conectando a MongoDB (Productos)...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado.');

    console.log('🧹 Limpiando colección de productos anterior...');
    await Producto.deleteMany({});
    console.log('✅ Colección limpia.');

    console.log(`📦 Insertando ${productosSeed.length} productos...`);
    const result = await Producto.insertMany(productosSeed);
    
    console.log(`✨ ¡${result.length} productos insertados exitosamente!`);
    console.log('🔌 Cerrando conexión...');
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error en el script de seed:', error);
    process.exit(1);
  }
};

// EJECUTAR
seedDB();