import Wishlist from "../models/wishlist.model.js";

export async function crearWishlist(data) {
  try {
    const wl = new Wishlist(data);
    return await wl.save();
  } catch (error) {
    console.error("Error al crear wishlist:", error);
    throw new Error("Error en la base de datos al crear wishlist.");
  }
}

export async function obtenerWishlistDeTienda(tiendaId) {
  try {
    return await Wishlist.find({ tienda_id: tiendaId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error al obtener wishlist de tienda:", error);
    throw new Error("Error en la base de datos al obtener wishlist.");
  }
}

export async function obtenerWishlistPorUsuario(usuarioId) {
  try {
    return await Wishlist.find({ usuario_id: usuarioId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error al obtener wishlist de usuario:", error);
    throw new Error("Error en la base de datos al obtener wishlist.");
  }
}
