import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";
dotenv.config();

export class TiendaRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async crearTienda(tiendaData) {
    try {
      return await this.prisma.tienda.create({
        data: tiendaData
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('El usuario ya tiene una tienda registrada');
      }
      throw new Error(`Error al crear tienda: ${error.message}`);
    }
  }

  async crearMultiplesTiendas(tiendasData) {
    try {
      return await this.prisma.tienda.createMany({
        data: tiendasData,
        skipDuplicates: true
      });
    } catch (error) {
      throw new Error(`Error al crear múltiples tiendas: ${error.message}`);
    }
  }

  async obtenerTiendas() {
    try {
      return await this.prisma.tienda.findMany({
        where: { is_activa: true },
        select: {
          tienda_id: true,
          nombre: true,
          usuario_id: true,
          direccion: true,
          logo_url: true
        }
      });
    } catch (error) {
      throw new Error(`Error al obtener tiendas: ${error.message}`);
    }
  }

  async contarTiendas() {
    try {
      return await this.prisma.tienda.count();
    } catch (error) {
      throw new Error(`Error al contar tiendas: ${error.message}`);
    }
  }

  async obtenerPorId(tiendaId) {
    try {
      const tienda = await this.prisma.tienda.findUnique({
        where: { tienda_id: tiendaId },
        select: {
          tienda_id: true,
          usuario_id: true,
          nombre: true,
          direccion: true,
          logo_url: true,
          is_activa: true,
          horario: true,
          telefono: true,
          created_at: true,
          updated_at: true
        }
      });

      if (!tienda) {
        throw new Error(`Tienda con ID ${tiendaId} no encontrada`);
      }

      return tienda;
    } catch (error) {
      throw new Error(`Error al obtener tienda: ${error.message}`);
    }
  }

  async validarTiendaActiva(tiendaId) {
    try {
      const tienda = await this.prisma.tienda.findUnique({
        where: { tienda_id: tiendaId },
        select: {
          tienda_id: true,
          nombre: true,
          is_activa: true,
          usuario_id: true
        }
      });

      if (!tienda) {
        throw new Error(`Tienda con ID ${tiendaId} no encontrada`);
      }

      if (!tienda.is_activa) {
        throw new Error(`La tienda "${tienda.nombre}" no está activa`);
      }

      return tienda;
    } catch (error) {
      throw new Error(`Error al validar tienda: ${error.message}`);
    }
  }

  async verificarPropietarioTienda(tiendaId, usuarioId) {
    try {
      const tienda = await this.prisma.tienda.findUnique({
        where: { tienda_id: tiendaId },
        select: { usuario_id: true }
      });

      if (!tienda) {
        throw new Error('Tienda no encontrada');
      }

      return tienda.usuario_id === usuarioId;
    } catch (error) {
      throw new Error(`Error al verificar propietario: ${error.message}`);
    }
  }

  async obtenerTiendasPorUsuario(usuarioId) {
    try {
      const tiendas = await this.prisma.tienda.findMany({
        where: { usuario_id: usuarioId },
        select: {
          tienda_id: true,
          nombre: true,
          direccion: true,
          is_activa: true,
          created_at: true
        },
        orderBy: { created_at: 'desc' }
      });

      return tiendas;
    } catch (error) {
      throw new Error(`Error al obtener tiendas del usuario: ${error.message}`);
    }
  }

  async contarMultasActivas(tiendaId) {
    try {
      const count = await this.prisma.multa.count({
        where: {
          tienda_id: tiendaId
          // Agrega condición de estado si tu modelo Multa lo tiene
        }
      });

      return count;
    } catch (error) {
      throw new Error(`Error al contar multas: ${error.message}`);
    }
  }

  async actualizarTienda(tiendaId, updateData) {
    try {
      return await this.prisma.tienda.update({
        where: { tienda_id: tiendaId },
        data: {
          ...updateData,
          updated_at: new Date()
        }
      });
    } catch (error) {
      throw new Error(`Error al actualizar tienda: ${error.message}`);
    }
  }

  async desconectar() {
    await this.prisma.$disconnect();
  }
}