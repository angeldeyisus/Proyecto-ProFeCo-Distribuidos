import { connectMongoDB } from "./product-service/src/config/database.js";

console.log("🔌 Conectando a MongoDB del product-service...");
await connectMongoDB();

import productRepository from './product-service/src/repositories/product.repository.js';
import priceRepository from './product-service/src/repositories/price.repository.js';
import { TiendaRepository } from './store-service/src/repositories/tienda.repository.js';
import { generateToken } from './auth-services/src/utils/jwt.js';
import bcrypt from 'bcryptjs';

const tiendaRepository = new TiendaRepository();

export class SeedService {
    constructor() {
        this.usuariosTiendaEjemplo = this.generarUsuariosTiendaEjemplo();
        this.tiendasEjemplo = this.generarTiendasEjemplo();
        this.productosEjemplo = this.generarProductosEjemplo();
    }

    generarUsuariosTiendaEjemplo() {
        return [
            {
                email: 'super.esperanza@profeco.com',
                password: 'password123',
                nombre: 'Juan Carlos Mendoza',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'mercado.central@profeco.com',
                password: 'password123',
                nombre: 'María Elena Ruiz',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'walmart.express@profeco.com',
                password: 'password123',
                nombre: 'Carlos Hernández',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'soriana.norte@profeco.com',
                password: 'password123',
                nombre: 'Ana García López',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'chedraui.selecto@profeco.com',
                password: 'password123',
                nombre: 'Roberto Silva',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'bodega.aurrera@profeco.com',
                password: 'password123',
                nombre: 'Laura Martínez',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'super.ama@profeco.com',
                password: 'password123',
                nombre: 'Diego Ramírez',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'city.market@profeco.com',
                password: 'password123',
                nombre: 'Sofia Castro',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'marketplace.mx@profeco.com',
                password: 'password123',
                nombre: 'Miguel Ángel Torres',
                tipo_usuario: 'TIENDA'
            },
            {
                email: 'super.save@profeco.com',
                password: 'password123',
                nombre: 'Elena Morales',
                tipo_usuario: 'TIENDA'
            }
        ];
    }

    generarTiendasEjemplo() {
        return [
            {
                nombre: 'Supermercado La Esperanza',
                direccion: 'Av. Revolución 123, Col. Centro, CDMX',
                logo_url: 'https://ejemplo.com/logos/super-esperanza.jpg',
                horario: 'L-D: 7:00-22:00',
                telefono: '555-123-4567',
                is_activa: true
            },
            {
                nombre: 'Mercado Central Guadalajara',
                direccion: 'Calz. Independencia 456, GDL',
                logo_url: 'https://ejemplo.com/logos/mercado-central.jpg',
                horario: 'L-S: 6:00-20:00, D: 6:00-14:00',
                telefono: '555-987-6543',
                is_activa: true
            },
            {
                nombre: 'Walmart Express',
                direccion: 'Plaza Comercial 789, Monterrey',
                logo_url: 'https://ejemplo.com/logos/walmart-express.jpg',
                horario: 'L-D: 8:00-21:00',
                telefono: '555-456-7890',
                is_activa: true
            },
            {
                nombre: 'Soriana Sucursal Norte',
                direccion: 'Av. Universidad 321, Puebla',
                logo_url: 'https://ejemplo.com/logos/soriana-norte.jpg',
                horario: 'L-D: 7:30-21:30',
                telefono: '555-654-3210',
                is_activa: true
            },
            {
                nombre: 'Chedraui Selecto',
                direccion: 'Blvd. Las Américas 654, Querétaro',
                logo_url: 'https://ejemplo.com/logos/chedraui-selecto.jpg',
                horario: 'L-D: 8:00-22:00',
                telefono: '555-321-0987',
                is_activa: true
            },
            {
                nombre: 'Bodega Aurrera',
                direccion: 'Av. Tecnológico 987, Toluca',
                logo_url: 'https://ejemplo.com/logos/bodega-aurrera.jpg',
                horario: 'L-D: 8:00-20:00',
                telefono: '555-111-2222',
                is_activa: true
            },
            {
                nombre: 'Superama Perisur',
                direccion: 'Periférico Sur 2456, CDMX',
                logo_url: 'https://ejemplo.com/logos/superama.jpg',
                horario: 'L-D: 7:00-23:00',
                telefono: '555-333-4444',
                is_activa: true
            },
            {
                nombre: 'City Market',
                direccion: 'Av. Patriotismo 789, CDMX',
                logo_url: 'https://ejemplo.com/logos/city-market.jpg',
                horario: 'L-D: 9:00-22:00',
                telefono: '555-555-6666',
                is_activa: true
            },
            {
                nombre: 'Marketplace México',
                direccion: 'Blvd. López Mateos 321, Guadalajara',
                logo_url: 'https://ejemplo.com/logos/marketplace.jpg',
                horario: 'L-S: 8:00-21:00',
                telefono: '555-777-8888',
                is_activa: true
            },
            {
                nombre: 'Super Save',
                direccion: 'Av. Hidalgo 654, Monterrey',
                logo_url: 'https://ejemplo.com/logos/super-save.jpg',
                horario: 'L-D: 6:30-21:30',
                telefono: '555-999-0000',
                is_activa: true
            }
        ];
    }

