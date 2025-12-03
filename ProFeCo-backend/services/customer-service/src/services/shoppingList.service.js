import shoppingListRepository from '../repositories/shoppingListRepository.js';

class ShoppingListService {
  
  async crearListaCompra(listaData) {
    try {
      this.validarListaCompra(listaData);

      return await shoppingListRepository.crearListaCompra(listaData);
    } catch (error) {
      throw new Error(`Error creando lista de compra: ${error.message}`);
    }
  }

  async obtenerListasCompra(usuario_id) {
    try {
      return await shoppingListRepository.obtenerListasPorUsuario(usuario_id);
    } catch (error) {
      throw new Error(`Error obteniendo listas de compra: ${error.message}`);
    }
  }

  async obtenerListaCompra(lista_id, usuario_id) {
    try {
      const lista = await shoppingListRepository.obtenerListaPorId(lista_id, usuario_id);
      
      if (!lista) {
        throw new Error('Lista de compra no encontrada');
      }

      return lista;
    } catch (error) {
      throw new Error(`Error obteniendo lista de compra: ${error.message}`);
    }
  }

  async actualizarListaCompra(lista_id, usuario_id, updateData) {
    try {
      await this.obtenerListaCompra(lista_id, usuario_id);

      if (updateData.nombre) {
        this.validarNombreLista(updateData.nombre);
      }

      return await shoppingListRepository.actualizarListaCompra(lista_id, usuario_id, updateData);
    } catch (error) {
      throw new Error(`Error actualizando lista de compra: ${error.message}`);
    }
  }

  async eliminarListaCompra(lista_id, usuario_id) {
    try {
      await this.obtenerListaCompra(lista_id, usuario_id);
      return await shoppingListRepository.eliminarListaCompra(lista_id, usuario_id);
    } catch (error) {
      throw new Error(`Error eliminando lista de compra: ${error.message}`);
    }
  }

  async agregarItemALista(lista_id, usuario_id, itemData) {
    try {
      this.validarItemLista(itemData);

      const lista = await this.obtenerListaCompra(lista_id, usuario_id);
      
      // Verificar si el item ya existe
      const itemExistente = lista.items.find(
        item => item.producto_id === itemData.producto_id && !item.comprado
      );

      if (itemExistente) {
        throw new Error('El producto ya está en la lista (y no está comprado)');
      }

      return await shoppingListRepository.agregarItemALista(lista_id, usuario_id, itemData);
    } catch (error) {
      throw new Error(`Error agregando item a lista: ${error.message}`);
    }
  }

  async actualizarItemLista(lista_id, usuario_id, item_id, updateData) {
    try {
      await this.obtenerListaCompra(lista_id, usuario_id);

      if (updateData.cantidad !== undefined && updateData.cantidad < 1) {
        throw new Error('La cantidad debe ser al menos 1');
      }

      return await shoppingListRepository.actualizarItemLista(lista_id, usuario_id, item_id, updateData);
    } catch (error) {
      throw new Error(`Error actualizando item de lista: ${error.message}`);
    }
  }

  async eliminarItemLista(lista_id, usuario_id, item_id) {
    try {
      await this.obtenerListaCompra(lista_id, usuario_id);
      return await shoppingListRepository.eliminarItemLista(lista_id, usuario_id, item_id);
    } catch (error) {
      throw new Error(`Error eliminando item de lista: ${error.message}`);
    }
  }

  async marcarItemComoComprado(lista_id, usuario_id, item_id, comprado = true) {
    try {
      await this.obtenerListaCompra(lista_id, usuario_id);
      return await shoppingListRepository.marcarItemComoComprado(lista_id, usuario_id, item_id, comprado);
    } catch (error) {
      throw new Error(`Error actualizando estado de item: ${error.message}`);
    }
  }

  async obtenerListasConItemsPendientes(usuario_id) {
    try {
      return await shoppingListRepository.obtenerListasConItemsPendientes(usuario_id);
    } catch (error) {
      throw new Error(`Error obteniendo listas con items pendientes: ${error.message}`);
    }
  }

  validarListaCompra(listaData) {
    const { nombre, usuario_id, presupuesto_total, fecha_estimada_compra } = listaData;

    if (!nombre || nombre.trim().length < 2) {
      throw new Error('El nombre de la lista debe tener al menos 2 caracteres');
    }

    if (!usuario_id) {
      throw new Error('ID de usuario es requerido');
    }

    if (presupuesto_total !== undefined && presupuesto_total < 0) {
      throw new Error('El presupuesto no puede ser negativo');
    }

    if (fecha_estimada_compra && new Date(fecha_estimada_compra) < new Date()) {
      throw new Error('La fecha estimada de compra no puede ser en el pasado');
    }
  }

  validarNombreLista(nombre) {
    if (!nombre || nombre.trim().length < 2) {
      throw new Error('El nombre de la lista debe tener al menos 2 caracteres');
    }
  }

  validarItemLista(itemData) {
    const { producto_id, cantidad = 1, precio_presupuestado } = itemData;

    if (!producto_id) {
      throw new Error('ID de producto es requerido');
    }

    if (cantidad < 1) {
      throw new Error('La cantidad debe ser al menos 1');
    }

    if (precio_presupuestado !== undefined && precio_presupuestado < 0) {
      throw new Error('El precio presupuestado no puede ser negativo');
    }
  }
}

export default new ShoppingListService();