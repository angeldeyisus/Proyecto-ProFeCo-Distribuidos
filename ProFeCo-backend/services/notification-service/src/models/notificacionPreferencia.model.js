import mongoose from "mongoose";

const notificationPreferenceSchema = new mongoose.Schema({
    usuario_id: {
        type: String,
        required: true,
        unique: true
    },
    email_activo: {
        type: Boolean,
        default: true
    },
    push_activo: {
        type: Boolean,
        default: true
    },
    sms_activo: {
        type: Boolean,
        default: false
    },
    in_app_activo: {
        type: Boolean,
        default: true
    },

    preferencias: {
        ofertas_productos: {
            type: Boolean,
            default: true
        },
        precio_bajado: {
            type: Boolean,
            default: true
        },
        wishlist: {
            type: Boolean,
            default: true
        },
        nuevos_productos: {
            type: Boolean,
            default: false
        },
        alertas_tienda: {
            type: Boolean,
            default: true
        },
        promociones_generales: {
            type: Boolean,
            default: true
        },
        notificaciones_sistema: {
            type: Boolean,
            default: true
        }
    },

    configuraciones: {
        frecuencia_maxima: {
            type: String,
            enum: ['inmediato', 'diario', 'semanal'],
            default: 'inmediato'
        },
        horario_notificaciones: {
            inicio: { type: String, default: '09:00' },
            fin: { type: String, default: '21:00' }
        },
        dias_silenciosos: [{
            type: String,
            enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
        }],
        umbral_descuento: {
            type: Number,
            default: 10,
            min: 0,
            max: 100
        }
    },

    tokens_push: [{
        token: String,
        dispositivo: String, 
        navegador: String,
        ultima_actividad: Date
    }],

    estadisticas: {
        total_notificaciones_enviadas: { type: Number, default: 0 },
        total_notificaciones_leidas: { type: Number, default: 0 },
        tasa_apertura: { type: Number, default: 0 }, // %
        ultima_notificacion: Date,
        canal_preferido: String 
    }
}, {
    timestamps: true
});

notificationPreferenceSchema.index({ usuario_id: 1 });
notificationPreferenceSchema.index({ "preferencias.ofertas_productos": 1 });
notificationPreferenceSchema.index({ "preferencias.wishlist": 1 });
notificationPreferenceSchema.index({ "configuraciones.frecuencia_maxima": 1 });

notificationPreferenceSchema.methods.puedeRecibirNotificacion = function(tipo, canal = 'email') {
    const canalActivo = this[`${canal}_activo`];
    if (!canalActivo) return false;

    const preferenciaTipo = this.preferencias[tipo];
    if (preferenciaTipo === undefined || !preferenciaTipo) return false;
    
    // Verificar horario (futura implementación)
    // Verificar días silenciosos (futura implementación)
    
    return true;
};

notificationPreferenceSchema.methods.obtenerCanalesActivos = function(tipo) {
    const canales = [];
    
    if (this.email_activo && this.preferencias[tipo]) canales.push('email');
    if (this.push_activo && this.preferencias[tipo]) canales.push('push');
    if (this.in_app_activo && this.preferencias[tipo]) canales.push('in_app');
    if (this.sms_activo && this.preferencias[tipo]) canales.push('sms');
    
    return canales;
};

notificationPreferenceSchema.methods.actualizarEstadisticas = function(leida = false) {
    this.estadisticas.total_notificaciones_enviadas += 1;
    
    if (leida) {
        this.estadisticas.total_notificaciones_leidas += 1;
    }

    this.estadisticas.tasa_apertura = 
        (this.estadisticas.total_notificaciones_leidas / this.estadisticas.total_notificaciones_enviadas) * 100;
    
    this.estadisticas.ultima_notificacion = new Date();
};

export default mongoose.model("NotificationPreference", notificationPreferenceSchema);