import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- IMPORTANTE: Usamos tu contexto
import api from '../services/api'; 
import { toast } from 'react-hot-toast';
import { 
  LogOut, Save, Eye, X, ShoppingBag 
} from 'lucide-react';

export default function Dashboard() {
  // 1. En lugar de leer localStorage, usamos tu Contexto
  const { user, logout } = useAuth(); 
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para Tienda y Consumidor...
  const [pricesInput, setPricesInput] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pricesList, setPricesList] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // --- FUNCIÓN DE LOGOUT CORREGIDA ---
  const handleLogout = () => {
    logout(); // Llamamos a la función de tu AuthContext
    // No hace falta navigate('/login') porque tu ProtectedRoute 
    // detectará que ya no estás autenticado y te sacará automáticamente.
  };

  // ... (El resto de las funciones handleSavePrice y handleViewPrices siguen igual)
  const handleSavePrice = async (product) => {
     /* ... código igual al anterior ... */
     const precio = pricesInput[product._id];
     if (!precio || precio <= 0) return toast.error('Precio inválido');
     try {
       await api.post('/prices', { producto_id: product._id, precio: parseFloat(precio), en_oferta: false });
       toast.success('Precio actualizado');
     } catch (error) { toast.error('Error al guardar'); }
  };

  const handleViewPrices = async (product) => {
     /* ... código igual al anterior ... */
    setSelectedProduct(product);
    setShowModal(true);
    setLoadingPrices(true);
    try {
        const response = await api.get(`/prices/product/${product._id}`);
        setPricesList(response.data.data || []);
    } catch (error) { setPricesList([]); } finally { setLoadingPrices(false); }
  };

  const renderPriceModal = () => {
    /* ... (Mismo código del modal que te pasé antes) ... */
    if (!showModal || !selectedProduct) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-profeco-600 p-4 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg truncate pr-4">{selectedProduct.nombre}</h3>
            <button onClick={() => setShowModal(false)}><X size={24} /></button>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {loadingPrices ? <div className="text-center py-4">Buscando...</div> : 
             pricesList.length === 0 ? <div className="text-center py-4 text-gray-500">Sin precios registrados</div> :
             (
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {pricesList.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{p.tienda?.nombre || 'Tienda'}</td>
                      <td className="px-4 py-3 text-right text-green-600 font-bold">${parseFloat(p.precio).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
             )
            }
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Cargando Sistema...</div>;

  const isStore = user?.tipo_usuario === 'TIENDA';

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-profeco-600 rounded flex items-center justify-center text-white font-bold">P</div>
           <div>
             <h1 className="text-xl font-bold text-gray-800 leading-none">Sistema ProFeCo</h1>
             <p className="text-xs text-gray-500">Hola, {user?.nombre}</p>
           </div>
        </div>
        <button 
            onClick={handleLogout} 
            className="text-gray-500 hover:text-red-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
            <LogOut size={18} /> <span className="hidden sm:inline">Salir</span>
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{isStore ? 'Mis Precios' : 'Catálogo'}</h2>
            <p className="text-gray-500">{isStore ? 'Gestiona tus costos' : 'Compara ofertas'}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-48 p-6 bg-gray-50 flex items-center justify-center relative">
                 <img src={product.imagen_url || 'https://via.placeholder.com/150'} alt={product.nombre} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                 <span className="absolute top-3 right-3 bg-white px-2 py-1 text-xs font-bold text-gray-600 rounded shadow-sm">{product.contenido} {product.unidad_medida}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                  <p className="text-xs font-semibold text-profeco-500 uppercase mb-1">{product.marca}</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{product.nombre}</h3>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  {isStore ? (
                    <div className="flex gap-2 items-center">
                      <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input type="number" placeholder="0.00" className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-profeco-500 outline-none font-bold text-gray-700"
                          onChange={(e) => setPricesInput({...pricesInput, [product._id]: e.target.value})}
                        />
                      </div>
                      <button onClick={() => handleSavePrice(product)} className="bg-profeco-600 text-white p-2.5 rounded-lg"><Save size={20} /></button>
                    </div>
                  ) : (
                    <button onClick={() => handleViewPrices(product)} className="w-full bg-white border-2 border-profeco-100 text-profeco-600 hover:bg-profeco-50 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 group">
                      <Eye size={18} /> Ver Ofertas
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {renderPriceModal()}
    </div>
  );
}