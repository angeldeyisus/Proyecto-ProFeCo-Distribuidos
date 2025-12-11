import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api.js';
import { toast } from 'react-hot-toast';
import {
    LogOut, Save, Eye, X, ShoppingBag, Search,
    AlertTriangle, ArrowLeft, Star, Heart, Tag, Trash2, Gavel, Scale
} from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // --- ESTADOS GENERALES ---
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // --- ESTADOS CONSUMIDOR/TIENDA ---
    const [products, setProducts] = useState([]);
    const [myPrices, setMyPrices] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [favStores, setFavStores] = useState([]);
    const [showWishlistOnly, setShowWishlistOnly] = useState(false);

    // Estados modales Consumidor/Tienda
    const [pricesInput, setPricesInput] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [pricesList, setPricesList] = useState([]);
    const [loadingPrices, setLoadingPrices] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [offerItem, setOfferItem] = useState(null);
    const [discountPercent, setDiscountPercent] = useState(10);

    // Estados Reporte/Reseña
    const [reportingItem, setReportingItem] = useState(null);
    const [reportReason, setReportReason] = useState('PRECIO_MAYOR');
    const [reportComment, setReportComment] = useState('');
    const [submittingReport, setSubmittingReport] = useState(false);

    // --- ESTADOS PARA RESEÑAS ---
    const [ratingItem, setRatingItem] = useState(null);
    const [ratingValue, setRatingValue] = useState(5);
    const [ratingComment, setRatingComment] = useState('');
    const [submittingRating, setSubmittingRating] = useState(false);

    // --- ESTADOS NUEVOS PARA TIENDA (VER RESEÑAS Y WISHLIST) ---
    const [storeReviews, setStoreReviews] = useState([]);
    const [showStoreReviewsModal, setShowStoreReviewsModal] = useState(false);
    const [wishlistStats, setWishlistStats] = useState(null);
    const [showWishlistStatsModal, setShowWishlistStatsModal] = useState(false);

    // --- ESTADOS PROFECO ⚖️ ---
    const [infractores, setInfractores] = useState([]);
    const [tiendaAMultar, setTiendaAMultar] = useState(null);
    const [montoMulta, setMontoMulta] = useState(5000);
    const [motivoMulta, setMotivoMulta] = useState('Inconsistencias reiteradas en precios');

    const isStore = user?.tipo_usuario === 'TIENDA';
    const isConsumer = user?.tipo_usuario === 'CONSUMIDOR';
    const isProfeco = user?.tipo_usuario === 'PROFECO';

    useEffect(() => {
        if (isProfeco) {
            fetchProfecoBoard();
        } else {
            fetchProducts();
            if (isConsumer) fetchPreferences();
            if (isStore) fetchMyPrices();
        }
    }, [user]);

    // --- CARGAS DE DATOS ---
    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data.data || []);
        } catch (error) { toast.error('Error cargando catálogo'); } finally { setLoading(false); }
    };

    // 👇 AQUÍ ESTÁ EL CAMBIO DE RUTA PARA PROFECO
    const fetchProfecoBoard = async () => {
        try {
            // Antes: /prices/profeco/tablero -> Ahora: /profeco/tablero
            const response = await api.get('/profeco/tablero');
            setInfractores(response.data.data || []);
        } catch (error) { toast.error('Error cargando tablero PROFECO'); } finally { setLoading(false); }
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

    const fetchPreferences = async () => {
        try {
            const response = await api.get('/prices/preferencias');
            if (response.data.success) {
                setWishlist(response.data.data.wishlist || []);
                setFavStores(response.data.data.tiendas_favoritas || []);
            }
        } catch (error) { }
    };

    const handleLogout = () => logout();

    // --- FUNCIONES COMUNES ---
    const toggleWishlist = async (e, productId) => {
        e.stopPropagation();
        const isLiked = wishlist.includes(productId);
        setWishlist(prev => isLiked ? prev.filter(id => id !== productId) : [...prev, productId]);
        try { await api.post('/prices/preferencias/wishlist', { producto_id: productId }); } catch (error) { }
    };
    const toggleFavStore = async (tiendaId) => {
        const isFav = favStores.includes(tiendaId);
        setFavStores(prev => isFav ? prev.filter(id => id !== tiendaId) : [...prev, tiendaId]);
        try { await api.post('/prices/preferencias/tiendas', { tienda_id: tiendaId }); } catch (error) { }
    };
    const handleSavePrice = async (product) => {
        const precio = pricesInput[product._id];
        if (!precio || precio <= 0) return toast.error('Precio inválido');
        try {
            await api.post('/prices', { producto_id: product._id, precio: parseFloat(precio), en_oferta: false });
            toast.success('Precio guardado');
            fetchMyPrices();
        } catch (error) { toast.error('Error al guardar'); }
    };
    const handleOpenOffer = (product) => { setOfferItem(product); setDiscountPercent(10); };
    const handleApplyOffer = async () => {
        if (!offerItem) return;
        try {
            await api.post('/prices/ofertas', { producto_id: offerItem._id, porcentaje: parseFloat(discountPercent), vigencia: null });
            toast.success('Oferta aplicada'); setOfferItem(null); fetchMyPrices();
        } catch (error) { toast.error('Error oferta'); }
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
    const handleViewPrices = async (product) => {
        setSelectedProduct(product); setShowModal(true); setLoadingPrices(true); setReportingItem(null); setRatingItem(null);
        try { const response = await api.get(`/prices/product/${product._id}`); setPricesList(response.data.data || []); } catch (error) { setPricesList([]); } finally { setLoadingPrices(false); }
    };
    const handleOpenReport = (priceItem) => { setReportingItem(priceItem); setRatingItem(null); setReportReason('PRECIO_MAYOR'); setReportComment(''); };
    const handleSubmitReport = async () => {
        if (!reportingItem) return; setSubmittingReport(true);
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
        }
        catch (error) {
            toast.error('Error reporte');
        } finally { setSubmittingReport(false); }
    };
    const handleOpenRate = (priceItem) => { setRatingItem(priceItem); setReportingItem(null); setRatingValue(5); setRatingComment(''); };
    const handleSubmitRating = async () => {
        if (!ratingItem) return; setSubmittingRating(true);
        try { await api.post('/prices/resenas', { tienda_id: ratingItem.tienda_id, tienda_nombre: ratingItem.tienda_nombre, calificacion: ratingValue, comentario: ratingComment }); toast.success(`Calificado`); setRatingItem(null); } catch (error) { toast.error('Error reseña'); } finally { setSubmittingRating(false); }
    };

    // --- LÓGICA PROFECO (MULTAS) ⚖️ ---
    const handleOpenMulta = (infractor) => {
        setTiendaAMultar(infractor);
        setMontoMulta(5000);
        setMotivoMulta('Acumulación de reportes por inconsistencias de precios');
    };

    const handleAplicarMulta = async () => {
        if (!tiendaAMultar) return;
        try {
            // Antes: /prices/profeco/multar -> Ahora: /profeco/multar
            await api.post('/profeco/multar', {
                tienda_id: tiendaAMultar._id,
                tienda_nombre: tiendaAMultar.tienda_nombre,
                monto: montoMulta,
                motivo: motivoMulta
            });
            toast.success(`Multa aplicada a ${tiendaAMultar.tienda_nombre}`);
            setTiendaAMultar(null);
            fetchProfecoBoard();
        } catch (error) {
            toast.error('Error al aplicar multa');
        }
    };

    // --- NUEVAS FUNCIONES PARA TIENDA ---
    const handleViewReviews = async (tiendaId) => {
        if (!tiendaId) return toast.error("Error: ID de tienda no encontrado");
        try {
            const response = await api.get(`/prices/resenas/tienda/${tiendaId}`);
            if (response.data.success) {
                setStoreReviews(response.data.data.resenas);
                setShowStoreReviewsModal(true);
            }
        } catch (error) { toast.error("Error cargando reseñas"); }
    };

    const handleViewWishlistStats = async (productId) => {
        try {
            const response = await api.get(`/prices/wishlist-stats/${productId}`);
            if (response.data.success) {
                setWishlistStats(response.data.data); // { count, emails }
                setShowWishlistStatsModal(true);
            }
        } catch (error) { toast.error("Error cargando estadísticas"); }
    };

    // Filtros
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        if (showWishlistOnly) return matchesSearch && wishlist.includes(product._id);
        return matchesSearch;
    });

    const filteredInfractores = infractores.filter(i =>
        i.tienda_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // RENDERIZADO DE MODALES
    const renderOfferModal = () => {
        if (!offerItem) return null;
        const priceData = myPrices[offerItem._id]; const hasActiveOffer = priceData?.en_oferta;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
                    <button onClick={() => setOfferItem(null)} className="absolute top-4 right-4 text-gray-400"><X size={24} /></button>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Gestionar Oferta</h3>
                    <p className="text-sm text-gray-500 mb-4">{offerItem.nombre}</p>
                    {hasActiveOffer ? (
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4 text-center">
                            <p className="text-red-800 font-bold text-lg mb-1">-{priceData.tipo_descuento}</p>
                            <p className="text-sm text-gray-600">Actual: <span className="font-bold">${priceData.precio}</span></p>
                        </div>
                    ) : (
                        <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-2">Descuento ({discountPercent}%)</label><input type="range" min="5" max="90" step="5" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className="w-full accent-profeco-600" /></div>
                    )}
                    <div className="flex gap-3">
                        {hasActiveOffer ? <button onClick={handleRemoveOffer} className="w-full border border-red-200 text-red-600 font-bold py-2 rounded-lg hover:bg-red-50 flex justify-center gap-2"><Trash2 size={18} /> Quitar</button> : <button onClick={handleApplyOffer} className="w-full bg-profeco-600 text-white font-bold py-2 rounded-lg hover:bg-profeco-700 flex justify-center gap-2"><Tag size={18} /> Aplicar</button>}
                    </div>
                </div>
            </div>
        );
    };

    const renderPriceModal = () => {
        if (!showModal || !selectedProduct) return null;
        let modalTitle = selectedProduct.nombre;
        if (reportingItem) modalTitle = 'Reportar Inconsistencia';
        if (ratingItem) modalTitle = `Calificar a ${ratingItem.tienda_nombre}`;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]">
                    <div className={`${ratingItem ? 'bg-yellow-500' : reportingItem ? 'bg-red-600' : 'bg-profeco-600'} p-4 flex justify-between items-center text-white shrink-0 transition-colors duration-300`}>
                        <div className="flex items-center gap-2 overflow-hidden">
                            {(reportingItem || ratingItem) && <button onClick={() => { setReportingItem(null); setRatingItem(null); }} className="hover:bg-white/20 p-1 rounded"><ArrowLeft size={20} /></button>}
                            <h3 className="font-bold text-lg truncate">{modalTitle}</h3>
                        </div>
                        <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded"><X size={24} /></button>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        {reportingItem ? (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">Motivo del reporte:</p>
                                <select className="w-full border p-2 rounded" value={reportReason} onChange={e => setReportReason(e.target.value)}><option value="PRECIO_MAYOR">Precio Mayor</option><option value="NO_EXISTENCIA">Sin Stock</option></select>
                                <textarea className="w-full border p-2 rounded" placeholder="Detalles..." value={reportComment} onChange={e => setReportComment(e.target.value)}></textarea>
                                <button onClick={handleSubmitReport} disabled={submittingReport} className="w-full bg-red-600 text-white py-2 rounded">Enviar</button>
                            </div>
                        ) : ratingItem ? (
                            <div className="space-y-4">
                                <div className="flex justify-center gap-2">{[1, 2, 3, 4, 5].map(s => <button key={s} onClick={() => setRatingValue(s)} className={ratingValue >= s ? 'text-yellow-400' : 'text-gray-300'}><Star fill="currentColor" /></button>)}</div>
                                <textarea className="w-full border p-2 rounded" placeholder="Opinión..." value={ratingComment} onChange={e => setRatingComment(e.target.value)}></textarea>
                                <button onClick={handleSubmitRating} disabled={submittingRating} className="w-full bg-yellow-500 text-white py-2 rounded">Calificar</button>
                            </div>
                        ) : (
                            loadingPrices ? <div className="text-center py-4">Cargando...</div> :
                                pricesList.length === 0 ? <div className="text-center py-8 text-gray-400">Sin precios.</div> :
                                    <table className="w-full">
                                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0"><tr><th className="text-left py-2">Tienda</th><th className="text-right">Precio</th><th className="text-center w-20">Acción</th></tr></thead>
                                        <tbody className="divide-y">
                                            {pricesList.map((p, idx) => (
                                                <tr key={idx} className={favStores.includes(p.tienda_id) ? 'bg-yellow-50' : ''}>
                                                    <td className="py-3 text-sm">
                                                        <div className="font-medium">{p.tienda_nombre}</div>
                                                        <div className="text-xs text-gray-400">{new Date(p.ultima_actualizacion).toLocaleDateString()}</div>
                                                        {p.en_oferta && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">OFERTA</span>}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        {p.en_oferta && <div className="text-xs text-gray-400 line-through">${p.precio_original}</div>}
                                                        <span className={`${p.en_oferta ? 'text-red-600' : 'text-green-600'} font-bold`}>${p.precio}</span>
                                                    </td>
                                                    <td className="py-3 text-center flex justify-center gap-1">
                                                        <button onClick={() => toggleFavStore(p.tienda_id)} className={favStores.includes(p.tienda_id) ? 'text-red-500' : 'text-gray-300'}><Heart size={16} fill="currentColor" /></button>
                                                        <button onClick={() => handleOpenRate(p)} className="text-gray-300 hover:text-yellow-500"><Star size={16} /></button>
                                                        <button onClick={() => handleOpenReport(p)} className="text-gray-300 hover:text-red-500"><AlertTriangle size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderMultaModal = () => {
        if (!tiendaAMultar) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-in fade-in backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-0 overflow-hidden">
                    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg flex items-center gap-2"><Gavel size={20} /> Sancionar Establecimiento</h3>
                        <button onClick={() => setTiendaAMultar(null)} className="hover:bg-white/20 p-1 rounded"><X size={20} /></button>
                    </div>
                    <div className="p-6">
                        <div className="mb-6 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Scale size={32} className="text-gray-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{tiendaAMultar.tienda_nombre}</h2>
                            <p className="text-red-600 font-medium bg-red-50 inline-block px-3 py-1 rounded-full text-sm mt-2">
                                {tiendaAMultar.total_quejas} Reportes Pendientes
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Monto de la Multa (MXN)</label>
                                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" className="w-full pl-7 p-3 border border-gray-300 rounded-lg font-bold text-lg outline-none focus:ring-2 focus:ring-gray-800" value={montoMulta} onChange={(e) => setMontoMulta(e.target.value)} /></div>
                            </div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-1">Motivo Legal</label><textarea className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-800 text-sm" rows="3" value={motivoMulta} onChange={(e) => setMotivoMulta(e.target.value)}></textarea></div>
                            <button onClick={handleAplicarMulta} className="w-full bg-red-700 text-white font-bold py-3.5 rounded-lg hover:bg-red-800 transition shadow-lg flex items-center justify-center gap-2 mt-2"><Gavel size={20} /> IMPONER MULTA</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderStoreReviewsModal = () => {
        if (!showStoreReviewsModal) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[80vh] flex flex-col">
                    <button onClick={() => setShowStoreReviewsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Star className="text-yellow-500" fill="currentColor" /> Reseñas de tu Tienda
                    </h3>

                    <div className="overflow-y-auto flex-1 space-y-4">
                        {storeReviews.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Aún no tienes reseñas.</p>
                        ) : (
                            storeReviews.map((review) => (
                                <div key={review._id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-gray-700">{review.usuario_nombre}</span>
                                        <div className="flex text-yellow-400 text-sm">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.calificacion ? "currentColor" : "none"} className={i < review.calificacion ? "" : "text-gray-300"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm italic">"{review.comentario}"</p>
                                    <span className="text-xs text-gray-400 mt-2 block">{new Date(review.fecha).toLocaleDateString()}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderWishlistStatsModal = () => {
        if (!showWishlistStatsModal || !wishlistStats) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
                    <button onClick={() => setShowWishlistStatsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                        <Heart className="text-pink-500" fill="currentColor" /> Interesados
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">Usuarios que guardaron este producto</p>

                    <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-gray-800">{wishlistStats.count}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider font-bold">Usuarios Totales</div>
                    </div>

                    {wishlistStats.emails.length > 0 && (
                        <div className="bg-pink-50 rounded-xl p-4 max-h-40 overflow-y-auto">
                            <p className="text-xs font-bold text-pink-400 uppercase mb-2">Lista de Contacto</p>
                            <ul className="space-y-2">
                                {wishlistStats.emails.map((email, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-pink-400"></div> {email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) return <div className="flex h-screen items-center justify-center font-bold text-gray-500">Cargando Sistema...</div>;

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            <nav className={`shadow-sm sticky top-0 z-10 px-6 py-3 flex justify-between items-center gap-4 ${isProfeco ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl ${isProfeco ? 'bg-white text-gray-900' : 'bg-profeco-600 text-white'}`}>{isProfeco ? <Scale size={18} /> : 'P'}</div>
                    <h1 className="hidden sm:block text-lg font-bold">{isProfeco ? 'Panel PROFECO' : 'ProFeCo'}</h1>
                </div>
                <div className="flex-1 max-w-md relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isProfeco ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
                    <input type="text" placeholder={isProfeco ? "Buscar establecimiento..." : "Buscar producto..."} className={`w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none border ${isProfeco ? 'bg-gray-700 text-white border-gray-600 focus:border-gray-400 placeholder-gray-400' : 'bg-gray-100 border-transparent focus:bg-white focus:border-profeco-500'}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex gap-2">
                    {isConsumer && <button onClick={() => setShowWishlistOnly(!showWishlistOnly)} className={`p-2 rounded-full flex items-center gap-2 px-3 text-sm font-medium ${showWishlistOnly ? 'bg-red-50 text-red-500' : 'text-gray-500'}`}><Heart size={20} fill={showWishlistOnly ? "currentColor" : "none"} /><span className="hidden md:inline">Favoritos</span></button>}
                    <button onClick={handleLogout} className={`${isProfeco ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-red-600'} p-2`}><LogOut size={20} /></button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
                {isProfeco ? (
                    <div>
                        <div className="mb-6"><h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><AlertTriangle className="text-orange-500" /> Establecimientos Reportados</h2><p className="text-gray-500">Tiendas con inconsistencias pendientes de revisión.</p></div>
                        {filteredInfractores.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm p-12 text-center"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Scale size={32} className="text-green-600" /></div><h3 className="text-xl font-bold text-gray-800">Todo en orden</h3><p className="text-gray-500 mt-2">No hay establecimientos con reportes pendientes.</p></div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredInfractores.map((tienda) => (
                                    <div key={tienda._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                                        <div className="p-6 border-b border-gray-50"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500 text-xl">{tienda.tienda_nombre.charAt(0)}</div><span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">{tienda.total_quejas} Quejas</span></div><h3 className="text-lg font-bold text-gray-800 mb-1">{tienda.tienda_nombre}</h3><p className="text-xs text-gray-400">ID: {tienda._id}</p></div>
                                        <div className="p-4 bg-gray-50 text-xs text-gray-500 space-y-2"><p className="font-bold uppercase tracking-wider text-gray-400">Últimos motivos:</p><ul className="list-disc list-inside space-y-1">{tienda.quejas_detalle.slice(0, 3).map((q, i) => (<li key={i}>{q.motivo} <span className="text-gray-400">- {new Date(q.fecha).toLocaleDateString()}</span></li>))}</ul></div>
                                        <div className="p-4"><button onClick={() => handleOpenMulta(tienda)} className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"><Gavel size={18} /> SANCIONAR</button></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="mb-6"><h2 className="text-2xl font-bold text-gray-800">{isStore ? 'Mis Precios & Ofertas' : showWishlistOnly ? 'Mi Wishlist ❤️' : 'Catálogo'}</h2></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => {
                                const myPriceData = isStore ? myPrices[product._id] : null; const hasOffer = myPriceData?.en_oferta;
                                return (
                                    <div key={product._id} className={`bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden border ${hasOffer ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-100'} flex flex-col relative`}>
                                        {isConsumer && <button onClick={(e) => toggleWishlist(e, product._id)} className="absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full hover:scale-110"><Heart size={20} className={wishlist.includes(product._id) ? "text-red-500 fill-red-500" : "text-gray-400"} /></button>}
                                        {isStore && hasOffer && <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">-{myPriceData.tipo_descuento}</div>}
                                        <div className="h-48 p-6 flex items-center justify-center border-b border-gray-50"><img src={product.imagen_url} alt={product.nombre} className="max-h-full max-w-full object-contain" /></div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="mb-4 flex-1"><p className="text-xs font-bold text-gray-400 uppercase mb-1">{product.marca}</p><h3 className="text-base font-bold text-gray-800 line-clamp-2">{product.nombre}</h3></div>
                                            <div className="mt-auto pt-3 border-t border-gray-50">
                                                {isStore ? (
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex gap-2 items-center">
                                                            {hasOffer ? (
                                                                <div className="flex-1 flex justify-between items-center"><div><span className="text-xs text-gray-400 line-through">${myPriceData.precio_original}</span><div className="text-lg font-bold text-red-600">${myPriceData.precio}</div></div><button onClick={() => handleOpenOffer(product)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100"><Tag size={18} /></button></div>
                                                            ) : (
                                                                <><div className="relative w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span><input type="number" placeholder={myPriceData?.precio || "0.00"} className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg outline-none font-bold text-gray-700 text-sm focus:ring-1 focus:ring-profeco-500" onChange={(e) => setPricesInput({ ...pricesInput, [product._id]: e.target.value })} /></div><button onClick={() => handleSavePrice(product)} className="bg-profeco-600 text-white p-2 rounded-lg hover:bg-profeco-700"><Save size={18} /></button>{myPriceData && <button onClick={() => handleOpenOffer(product)} className="bg-gray-100 text-gray-500 p-2 rounded-lg hover:bg-gray-200"><Tag size={18} /></button>}</>
                                                            )}
                                                        </div>
                                                        {/* NUEVOS BOTONES PARA TIENDA */}
                                                        <div className="flex gap-2 mt-1">
                                                            <button onClick={() => handleViewReviews(myPriceData?.tienda_id)} className="flex-1 bg-yellow-50 text-yellow-600 border border-yellow-200 text-xs font-bold py-2 rounded-lg hover:bg-yellow-100 flex justify-center gap-1 items-center">
                                                                <Star size={14} /> Reseñas
                                                            </button>
                                                            <button onClick={() => handleViewWishlistStats(product._id)} className="flex-1 bg-pink-50 text-pink-600 border border-pink-200 text-xs font-bold py-2 rounded-lg hover:bg-pink-100 flex justify-center gap-1 items-center">
                                                                <Heart size={14} /> Wishlist
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (<button onClick={() => handleViewPrices(product)} className="w-full bg-white border border-profeco-200 text-profeco-600 hover:bg-profeco-50 font-bold py-2 rounded-lg flex items-center justify-center gap-2 text-sm"><Eye size={16} /> Ver Precios</button>)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>

            {renderPriceModal()}
            {renderOfferModal()}
            {renderMultaModal()}
            {renderStoreReviewsModal()}
            {renderWishlistStatsModal()}
        </div>
    );
}