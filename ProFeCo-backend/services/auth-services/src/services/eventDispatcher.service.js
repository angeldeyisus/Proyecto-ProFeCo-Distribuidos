// services/auth-services/src/services/eventDispatcher.service.js
import fetch from 'node-fetch';
import { EventEmitter } from 'events';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env
const envPath = path.join(__dirname, '..', '..', '..', '..', '..', 'prisma', '.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log('✅ EventDispatcher: .env cargado');
}

class EventDispatcher extends EventEmitter {
    constructor() {
        super();
        
        // Usar el mismo servidor (3004)
        const PORT = process.env.PORT || 3004;
        this.services = {
            notification: `http://localhost:${PORT}/api/notifications`
        };
        
        this.serviceToken = process.env.SERVICE_SECRET_TOKEN || 'profeco_dev_token_123';
        this.maxRetries = 1; // Solo 1 intento en desarrollo
        this.retryDelay = 1000;
        
        console.log('🚀 EventDispatcher SIN DB - Configurado');
        console.log(`📡 Notification URL: ${this.services.notification}`);
        
        // Array en memoria para logs (volátil, solo para desarrollo)
        this.eventLogs = [];
        this.maxLogs = 100; // Mantener solo últimos 100 eventos
    }
    
    /**
     * Enviar evento - Versión simplificada SIN Prisma
     */
    async sendToService(serviceName, endpoint, payload) {
        const serviceUrl = this.services[serviceName];
        
        if (!serviceUrl) {
            console.warn(`⚠️ Servicio ${serviceName} no configurado`);
            return { success: false, error: 'Servicio no configurado' };
        }
        
        const url = `${serviceUrl}${endpoint}`;
        
        console.log(`📤 Enviando evento a: ${url}`);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-service-token': this.serviceToken
                },
                body: JSON.stringify(payload),
                timeout: 3000 // 3 segundos timeout
            });
            
            const logEntry = {
                id: Date.now(),
                servicio: serviceName,
                endpoint,
                timestamp: new Date(),
                payload: payload,
                exito: response.ok,
                status: response.status
            };
            
            // Guardar en memoria
            this.eventLogs.unshift(logEntry);
            if (this.eventLogs.length > this.maxLogs) {
                this.eventLogs.pop();
            }
            
            if (response.ok) {
                console.log(`✅ Evento enviado exitosamente`);
                this.emit('event:success', { serviceName, endpoint });
                return { success: true };
            } else {
                const errorText = await response.text();
                console.error(`❌ Servicio respondió con error: ${response.status}`, errorText);
                this.emit('event:failed', { serviceName, endpoint, error: `HTTP ${response.status}` });
                return { success: false, error: `HTTP ${response.status}` };
            }
            
        } catch (error) {
            console.log(`ℹ️  Servicio ${serviceName} no disponible: ${error.message}`);
            
            // Log en memoria
            this.eventLogs.unshift({
                id: Date.now(),
                servicio: serviceName,
                endpoint,
                timestamp: new Date(),
                payload: payload,
                exito: false,
                error: error.message
            });
            
            this.emit('event:failed', { serviceName, endpoint, error: error.message });
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Métodos específicos para eventos de auth
     */
    async usuarioRegistrado(usuarioData) {
        console.log('👤 Enviando evento: Usuario registrado');
        
        const eventData = {
            evento: 'auth.user.registered',
            datos: {
                ...usuarioData,
                timestamp: new Date().toISOString(),
                fecha_registro: new Date().toLocaleDateString('es-MX')
            }
        };
        
        return await this.sendToService('notification', '/webhook/auth', eventData);
    }
    
    async solicitudRecuperacionPassword(usuarioData, resetToken, ip) {
        console.log('🔐 Enviando evento: Recuperación password');
        
        const eventData = {
            evento: 'auth.password.reset.requested',
            datos: {
                ...usuarioData,
                reset_token: resetToken,
                reset_url: `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password?token=${resetToken}`,
                ip_address: ip,
                timestamp: new Date().toISOString()
            }
        };
        
        return await this.sendToService('notification', '/webhook/auth', eventData);
    }
    
    async passwordRestablecido(usuarioData) {
        console.log('✅ Enviando evento: Password restablecido');
        
        const eventData = {
            evento: 'auth.password.reset.success',
            datos: {
                ...usuarioData,
                timestamp: new Date().toISOString()
            }
        };
        
        return await this.sendToService('notification', '/webhook/auth', eventData);
    }
    
    async loginExitoso(usuarioData, deviceInfo) {
        console.log('🔓 Enviando evento: Login exitoso');
        
        const eventData = {
            evento: 'auth.login.success',
            datos: {
                ...usuarioData,
                dispositivo: deviceInfo.userAgent,
                ip_address: deviceInfo.ip,
                timestamp: new Date().toISOString(),
                es_nuevo_dispositivo: deviceInfo.isNewDevice || false
            }
        };
        
        return await this.sendToService('notification', '/webhook/auth', eventData);
    }
    
    async loginFallido(email, ip, intentos) {
        console.log('🚫 Enviando evento: Login fallido');
        
        const eventData = {
            evento: 'auth.login.failed',
            datos: {
                email,
                ip_address: ip,
                intentos_fallidos: intentos,
                timestamp: new Date().toISOString(),
                requiere_verificacion: intentos >= 5
            }
        };
        
        return await this.sendToService('notification', '/webhook/auth', eventData);
    }
    
    /**
     * Métodos de utilidad
     */
    getEventLogs(limit = 20) {
        return this.eventLogs.slice(0, limit);
    }
    
    clearEventLogs() {
        this.eventLogs = [];
        console.log('🧹 Logs de eventos limpiados');
    }
    
    getStats() {
        const total = this.eventLogs.length;
        const exitosos = this.eventLogs.filter(log => log.exito).length;
        
        return {
            total,
            exitosos,
            fallidos: total - exitosos,
            tasaExito: total > 0 ? ((exitosos / total) * 100).toFixed(2) + '%' : '0%'
        };
    }
}

const eventDispatcher = new EventDispatcher();

// Listeners para logging
eventDispatcher.on('event:success', ({ serviceName, endpoint }) => {
    console.log(`📊 [SUCCESS] ${serviceName}${endpoint}`);
});

eventDispatcher.on('event:failed', ({ serviceName, endpoint, error }) => {
    console.log(`📊 [INFO] ${serviceName}${endpoint} - ${error} (Esto es normal si notification-service no está disponible)`);
});

export default eventDispatcher;