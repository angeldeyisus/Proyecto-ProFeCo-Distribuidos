import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Importamos navegación
import api from '../../services/api';
import { toast } from 'react-hot-toast';
// Agregamos el icono LogOut
import { Search, DollarSign, Tag, Save, Loader, LogOut } from 'lucide-react';

export default function ManagePrices() {
  const navigate = useNavigate(); // <--- Hook para redirigir
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pricesInput, setPricesInput] = useState({});

  // 1. Cargar el catálogo de productos al entrar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products'); 
      const listaProductos = response.data.data || [];
      setProducts(listaProductos);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar el catálogo de productos');
    } finally {
      setLoading(false);
    }
  };

  // 2. Manejar el cambio en el input de precio
  const handlePriceChange = (productId, value) => {
    setPricesInput({
      ...pricesInput,
      [productId]: value
    });
  };

  // 3. Enviar el precio al backend
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
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error al guardar precio');
    }
  };

  // 4. Función para Cerrar Sesión
  const handleLogout = () => {
    // Borramos el token del almacenamiento local
    localStorage.removeItem('token'); 
    // Redirigimos al usuario al login
    navigate('/login');
    toast.success('Has cerrado sesión correctamente');
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

            {/* --- BOTÓN DE CERRAR SESIÓN --- */}
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
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              
              {/* Imagen y Datos del Producto */}
              <div className="p-4 flex gap-4">
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
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      step="0.50"
                      min="0"
                      placeholder="0.00"
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
                </div>
              </div>

            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No hay productos en el catálogo global para mostrar.
          </div>
        )}

      </div>
    </div>
  );
}