import ListaCompra from '../models/listaCompra.model.js';

class ShoppingListRepository {
  
  async crearListaCompra(listaData) {
    const lista = new ListaCompra(listaData);
    return await lista.save();
  }

  async obtenerListasPorUsuario(usuario_id) {
    return await ListaCompra.find({ usuario_id }).sort({ createdAt: -1 });
  }

  async obtenerListaPorId(lista_id, usuario_id) {
    return await ListaCompra.findOne({ _id: lista_id, usuario_id });
  }

  async actualizarListaCompra(lista_id, usuario_id, updateData) {
    return await ListaCompra.findOneAndUpdate(
      { _id: lista_id, usuario_id },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async eliminarListaCompra(lista_id, usuario_id) {
    return await ListaCompra.findOneAndDelete({ _id: lista_id, usuario_id });
  }

  async agregarItemALista(lista_id, usuario_id, itemData) {
    const item = {
      ...itemData,
      comprado: false
    };

    return await ListaCompra.findOneAndUpdate(
      { _id: lista_id, usuario_id },
      { $push: { items: item } },
      { new: true }
    );
  }

  async actualizarItemLista(lista_id, usuario_id, item_id, updateData) {
    return await ListaCompra.findOneAndUpdate(
      { _id: lista_id, usuario_id, "items._id": item_id },
      { $set: { "items.$": { ...updateData, _id: item_id } } },
      { new: true }
    );
  }

  async eliminarItemLista(lista_id, usuario_id, item_id) {
    return await ListaCompra.findOneAndUpdate(
      { _id: lista_id, usuario_id },
      { $pull: { items: { _id: item_id } } },
      { new: true }
    );
  }

  async marcarItemComoComprado(lista_id, usuario_id, item_id, comprado = true) {
    return await ListaCompra.findOneAndUpdate(
      { _id: lista_id, usuario_id, "items._id": item_id },
      { $set: { "items.$.comprado": comprado } },
      { new: true }
    );
  }

  async obtenerListasConItemsPendientes(usuario_id) {
    return await ListaCompra.find({
      usuario_id,
      "items.comprado": false
    });
  }

  async actualizarPresupuestoLista(lista_id, usuario_id, presupuesto_total) {
    return await ListaCompra.findOneAndUpdate(
      { _id: lista_id, usuario_id },
      { $set: { presupuesto_total } },
      { new: true }
    );
  }
}

export default new ShoppingListRepository();