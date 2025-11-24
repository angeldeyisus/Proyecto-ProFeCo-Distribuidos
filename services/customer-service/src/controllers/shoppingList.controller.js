import shoppingListService from '../services/shoppingList.service.js';

class ShoppingListController {
  
  async crearListaCompra(req, res) {
    try {
      const listaData = {
        ...req.body,
        usuario_id: req.user.usuario_id
      };

      const lista = await shoppingListService.crearListaCompra(listaData);
      
      res.status(201).json({
        success: true,
        message: 'Lista de compra creada exitosamente',
        data: lista
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerListasCompra(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const listas = await shoppingListService.obtenerListasCompra(usuario_id);
      
      res.json({
        success: true,
        data: listas
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerListaCompra(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id } = req.params;

      const lista = await shoppingListService.obtenerListaCompra(lista_id, usuario_id);
      
      res.json({
        success: true,
        data: lista
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarListaCompra(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id } = req.params;
      const updateData = req.body;

      const lista = await shoppingListService.actualizarListaCompra(lista_id, usuario_id, updateData);
      
      res.json({
        success: true,
        message: 'Lista de compra actualizada exitosamente',
        data: lista
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async eliminarListaCompra(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id } = req.params;

      await shoppingListService.eliminarListaCompra(lista_id, usuario_id);
      
      res.json({
        success: true,
        message: 'Lista de compra eliminada exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async agregarItemALista(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id } = req.params;
      const itemData = req.body;

      const lista = await shoppingListService.agregarItemALista(lista_id, usuario_id, itemData);
      
      res.status(201).json({
        success: true,
        message: 'Item agregado a la lista',
        data: lista
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarItemLista(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id, item_id } = req.params;
      const updateData = req.body;

      const lista = await shoppingListService.actualizarItemLista(lista_id, usuario_id, item_id, updateData);
      
      res.json({
        success: true,
        message: 'Item actualizado exitosamente',
        data: lista
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async eliminarItemLista(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id, item_id } = req.params;

      const lista = await shoppingListService.eliminarItemLista(lista_id, usuario_id, item_id);
      
      res.json({
        success: true,
        message: 'Item eliminado de la lista',
        data: lista
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async marcarItemComoComprado(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const { lista_id, item_id } = req.params;
      const { comprado = true } = req.body;

      const lista = await shoppingListService.marcarItemComoComprado(lista_id, usuario_id, item_id, comprado);
      
      res.json({
        success: true,
        message: `Item ${comprado ? 'marcado como comprado' : 'marcado como pendiente'}`,
        data: lista
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerListasConItemsPendientes(req, res) {
    try {
      const usuario_id = req.user.usuario_id;
      const listas = await shoppingListService.obtenerListasConItemsPendientes(usuario_id);
      
      res.json({
        success: true,
        data: listas
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default ShoppingListController;