    generarProductosEjemplo() {
        return [
            // Lácteos y Huevos
            {
                nombre: 'Leche Entera Alpura 1L',
                descripcion: 'Leche entera pasteurizada',
                marca: 'Alpura',
                categoria_id: 'cat-lacteos',
                categoria_nombre: 'Lácteos y Huevos',
                upc: '7501006554012',
                sku: 'ALP-LECH-ENT-1L',
                imagen_url: 'https://ejemplo.com/productos/leche-alpura.jpg',
                unidad_medida: 'litro',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: false
                },
                tags: ['leche', 'lácteo', 'alpura', 'pasteurizado'],
                estado: 'activo'
            },
            {
                nombre: 'Huevo Blanco San Juan 30pzs',
                descripcion: 'Huevo blanco grado AA',
                marca: 'San Juan',
                categoria_id: 'cat-lacteos',
                categoria_nombre: 'Lácteos y Huevos',
                upc: '7501035912008',
                sku: 'SJ-HUE-BLA-30',
                imagen_url: 'https://ejemplo.com/productos/huevo-blanco.jpg',
                unidad_medida: 'pieza',
                contenido: 30,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['huevo', 'proteína', 'blanco', 'grado aa'],
                estado: 'activo'
            },
            {
                nombre: 'Queso Panela Oaxaca 500g',
                descripcion: 'Queso fresco tipo panela',
                marca: 'Oaxaca',
                categoria_id: 'cat-lacteos',
                categoria_nombre: 'Lácteos y Huevos',
                upc: '7501006554029',
                sku: 'OXA-QUE-PAN-500',
                imagen_url: 'https://ejemplo.com/productos/queso-panela.jpg',
                unidad_medida: 'gramo',
                contenido: 500,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: false
                },
                tags: ['queso', 'panela', 'fresco', 'oaxaca'],
                estado: 'activo'
            },
            {
                nombre: 'Yogurt Natural Danone 1Kg',
                descripcion: 'Yogurt natural sin azúcar',
                marca: 'Danone',
                categoria_id: 'cat-lacteos',
                categoria_nombre: 'Lácteos y Huevos',
                upc: '7501006554036',
                sku: 'DAN-YOG-NAT-1K',
                imagen_url: 'https://ejemplo.com/productos/yogurt-danone.jpg',
                unidad_medida: 'gramo',
                contenido: 1000,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: false
                },
                tags: ['yogurt', 'natural', 'danone', 'probiótico'],
                estado: 'activo'
            },
            {
                nombre: 'Mantequilla Lurpak 200g',
                descripcion: 'Mantequilla con sal',
                marca: 'Lurpak',
                categoria_id: 'cat-lacteos',
                categoria_nombre: 'Lácteos y Huevos',
                upc: '5700978035012',
                sku: 'LUR-MAN-SAL-200',
                imagen_url: 'https://ejemplo.com/productos/mantequilla-lurpak.jpg',
                unidad_medida: 'gramo',
                contenido: 200,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: false
                },
                tags: ['mantequilla', 'lurpak', 'salada', 'europea'],
                estado: 'activo'
            },

            // Frutas y Verduras
            {
                nombre: 'Manzana Red Delicious Kg',
                descripcion: 'Manzana roja importada',
                marca: 'Importada',
                categoria_id: 'cat-frutas',
                categoria_nombre: 'Frutas y Verduras',
                upc: '033383601111',
                sku: 'IMP-MAN-ROJ-1K',
                imagen_url: 'https://ejemplo.com/productos/manzana-roja.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['manzana', 'roja', 'fruta', 'importada'],
                estado: 'activo'
            },
            {
                nombre: 'Plátano Macho Pieza',
                descripcion: 'Plátano macho grande',
                marca: 'Nacional',
                categoria_id: 'cat-frutas',
                categoria_nombre: 'Frutas y Verduras',
                upc: '033383602222',
                sku: 'NAC-PLA-MAC-UN',
                imagen_url: 'https://ejemplo.com/productos/platano-macho.jpg',
                unidad_medida: 'pieza',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: true,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['plátano', 'macho', 'fruta', 'nacional'],
                estado: 'activo'
            },
            {
                nombre: 'Jitomate Bola Kg',
                descripcion: 'Jitomate bola fresco',
                marca: 'Nacional',
                categoria_id: 'cat-frutas',
                categoria_nombre: 'Frutas y Verduras',
                upc: '033383603333',
                sku: 'NAC-JIT-BOL-1K',
                imagen_url: 'https://ejemplo.com/productos/jitomate-bola.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: true,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['jitomate', 'bola', 'verdura', 'fresco'],
                estado: 'activo'
            },
            {
                nombre: 'Cebolla Blanca Kg',
                descripcion: 'Cebolla blanca nacional',
                marca: 'Nacional',
                categoria_id: 'cat-frutas',
                categoria_nombre: 'Frutas y Verduras',
                upc: '033383604444',
                sku: 'NAC-CEB-BLA-1K',
                imagen_url: 'https://ejemplo.com/productos/cebolla-blanca.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: true,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['cebolla', 'blanca', 'verdura', 'nacional'],
                estado: 'activo'
            },
            {
                nombre: 'Aguacate Hass Kg',
                descripcion: 'Aguacate hass premium',
                marca: 'Hass',
                categoria_id: 'cat-frutas',
                categoria_nombre: 'Frutas y Verduras',
                upc: '033383605555',
                sku: 'HAS-AGU-PRE-1K',
                imagen_url: 'https://ejemplo.com/productos/aguacate-hass.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: true,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['aguacate', 'hass', 'fruta', 'premium'],
                estado: 'activo'
            },

            // Carnes y Pescados
            {
                nombre: 'Pechuga de Pollo Kg',
                descripcion: 'Pechuga de pollo sin hueso ni piel',
                marca: 'Pollo Fresco',
                categoria_id: 'cat-carnes',
                categoria_nombre: 'Carnes y Pescados',
                upc: '7501006554043',
                sku: 'POL-PEC-SHP-1K',
                imagen_url: 'https://ejemplo.com/productos/pechuga-pollo.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['pollo', 'pechuga', 'proteína', 'carne'],
                estado: 'activo'
            },
            {
                nombre: 'Carne Molida Res 80/20 Kg',
                descripcion: 'Carne molida de res 80% magra',
                marca: 'Carnes Finas',
                categoria_id: 'cat-carnes',
                categoria_nombre: 'Carnes y Pescados',
                upc: '7501006554050',
                sku: 'CAR-MOL-RES-1K',
                imagen_url: 'https://ejemplo.com/productos/carne-molida.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['carne', 'molida', 'res', 'proteína'],
                estado: 'activo'
            },
            {
                nombre: 'Salmón Fresco Filete Kg',
                descripcion: 'Filete de salmón fresco',
                marca: 'Mariscos Premium',
                categoria_id: 'cat-carnes',
                categoria_nombre: 'Carnes y Pescados',
                upc: '7501006554067',
                sku: 'SAL-FIL-FRE-1K',
                imagen_url: 'https://ejemplo.com/productos/salmon-fresco.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['salmón', 'filete', 'pescado', 'omega3'],
                estado: 'activo'
            },

            // Abarrotes
            {
                nombre: 'Arroz SOS 1Kg',
                descripcion: 'Arroz grano largo',
                marca: 'SOS',
                categoria_id: 'cat-abarrotes',
                categoria_nombre: 'Abarrotes',
                upc: '7501006554074',
                sku: 'SOS-ARR-GRA-1K',
                imagen_url: 'https://ejemplo.com/productos/arroz-sos.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: false,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['arroz', 'grano', 'sos', 'abarrotes'],
                estado: 'activo'
            },
            {
                nombre: 'Frijol Negro 1Kg',
                descripcion: 'Frijol negro de primera',
                marca: 'La Costeña',
                categoria_id: 'cat-abarrotes',
                categoria_nombre: 'Abarrotes',
                upc: '7501006554081',
                sku: 'COS-FRI-NEG-1K',
                imagen_url: 'https://ejemplo.com/productos/frijol-negro.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: false,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['frijol', 'negro', 'legumbre', 'proteína'],
                estado: 'activo'
            },
            {
                nombre: 'Aceite Vegetal 1L',
                descripcion: 'Aceite vegetal para cocinar',
                marca: 'Capullo',
                categoria_id: 'cat-abarrotes',
                categoria_nombre: 'Abarrotes',
                upc: '7501006554098',
                sku: 'CAP-ACE-VEG-1L',
                imagen_url: 'https://ejemplo.com/productos/aceite-vegetal.jpg',
                unidad_medida: 'litro',
                contenido: 1,
                atributos: {
                    perecedero: false,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['aceite', 'vegetal', 'cocina', 'capullo'],
                estado: 'activo'
            },
            {
                nombre: 'Harina de Trigo 1Kg',
                descripcion: 'Harina de trigo para todo uso',
                marca: 'La Espiga',
                categoria_id: 'cat-abarrotes',
                categoria_nombre: 'Abarrotes',
                upc: '7501006554104',
                sku: 'ESP-HAR-TRI-1K',
                imagen_url: 'https://ejemplo.com/productos/harina-trigo.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: false,
                    organico: false,
                    gluten_free: false,
                    lactosa_free: true
                },
                tags: ['harina', 'trigo', 'hornear', 'espiga'],
                estado: 'activo'
            },
            {
                nombre: 'Azúcar Morena 1Kg',
                descripcion: 'Azúcar morena natural',
                marca: 'Zulka',
                categoria_id: 'cat-abarrotes',
                categoria_nombre: 'Abarrotes',
                upc: '7501006554111',
                sku: 'ZUL-AZU-MOR-1K',
                imagen_url: 'https://ejemplo.com/productos/azucar-morena.jpg',
                unidad_medida: 'kilogramo',
                contenido: 1,
                atributos: {
                    perecedero: false,
                    organico: true,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['azúcar', 'morena', 'endulzante', 'natural'],
                estado: 'activo'
            },

            // Bebidas
            {
                nombre: 'Coca-Cola 600ml',
                descripcion: 'Refresco de cola',
                marca: 'Coca-Cola',
                categoria_id: 'cat-bebidas',
                categoria_nombre: 'Bebidas',
                upc: '7501055301018',
                sku: 'COC-COL-600',
                imagen_url: 'https://ejemplo.com/productos/coca-cola.jpg',
                unidad_medida: 'mililitro',
                contenido: 600,
                atributos: {
                    perecedero: false,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['coca-cola', 'refresco', 'bebida', 'cola'],
                estado: 'activo'
            },
            {
                nombre: 'Agua Natural Bonafont 1L',
                descripcion: 'Agua purificada',
                marca: 'Bonafont',
                categoria_id: 'cat-bebidas',
                categoria_nombre: 'Bebidas',
                upc: '7501055301025',
                sku: 'BON-AGU-PUR-1L',
                imagen_url: 'https://ejemplo.com/productos/agua-bonafont.jpg',
                unidad_medida: 'litro',
                contenido: 1,
                atributos: {
                    perecedero: false,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['agua', 'purificada', 'bonafont', 'hidratación'],
                estado: 'activo'
            },
            {
                nombre: 'Jugo de Naranja Jumex 1L',
                descripcion: 'Jugo de naranja 100% natural',
                marca: 'Jumex',
                categoria_id: 'cat-bebidas',
                categoria_nombre: 'Bebidas',
                upc: '7501055301032',
                sku: 'JUM-JUG-NAR-1L',
                imagen_url: 'https://ejemplo.com/productos/jugo-naranja.jpg',
                unidad_medida: 'litro',
                contenido: 1,
                atributos: {
                    perecedero: true,
                    organico: false,
                    gluten_free: true,
                    lactosa_free: true
                },
                tags: ['jugo', 'naranja', 'jumex', 'natural'],
                estado: 'activo'
            }
        ];
    }

    generarPreciosEjemplo(tiendas, productos) {
        const precios = [];

        tiendas.forEach(tienda => {
            productos.forEach(producto => {
                // Precios base realistas en México (MXN)
                const preciosBase = {
                    'Leche Entera Alpura 1L': { min: 22, max: 28 },
                    'Huevo Blanco San Juan 30pzs': { min: 65, max: 85 },
                    'Queso Panela Oaxaca 500g': { min: 85, max: 120 },
                    'Yogurt Natural Danone 1Kg': { min: 45, max: 60 },
                    'Mantequilla Lurpak 200g': { min: 55, max: 70 },
                    'Manzana Red Delicious Kg': { min: 35, max: 50 },
                    'Plátano Macho Pieza': { min: 5, max: 8 },
                    'Jitomate Bola Kg': { min: 25, max: 40 },
                    'Cebolla Blanca Kg': { min: 18, max: 30 },
                    'Aguacate Hass Kg': { min: 80, max: 120 },
                    'Pechuga de Pollo Kg': { min: 110, max: 140 },
                    'Carne Molida Res 80/20 Kg': { min: 130, max: 160 },
                    'Salmón Fresco Filete Kg': { min: 250, max: 320 },
                    'Arroz SOS 1Kg': { min: 25, max: 35 },
                    'Frijol Negro 1Kg': { min: 35, max: 50 },
                    'Aceite Vegetal 1L': { min: 40, max: 55 },
                    'Harina de Trigo 1Kg': { min: 20, max: 30 },
                    'Azúcar Morena 1Kg': { min: 28, max: 40 },
                    'Coca-Cola 600ml': { min: 18, max: 25 },
                    'Agua Natural Bonafont 1L': { min: 12, max: 18 },
                    'Jugo de Naranja Jumex 1L': { min: 30, max: 45 }
                };

                const rango = preciosBase[producto.nombre] || { min: 10, max: 100 };
                const precio = Number((Math.random() * (rango.max - rango.min) + rango.min).toFixed(2));

                // 20% de probabilidad de estar en oferta
                const enOferta = Math.random() < 0.2;
                let precioData = {
                    producto_id: producto._id.toString(),
                    producto_nombre: producto.nombre,
                    tienda_id: tienda.tienda_id,
                    tienda_nombre: tienda.nombre,
                    precio: precio,
                    disponible: true,
                    fuente: 'sistema'
                };

                if (enOferta) {
                    const descuento = Number((Math.random() * 0.3 + 0.1).toFixed(2)); // 10-40% descuento
                    precioData.en_oferta = true;
                    precioData.precio_original = Number((precio / (1 - descuento)).toFixed(2));
                    precioData.precio_promocional = precio;
                    precioData.tipo_descuento = 'porcentaje';
                    precioData.valor_descuento = Math.round(descuento * 100);
                    precioData.vigencia_oferta = {
                        inicio: new Date(),
                        fin: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
                    };
                }

                precios.push(precioData);
            });
        });

        return precios;
    }

    async crearUsuarioTienda(usuarioData) {
        try {
            const { email, password, nombre, tipo_usuario } = usuarioData;

            // Verificar si el usuario ya existe
            const usuarioExistente = await tiendaRepository.prisma.usuario.findUnique({
                where: { email }
            });

            if (usuarioExistente) {
                console.log(`✅ Usuario ya existe: ${usuarioExistente.email}`);
                return usuarioExistente;
            }

            // Crear nuevo usuario
            const password_hash = await bcrypt.hash(password, 12);

            const usuario = await tiendaRepository.prisma.usuario.create({
                data: {
                    email,
                    password_hash,
                    nombre,
                    tipo_usuario,
                    is_verified: true,
                    is_active: true
                }
            });

            const token = generateToken({
                usuario_id: usuario.usuario_id,
                email: usuario.email,
                nombre: usuario.nombre,
                tipo_usuario: usuario.tipo_usuario
            });

            usuario.token = token;

            console.log(`✅ Usuario creado: ${usuario.email}`);
            return usuario;

        } catch (error) {
            console.error('❌ Error creando usuario:', error.message);
            throw error;
        }
    }

    async crearUsuariosYTiendasCompleto() {
        try {
            console.log('🚀 Iniciando seeding automático...');

            // 1. Verificar si ya existen datos
            const totalTiendas = await tiendaRepository.contarTiendas();
            const totalProductos = await productRepository.contarProductos;

            if (totalTiendas > 0 || totalProductos > 0) {
                console.log('✅ Ya existen datos en el sistema, omitiendo seeding');
                return {
                    usuarios: 0,
                    tiendas: totalTiendas,
                    productos: totalProductos,
                    precios: await priceRepository.contarPrecios(),
                    mensaje: 'Datos ya existentes'
                };
            }

            // 2. Crear usuarios TIENDA
            console.log('👥 Creando usuarios TIENDA...');
            const usuariosCreados = [];

            for (const usuarioData of this.usuariosTiendaEjemplo) {
                const usuario = await this.crearUsuarioTienda(usuarioData);
                usuariosCreados.push(usuario);
            }
            console.log(`✅ ${usuariosCreados.length} usuarios TIENDA creados/verificados`);

            // 3. Actualizar tiendasEjemplo con IDs reales de usuarios
            const tiendasConUsuariosReales = this.tiendasEjemplo.map((tienda, index) => ({
                ...tienda,
                usuario_id: usuariosCreados[index].usuario_id,
                nombre: `${usuariosCreados[index].nombre} - ${tienda.nombre}`
            }));

            // 4. Crear tiendas
            console.log('🏪 Creando tiendas...');
            for (const tiendaData of tiendasConUsuariosReales) {
                await tiendaRepository.crearTienda(tiendaData);
            }
            console.log(`✅ ${tiendasConUsuariosReales.length} tiendas creadas`);

            // 5. Crear productos en MongoDB
            console.log('📦 Creando productos en MongoDB...');
            const productosCreados = await productRepository.crearMultiplesProductos(this.productosEjemplo);
            console.log(`✅ ${productosCreados.length} productos creados`);

            // 6. Obtener tiendas y productos para crear precios
            console.log('📋 Obteniendo datos para precios...');
            const tiendas = await tiendaRepository.obtenerTiendas();
            const productos = await productRepository.obtenerProductos();

            // 7. Crear precios en MongoDB
            console.log('💰 Creando precios en MongoDB...');
            const precios = this.generarPreciosEjemplo(tiendas, productos);
            await precioRepository.crearMultiplesPrecios(precios);
            console.log(`✅ ${precios.length} precios creados`);

            console.log('🎉 Sistema de datos de prueba inicializado automáticamente!');

            return {
                usuarios: usuariosCreados.length,
                tiendas: tiendasConUsuariosReales.length,
                productos: productosCreados.length,
                precios: precios.length
            };

        } catch (error) {
            console.error('❌ Error en seeding automático:', error);
            throw error;
        }
    }

    async limpiarDatosPrueba() {
        try {
            console.log('🧹 Limpiando datos de prueba...');

            // Limpiar MongoDB
            await priceRepository.limpiarPrecios();
            await productRepository.limpiarProductos();

            console.log('✅ Datos de prueba limpiados (MongoDB)');
            console.log('⚠️  Para limpiar PostgreSQL, elimina manualmente las tiendas y usuarios de prueba');

        } catch (error) {
            console.error('❌ Error al limpiar datos:', error);
            throw error;
        }
    }
}