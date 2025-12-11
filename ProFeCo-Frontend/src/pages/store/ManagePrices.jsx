import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { Search, DollarSign, Tag, Save, Loader, LogOut, Trash2, X } from 'lucide-react';

export default function ManagePrices() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pricesInput, setPricesInput] = useState({});
  const [myPrices, setMyPrices] = useState({}); // Guardar precios/ofertas actuales

  // Estados del Modal de Oferta
  const [offerItem, setOfferItem] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(10);

  // Obtener usuario del localStorage (asumiendo que se guarda ahí al hacer login)
  const user = JSON.parse(localStorage.getItem('user_data') || '{}');

  useEffect(() => {
    fetchProducts();
    if (user.usuario_id) {
        fetchMyPrices();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar el catálogo de productos');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPrices = async () => {
    try {
       // CAMBIO: Ahora llamamos a la ruta inteligente que no necesita ID en la URL
       const response = await api.get('/prices/mis-precios');
       
       if (response.data.success) {
         const map = {};
         response.data.data.forEach(p => map[p.producto_id] = p);
         setMyPrices(map);
         console.log("✅ Precios cargados correctamente:", Object.keys(map).length);
       }
    } catch (error) { 
        console.error("Error cargando mis precios", error); 
    }
  };

  const handlePriceChange = (productId, value) => {
    setPricesInput({
      ...pricesInput,
      [productId]: value
    });
  };

  const handleSavePrice = async (product) => {
    const precio = pricesInput[product._id];

    if (!precio || parseFloat(precio) <= 0) {
      return toast.error('Ingresa un precio válido mayor a 0');
    }

    try {
      await api.post('/prices', {
        producto_id: product._id,
        precio: parseFloat(precio),
        en_oferta: false
      });
      
      toast.success(`Precio de "${product.nombre}" actualizado a $${precio}`);
      fetchMyPrices(); // Recargar precios para mostrar el botón de oferta
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error al guardar precio');
    }
  };

  // --- LÓGICA DE OFERTAS ---
  const handleOpenOffer = (product) => {
      setOfferItem(product);
      setDiscountPercent(10);
  };

  const handleApplyOffer = async () => {
      if (!offerItem) return;
      try {
          await api.post('/prices/ofertas', {
              producto_id: offerItem._id,
              porcentaje: parseFloat(discountPercent),
              vigencia: null
          });
          toast.success(`¡Oferta del ${discountPercent}% aplicada!`);
          setOfferItem(null);
          fetchMyPrices();
      } catch (error) {
          toast.error(error.response?.data?.message || 'Error al aplicar oferta');
      }
  };

  const handleRemoveOffer = async () => {
      if (!offerItem) return;
      try {
          // ❌ ANTES (Incorrecto):
          // await api.delete(`/prices/ofertas/producto/${offerItem._id}/tienda/${user.usuario_id}`);

          // ✅ AHORA (Correcto):
          // La ruta ya no pide tienda_id porque lo saca del Token
          await api.delete(`/prices/ofertas/producto/${offerItem._id}`);
          
          toast.success('Oferta eliminada. Precio restaurado.');
          setOfferItem(null);
          
          // Si estás en ManagePrices.jsx usa fetchMyPrices(), si es Dashboard.jsx usa la que corresponda
          if (typeof fetchMyPrices === 'function') {
              fetchMyPrices();
          } else {
             // Fallback por si acaso
              window.location.reload(); 
          }
      } catch (error) {
          console.error(error);
          toast.error('Error al eliminar oferta');
      }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data'); 
    navigate('/login');
    toast.success('Has cerrado sesión correctamente');
  };

  // Renderizar Modal de Oferta
  const renderOfferModal = () => {
      if (!offerItem) return null;
      const priceData = myPrices[offerItem._id];
      const hasActiveOffer = priceData?.en_oferta;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
                <button onClick={() => setOfferItem(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
                
                <h3 className="text-lg font-bold text-gray-800 mb-1">Gestionar Oferta</h3>
                <p className="text-sm text-gray-500 mb-4">{offerItem.nombre}</p>

                {hasActiveOffer ? (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4 text-center">
                        <p className="text-red-800 font-bold text-lg mb-1">-{priceData.tipo_descuento}</p>
                        <p className="text-sm text-gray-600">Precio actual: <span className="font-bold">${priceData.precio}</span></p>
                        <p className="text-xs text-gray-400 line-through">Antes: ${priceData.precio_original}</p>
                    </div>
                ) : (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Porcentaje de Descuento</label>
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" min="5" max="90" step="5" 
                                value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)}
                                className="w-full accent-profeco-600"
                            />
                            <span className="text-xl font-bold text-profeco-600 w-16 text-right">{discountPercent}%</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    {hasActiveOffer ? (
                        <button 
                            onClick={handleRemoveOffer}
                            className="w-full bg-white border border-red-200 text-red-600 font-bold py-2 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                        >
                            <Trash2 size={18} /> Quitar Oferta
                        </button>
                    ) : (
                        <button 
                            onClick={handleApplyOffer}
                            className="w-full bg-profeco-600 text-white font-bold py-2 rounded-lg hover:bg-profeco-700 flex items-center justify-center gap-2"
                        >
                            <Tag size={18} /> Aplicar Descuento
                        </button>
                    )}
                </div>
            </div>
        </div>
      );
  };

  if (loading) return <div className="p-10 text-center"><Loader className="animate-spin inline mr-2"/> Cargando catálogo...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestionar Mis Precios</h1>
            <p className="text-gray-500">Asigna o actualiza los precios de tus productos en anaquel.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-profeco-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-profeco-600 transition shadow-sm">
              <Search size={18} /> <span className="hidden sm:inline">Buscar Producto</span>
            </button>

            <button 
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-50 border border-red-200 transition shadow-sm"
              title="Salir del sistema"
            >
              <LogOut size={18} /> Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Grilla de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const myPriceData = myPrices[product._id];
            const hasOffer = myPriceData?.en_oferta;

            return (
                <div key={product._id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${hasOffer ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-100'}`}>
                
                {/* Badge de Oferta */}
                {hasOffer && <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">-{myPriceData.tipo_descuento}</div>}

                {/* Imagen y Datos del Producto */}
                <div className="p-4 flex gap-4 relative">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        {product.imagen_url ? (
                        <img src={product.imagen_url} alt={product.nombre} className="w-full h-full object-contain p-1" />
                        ) : (
                        <Tag className="text-gray-400" />
                        )}
                    </div>
                    <div>
                    <h3 className="font-bold text-gray-800 line-clamp-2">{product.nombre}</h3>
                    <p className="text-sm text-gray-500">{product.marca} • {product.contenido} {product.unidad_medida}</p>
                    <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        SKU: {product.sku}
                    </span>
                    </div>
                </div>

                {/* Sección de Precio */}
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Mi Precio de Venta
                    </label>
                    <div className="flex gap-2">
                        {hasOffer ? (
                            <div className="flex-1 flex justify-between items-center bg-red-50 p-2 rounded-lg border border-red-100">
                                <div>
                                    <span className="text-xs text-gray-400 line-through mr-2">${myPriceData.precio_original}</span>
                                    <span className="text-lg font-bold text-red-600">${myPriceData.precio}</span>
                                </div>
                                <button 
                                    onClick={() => handleOpenOffer(product)} 
                                    className="bg-white text-red-500 p-1.5 rounded shadow-sm hover:text-red-700"
                                    title="Editar/Quitar Oferta"
                                >
                                    <Tag size={16}/>
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                    type="number"
                                    step="0.50"
                                    min="0"
                                    placeholder={myPriceData?.precio || "0.00"}
                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none"
                                    value={pricesInput[product._id] || ''}
                                    onChange={(e) => handlePriceChange(product._id, e.target.value)}
                                    />
                                </div>
                                <button 
                                    onClick={() => handleSavePrice(product)}
                                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition shadow-sm"
                                    title="Guardar Precio"
                                >
                                    <Save size={20} />
                                </button>
                                {myPriceData && (
                                    <button 
                                        onClick={() => handleOpenOffer(product)} 
                                        className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors shadow-sm"
                                        title="Crear Oferta"
                                    >
                                        <Tag size={20} />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                </div>
            );
          })}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No hay productos en el catálogo global para mostrar.
          </div>
        )}

      </div>
      {renderOfferModal()}
    </div>
  );
}