import axios from 'axios';

// URL base de tu servidor unificado
const BASE_URL = 'http://localhost:3000/api';

const uniqueId = Date.now();

const testUsers = {
    consumidor: {
        nombre: "Juan Consumidor",
        email: `juan.consumidor.${uniqueId}@test.com`,
        password: "passwordSeguro123",
        tipo_usuario: "CONSUMIDOR"
    },
    tienda: {
        nombre: "Supermercado El Ahorro",
        email: `dueno.tienda.${uniqueId}@test.com`,
        password: "passwordSeguro123",
        tipo_usuario: "TIENDA"
    },
    profeco: {
        nombre: "Agente Oficial",
        email: `agente.profeco.${uniqueId}@test.com`,
        password: "passwordSeguro123",
        tipo_usuario: "PROFECO"
    }
};

const productoPrueba = {
    sku: `SKU-${uniqueId}`,
    nombre: `Refresco de Cola ${uniqueId}`,
    descripcion: "Bebida carbonatada de 600ml, retornable",
    categoria_id: "60d5ecb8b392d70015c57c3a", // ID simulado válido de Mongo
    categoria: "Bebidas",
    marca: "La Marca Refrescante",
    unidad_medida: "pieza",
    contenido: 600,
    precio_normal: 20.00, // Referencia
    imagen_url: "https://example.com/refresco.png"
};

async function runSystemTest() {
    console.log('🧪 INICIANDO TEST INTEGRAL PROFECO (Auth -> Producto -> Precio/Oferta)...\n');

    let tokenTienda = '';
    let productoIdCreado = '';

    try {
        // --- 1. REGISTRO ---
        console.log('--- 1. Registro de Usuarios ---');
        try { await axios.post(`${BASE_URL}/auth/register`, testUsers.consumidor); } catch(e){}
        try { await axios.post(`${BASE_URL}/auth/register`, testUsers.profeco); } catch(e){}
        try { 
            await axios.post(`${BASE_URL}/auth/register`, testUsers.tienda); 
            console.log('✅ Usuarios registrados.');
        } catch(e){}

        // --- 2. LOGIN ---
        console.log('\n--- 2. Login Tienda ---');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: testUsers.tienda.email,
            password: testUsers.tienda.password
        });
        tokenTienda = loginResponse.data.data.token;
        console.log('✅ Login exitoso. Token obtenido.');

        // --- 3. CREAR PRODUCTO ---
        console.log('\n--- 3. Crear Producto (Catálogo) ---');
        const config = { headers: { Authorization: `Bearer ${tokenTienda}` } };
        
        const prodResponse = await axios.post(`${BASE_URL}/products`, productoPrueba, config);
        // Ajustamos para tomar el ID correctamente según la respuesta de tu backend
        const productoData = prodResponse.data.data || prodResponse.data;
        productoIdCreado = productoData._id;
        
        console.log(`✅ Producto creado ID: ${productoIdCreado}`);

        // --- 4. ASIGNAR PRECIO (NUEVO) ---
        console.log('\n--- 4. Asignar Precio Inicial (Normal) ---');
        const precioInicial = {
            producto_id: productoIdCreado,
            precio: 20.00, // Precio normal
            en_oferta: false
        };

        // CORREGIDO: Usamos la raíz '/' porque en priceRoutes.js definiste router.post('/', ...)
        const precioResp = await axios.post(`${BASE_URL}/prices/`, precioInicial, config);
        console.log('✅ Precio asignado correctamente.');
        console.log(`   💰 Precio Actual: $${precioResp.data.data.precio}`);
        console.log(`   🏪 Tienda: ${precioResp.data.data.tienda_nombre}`);

        // --- 5. ACTUALIZAR A OFERTA (EL GIRO DE TUERCA) ---
        console.log('\n--- 5. Publicar Oferta (Simulación) ---');
        // El producto baja de precio
        const precioOferta = {
            producto_id: productoIdCreado,
            precio: 20.00, // El precio base sigue siendo 20
            en_oferta: true,
            precio_promocional: 15.00, // ¡OFERTA!
            vigencia_oferta: {
                inicio: new Date(),
                fin: new Date(Date.now() + 86400000) // Oferta válida hasta mañana
            }
        };

        // CORREGIDO: Usamos '/ofertas' porque en priceRoutes.js definiste router.post('/ofertas', ...)
        const ofertaResp = await axios.post(`${BASE_URL}/prices/ofertas`, precioOferta, config);
        console.log('✅ Oferta publicada correctamente.');
        console.log(`   🔥 ¡OFERTA! Precio Final: $${ofertaResp.data.data.precio}`);
        console.log(`   🏷️  Precio Original: $${ofertaResp.data.data.precio_original}`);
        
        // Verificamos si existe historial antes de acceder a length
        const historialCount = ofertaResp.data.data.historial ? ofertaResp.data.data.historial.length : 0;
        console.log(`   📉 Historial guardado: ${historialCount} cambios registrados.`);

        console.log('\n🎉 ¡SISTEMA COMPLETO VERIFICADO!');

    } catch (error) {
        console.error('\n❌ ERROR EN EL TEST:');
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Mensaje: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`   ${error.message}`);
        }
    }
}

runSystemTest();