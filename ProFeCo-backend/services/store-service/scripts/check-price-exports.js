console.log('🎯 VERIFICACIÓN FINAL CORREGIDA');

Promise.all([
  import('../product-service/src/repositories/product.repository.js'),
  import('../product-service/src/repositories/price.repository.js'), 
  import('../store-service/src/repositories/tienda.repository.js')
])
.then(([productModule, priceModule, tiendaModule]) => {
  console.log('✅ Módulos cargados:');
  console.log('   Product (default):', typeof productModule.default);
  console.log('   Price (default):', typeof priceModule.default);
  console.log('   Tienda (named):', Object.keys(tiendaModule));
  
  // Crear instancias CORRECTAMENTE
  const productRepo = new productModule.default(); // ✅ Default
  const priceRepo = new priceModule.default(); // ✅ Default
  const tiendaRepo = new tiendaModule.TiendaRepository(); // ✅ Named
  
  console.log('🎉 ¡TODAS LAS INSTANCIAS CREADAS EXITOSAMENTE!');
  console.log('🚀 Ahora el seed debería funcionar...');
})
.catch(error => {
  console.error('💥 ERROR:', error.message);
});