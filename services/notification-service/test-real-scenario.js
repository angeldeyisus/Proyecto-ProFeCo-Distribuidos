// test-final.js - Actualizado para puerto 3004
import http from 'http';

class NotificationTester {
    constructor(port = 3004) {
        this.port = port;
        this.baseUrl = 'localhost';
    }

    async sendNotification(data) {
        return new Promise((resolve, reject) => {
            const postData = JSON.stringify(data);
            
            const options = {
                hostname: this.baseUrl,
                port: this.port,
                path: '/api/notifications/ofertas',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                },
                timeout: 10000
            };

            console.log('📨 Enviando notificación a puerto 3004...');
            
            const req = http.request(options, (res) => {
                let responseData = '';
                
                console.log(`📊 Status Code: ${res.statusCode}`);
                
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const result = JSON.parse(responseData);
                        console.log('✅ Notificación procesada');
                        resolve(result);
                    } catch (error) {
                        console.log('❌ Error parseando respuesta:', error.message);
                        console.log('📄 Respuesta cruda:', responseData);
                        reject(error);
                    }
                });
            });

            req.on('error', (error) => {
                console.log('❌ Error de conexión:', error.message);
                reject(error);
            });

            req.on('timeout', () => {
                console.log('⏰ Timeout - El servicio no respondió');
                req.destroy();
                reject(new Error('Timeout'));
            });

            req.write(postData);
            req.end();
        });
    }

    async testHealth() {
        return new Promise((resolve) => {
            const options = {
                hostname: this.baseUrl,
                port: this.port,
                path: '/api/notifications/health',
                method: 'GET',
                timeout: 5000
            };

            const req = http.request(options, (res) => {
                console.log(`🏥 Health Check: ${res.statusCode}`);
                resolve(res.statusCode === 200);
            });

            req.on('error', () => {
                console.log('🏥 Health Check: Servicio no disponible');
                resolve(false);
            });

            req.on('timeout', () => {
                console.log('🏥 Health Check: Timeout');
                resolve(false);
            });

            req.end();
        });
    }
}

// DATOS DE PRUEBA REALES - Actualizados con la estructura correcta
const TEST_CASES = [
    {
        name: "LECHE_ALPURA_DESLACTOSADA",
        data: {
            producto_id: "6922d02fc55591d2674bbed9",
            producto_nombre: "Leche Alpura Deslactosada 1L",
            precio_anterior: 25.50,
            precio_nuevo: 19.99,
            precio_original: 25.50,
            precio_promocional: 19.99,
            categoria: "lacteos",
            supermercado: "Walmart",
            tienda_nombre: "Walmart Express",
            valor_descuento: 22,
            en_oferta: true,
            disponible: true
        }
    },
    {
        name: "ACEITE_CAPULLO_1L", 
        data: {
            producto_id: "6933e14ae66682e3785ccf10",
            producto_nombre: "Aceite Capullo 1L",
            precio_anterior: 45.00,
            precio_nuevo: 35.50,
            precio_original: 45.00,
            precio_promocional: 35.50,
            categoria: "aceites",
            supermercado: "Soriana",
            tienda_nombre: "Soriana Hiper",
            valor_descuento: 21,
            en_oferta: true,
            disponible: true
        }
    },
    {
        name: "JAMON_DE_PAVO_FUD",
        data: {
            producto_id: "6944f25bf77793f4896ddg21",
            producto_nombre: "Jamón de Pavo FUD 500g",
            precio_anterior: 85.00,
            precio_nuevo: 72.25,
            precio_original: 85.00,
            precio_promocional: 72.25,
            categoria: "embutidos",
            supermercado: "Chedraui",
            tienda_nombre: "Chedraui Selecto",
            valor_descuento: 15,
            en_oferta: true,
            disponible: true
        }
    }
];

async function runTests() {
    const tester = new NotificationTester(3004); // Puerto 3004
    
    console.log('🚀 INICIANDO PRUEBAS DEL NOTIFICATION SERVICE - PUERTO 3004\n');
    
    // 1. Verificar que el servicio esté corriendo
    console.log('1. Verificando servicio en puerto 3004...');
    const isHealthy = await tester.testHealth();
    
    if (!isHealthy) {
        console.log('❌ El servicio no está disponible en puerto 3004');
        console.log('💡 Asegúrate de que esté ejecutándose con: npm run dev');
        return;
    }
    
    console.log('✅ Servicio disponible en puerto 3004\n');
    
    // 2. Ejecutar casos de prueba
    let successCount = 0;
    let totalTests = TEST_CASES.length;
    
    for (const testCase of TEST_CASES) {
        console.log(`🧪 PRUEBA ${successCount + 1}/${totalTests}: ${testCase.name}`);
        console.log('📦 Producto:', testCase.data.producto_nombre);
        console.log('💰 Oferta:', `$${testCase.data.precio_anterior} → $${testCase.data.precio_nuevo} (${testCase.data.valor_descuento}% OFF)`);
        console.log('🏪 Tienda:', testCase.data.tienda_nombre);
        
        try {
            const result = await tester.sendNotification(testCase.data);
            
            if (result.success) {
                console.log('✅ ÉXITO -', {
                    usuarios_notificados: result.usuarios_notificados,
                    notificaciones_enviadas: result.notificaciones_enviadas,
                    producto: result.producto
                });
                successCount++;
            } else {
                console.log('❌ FALLÓ - Error:', result.error);
            }
            
        } catch (error) {
            console.log('❌ ERROR -', error.message);
        }
        
        console.log('─'.repeat(50));
        await new Promise(resolve => setTimeout(resolve, 1500)); // Esperar 1.5 segundos entre pruebas
    }
    
    console.log('🎉 RESUMEN FINAL DE PRUEBAS');
    console.log(`📊 Total pruebas: ${totalTests}`);
    console.log(`✅ Exitosas: ${successCount}`);
    console.log(`❌ Fallidas: ${totalTests - successCount}`);
    console.log(`📈 Tasa de éxito: ${Math.round((successCount / totalTests) * 100)}%`);
}

// Ejecutar pruebas
runTests().catch(console.error);