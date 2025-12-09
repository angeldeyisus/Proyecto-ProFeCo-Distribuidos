import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api.js'; 
import { toast } from 'react-hot-toast';
import { 
  LogOut, Save, Eye, X, ShoppingBag, Search, 
  AlertTriangle, ArrowLeft, Star, Heart 
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  
  // --- ESTADOS DE DATOS ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- ESTADOS DE PREFERENCIAS (NUEVO) ❤️ ---
  const [wishlist, setWishlist] = useState([]); // Array de IDs de productos
  const [favStores, setFavStores] = useState([]); // Array de IDs de tiendas
  const [showWishlistOnly, setShowWishlistOnly] = useState(false); // Filtro activo/inactivo

  // --- ESTADOS DE LÓGICA DE NEGOCIO ---
  const [pricesInput, setPricesInput] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pricesList, setPricesList] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- ESTADOS PARA REPORTE ---
  const [reportingItem, setReportingItem] = useState(null);
  const [reportReason, setReportReason] = useState('PRECIO_MAYOR');
  const [reportComment, setReportComment] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  // --- ESTADOS PARA RESEÑAS ---
  const [ratingItem, setRatingItem] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    fetchProducts();
    if (user?.tipo_usuario === 'CONSUMIDOR') {
        fetchPreferences();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Error cargando productos');
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
        const response = await api.get('/prices/preferencias');
        if (response.data.success) {
            setWishlist(response.data.data.wishlist || []);
            setFavStores(response.data.data.tiendas_favoritas || []);
        }
    } catch (error) {
        console.error("Error cargando preferencias", error);
    }
  };

  const handleLogout = () => logout();

  // --- LÓGICA WISHLIST (PRODUCTOS) ❤️ ---
  const toggleWishlist = async (e, productId) => {
    e.stopPropagation(); // Evitar abrir el modal al dar clic al corazón
    
    // UI Optimista: Actualizamos visualmente antes de esperar al servidor
    const isLiked = wishlist.includes(productId);
    setWishlist(prev => isLiked ? prev.filter(id => id !== productId) : [...prev, productId]);

    try {
        await api.post('/prices/preferencias/wishlist', { producto_id: productId });
        toast.success(isLiked ? 'Eliminado de Wishlist' : 'Agregado a Wishlist');
    } catch (error) {
        // Si falla, revertimos el cambio
        setWishlist(prev => isLiked ? [...prev, productId] : prev.filter(id => id !== productId));
        toast.error('Error al actualizar Wishlist');
    }
  };

  // --- LÓGICA FAVORITOS (TIENDAS) ❤️ ---
  const toggleFavStore = async (tiendaId) => {
      const isFav = favStores.includes(tiendaId);
      setFavStores(prev => isFav ? prev.filter(id => id !== tiendaId) : [...prev, tiendaId]);

      try {
          await api.post('/prices/preferencias/tiendas', { tienda_id: tiendaId });
          toast.success(isFav ? 'Tienda eliminada de favoritos' : 'Tienda agregada a favoritos');
      } catch (error) {
          setFavStores(prev => isFav ? [...prev, tiendaId] : prev.filter(id => id !== tiendaId));
      }
  };

  // --- LÓGICA TIENDA: GUARDAR PRECIO ---
  const handleSavePrice = async (product) => {
     const precio = pricesInput[product._id];
     if (!precio || precio <= 0) return toast.error('Precio inválido');
     try {
       await api.post('/prices', { producto_id: product._id, precio: parseFloat(precio), en_oferta: false });
       toast.success('Precio actualizado');
     } catch (error) { toast.error('Error al guardar'); }
  };

  // --- LÓGICA CONSUMIDOR: VER PRECIOS ---
  const handleViewPrices = async (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setLoadingPrices(true);
    setReportingItem(null);
    setRatingItem(null);
    try {
        const response = await api.get(`/prices/product/${product._id}`);
        setPricesList(response.data.data || []);
    } catch (error) { setPricesList([]); } finally { setLoadingPrices(false); }
  };

  // --- LÓGICA CONSUMIDOR: REPORTAR ---
  const handleOpenReport = (priceItem) => {
    setReportingItem(priceItem);
    setRatingItem(null);
    setReportReason('PRECIO_MAYOR');
    setReportComment('');
  };

  const handleSubmitReport = async () => {
    if (!reportingItem) return;
    setSubmittingReport(true);
    try {
      await api.post('/prices/reportar', {
        tienda_id: reportingItem.tienda_id,
        tienda_nombre: reportingItem.tienda_nombre,
        producto_id: selectedProduct._id,
        producto_nombre: selectedProduct.nombre,
        precio_publicado: reportingItem.precio,
        motivo: reportReason,
        comentarios: reportComment
      });
      toast.success('Reporte enviado.');
      setReportingItem(null);
    } catch (error) {
      toast.error('Error al enviar reporte');
    } finally {
      setSubmittingReport(false);
    }
  };

  // --- LÓGICA CONSUMIDOR: CALIFICAR ---
  const handleOpenRate = (priceItem) => {
    setRatingItem(priceItem);
    setReportingItem(null);
    setRatingValue(5);
    setRatingComment('');
  };

  const handleSubmitRating = async () => {
    if (!ratingItem) return;
    setSubmittingRating(true);
    try {
      await api.post('/prices/resenas', {
        tienda_id: ratingItem.tienda_id,
        tienda_nombre: ratingItem.tienda_nombre,
        calificacion: ratingValue,
        comentario: ratingComment
      });
      toast.success(`¡Calificaste a ${ratingItem.tienda_nombre}!`);
      setRatingItem(null);
    } catch (error) {
      toast.error('Error al enviar reseña');
    } finally {
      setSubmittingRating(false);
    }
  };

  // --- FILTROS ---
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.categoria_nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showWishlistOnly) {
        return matchesSearch && wishlist.includes(product._id);
    }
    return matchesSearch;
  });

  // --- RENDERIZADO DEL MODAL ---
  const renderPriceModal = () => {
    if (!showModal || !selectedProduct) return null;
    
    let modalTitle = selectedProduct.nombre;
    if (reportingItem) modalTitle = 'Reportar Inconsistencia';
    if (ratingItem) modalTitle = `Calificar a ${ratingItem.tienda_nombre}`;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className={`${ratingItem ? 'bg-yellow-500' : reportingItem ? 'bg-red-600' : 'bg-profeco-600'} p-4 flex justify-between items-center text-white shrink-0 transition-colors duration-300`}>
            <div className="flex items-center gap-2 overflow-hidden">
                {(reportingItem || ratingItem) && (
                    <button onClick={() => { setReportingItem(null); setRatingItem(null); }} className="hover:bg-white/20 p-1 rounded transition">
                        <ArrowLeft size={20} />
                    </button>
                )}
                <h3 className="font-bold text-lg truncate">{modalTitle}</h3>
            </div>
            <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded"><X size={24} /></button>
          </div>
          
          <div className="p-6 overflow-y-auto">
            
            {/* VISTA 1: REPORTE */}
            {reportingItem ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-sm text-red-800">
                        Reportando precio de <strong>${reportingItem.precio}</strong> en <strong>{reportingItem.tienda_nombre}</strong>.
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                        <select className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500 bg-white" value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
                            <option value="PRECIO_MAYOR">El precio en tienda es MAYOR</option>
                            <option value="NO_EXISTENCIA">No tienen el producto</option>
                            <option value="PRECIO_ESCONDIDO">Precio no visible</option>
                            <option value="OTRO">Otro problema</option>
                        </select>
                    </div>
                    <textarea className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500 text-sm" rows="3" placeholder="Detalles..." value={reportComment} onChange={(e) => setReportComment(e.target.value)}></textarea>
                    <button onClick={handleSubmitReport} disabled={submittingReport} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
                        {submittingReport ? 'Enviando...' : 'Enviar Reporte 🚨'}
                    </button>
                </div>

            /* VISTA 2: CALIFICACIÓN */
            ) : ratingItem ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <div className="flex justify-center gap-2 py-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => setRatingValue(star)} className={`transition-transform hover:scale-110 ${ratingValue >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}>
                                <Star size={32} fill={ratingValue >= star ? "currentColor" : "none"} />
                            </button>
                        ))}
                    </div>
                    <textarea className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400 text-sm" rows="3" placeholder="Opinión..." value={ratingComment} onChange={(e) => setRatingComment(e.target.value)}></textarea>
                    <button onClick={handleSubmitRating} disabled={submittingRating} className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition">
                        {submittingRating ? 'Enviando...' : 'Enviar Calificación ⭐'}
                    </button>
                </div>

            /* VISTA 3: LISTA DE PRECIOS */
            ) : (
             loadingPrices ? <div className="text-center py-4">Buscando mejores precios...</div> : 
             pricesList.length === 0 ? (
               <div className="text-center py-8 text-gray-400">
                 <ShoppingBag size={48} className="mx-auto mb-2 opacity-20"/>
                 <p>Nadie ha publicado precios para este producto aún.</p>
               </div>
             ) : (
              <table className="w-full">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left">Tienda</th>
                    <th className="px-4 py-2 text-right">Precio</th>
                    <th className="px-2 py-2 w-20 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricesList.map((p, idx) => (
                    <tr key={idx} className={`group ${favStores.includes(p.tienda_id) ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="font-medium">{p.tienda_nombre || 'Tienda'}</div>
                            {/* CORAZÓN DE TIENDA FAVORITA */}
                            <button onClick={() => toggleFavStore(p.tienda_id)} className={`transition-transform hover:scale-110 ${favStores.includes(p.tienda_id) ? 'text-red-500 fill-red-500' : 'text-gray-300 hover:text-red-300'}`} title="Marcar Tienda Favorita">
                                <Heart size={14} fill={favStores.includes(p.tienda_id) ? "currentColor" : "none"}/>
                            </button>
                        </div>
                        <div className="text-xs text-gray-400">{new Date(p.ultima_actualizacion).toLocaleDateString()}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-green-600 font-bold text-lg">${parseFloat(p.precio).toFixed(2)}</span>
                      </td>
                      <td className="px-2 py-3 text-center flex justify-center gap-2">
                        <button onClick={() => handleOpenRate(p)} className="text-gray-300 hover:text-yellow-500 hover:bg-yellow-50 p-1.5 rounded transition-colors" title="Calificar"><Star size={18} /></button>
                        <button onClick={() => handleOpenReport(p)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors" title="Reportar"><AlertTriangle size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             )
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-profeco-600 font-bold">Cargando Sistema...</div>;

  const isStore = user?.tipo_usuario === 'TIENDA';
  const isConsumer = user?.tipo_usuario === 'CONSUMIDOR';

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-10 px-6 py-3 flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-profeco-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
           <div className="hidden sm:block">
             <h1 className="text-lg font-bold text-gray-800 leading-none">ProFeCo</h1>
           </div>
        </div>
        
        <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Buscar producto, marca..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-profeco-500 focus:ring-0 rounded-full transition-all text-sm outline-none border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="flex gap-2">
            {/* Botón Filtro Wishlist */}
            {isConsumer && (
                <button 
                    onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                    className={`p-2 rounded-full transition-colors flex items-center gap-2 px-3 text-sm font-medium ${showWishlistOnly ? 'bg-red-50 text-red-500 border border-red-200' : 'text-gray-500 hover:bg-gray-100'}`}
                    title="Mis Favoritos"
                >
                    <Heart size={20} fill={showWishlistOnly ? "currentColor" : "none"} />
                    <span className="hidden md:inline">Favoritos</span>
                </button>
            )}

            <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors" title="Cerrar Sesión">
                <LogOut size={20} />
            </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{isStore ? 'Gestionar Precios' : showWishlistOnly ? 'Mi Wishlist ❤️' : 'Explorar Catálogo'}</h2>
            <p className="text-gray-500 text-sm">{filteredProducts.length} productos encontrados</p>
        </div>

        {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                    {showWishlistOnly ? 'No tienes productos en tu Wishlist aún.' : `No encontramos productos para "${searchTerm}"`}
                </p>
                {(searchTerm || showWishlistOnly) && (
                    <button onClick={() => { setSearchTerm(''); setShowWishlistOnly(false); }} className="mt-4 text-profeco-600 font-semibold hover:underline">
                        Ver todo el catálogo
                    </button>
                )}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group relative">
                
                {/* --- BOTÓN WISHLIST (SOLO CONSUMIDOR) --- */}
                {isConsumer && (
                    <button 
                        onClick={(e) => toggleWishlist(e, product._id)}
                        className="absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"
                    >
                        <Heart 
                            size={20} 
                            className={wishlist.includes(product._id) ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-400"} 
                        />
                    </button>
                )}

                <div className="h-48 p-6 bg-white flex items-center justify-center relative border-b border-gray-50">
                    <img src={product.imagen_url || 'https://via.placeholder.com/150'} alt={product.nombre} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute bottom-2 right-3 bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-600 rounded uppercase tracking-wider">{product.contenido} {product.unidad_medida}</span>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-4 flex-1">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">{product.marca}</p>
                        <h3 className="text-base font-bold text-gray-800 leading-snug line-clamp-2" title={product.nombre}>{product.nombre}</h3>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-50">
                    {isStore ? (
                        <div className="flex gap-2 items-center">
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                                <input type="number" placeholder="0.00" className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none font-bold text-gray-700 text-sm" onChange={(e) => setPricesInput({...pricesInput, [product._id]: e.target.value})} />
                            </div>
                            <button onClick={() => handleSavePrice(product)} className="bg-profeco-600 hover:bg-profeco-700 text-white p-2 rounded-lg transition-colors shadow-sm"><Save size={18} /></button>
                        </div>
                    ) : (
                        <button onClick={() => handleViewPrices(product)} className="w-full bg-white border border-profeco-200 text-profeco-600 hover:bg-profeco-50 hover:border-profeco-300 font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm">
                            <Eye size={16} /> Ver Precios
                        </button>
                    )}
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
      </main>
      {renderPriceModal()}
    </div>
  );
}