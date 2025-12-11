// scripts/debug-seed.js
console.log('🔍 INICIANDO DEBUG - Paso 1: Script ejecutándose');

try {
  console.log('🔍 Paso 2: Intentando importar SeedService desde la raíz de services/...');
  
  
 import('../seed.service.js')
    .then(module => {
      console.log('✅ SeedService importado correctamente desde services/');
      
      const { SeedService } = module;
      console.log('🔍 Paso 3: Creando instancia de SeedService...');
      
      const seedService = new SeedService();
      console.log('✅ SeedService instanciado');
      
      console.log('🔍 Paso 4: Ejecutando seeding completo...');
      return seedService.crearUsuariosYTiendasCompleto();
    })
    .then(resultado => {
      console.log('🎉 ¡SEED EXITOSO!');
      console.log('📊 Resultado:', resultado);
    })
    .catch(error => {
      console.error('💥 ERROR en el proceso:');
      console.error('   Mensaje:', error.message);
      console.error('   Stack:', error.stack);
    });

} catch (error) {
  console.error('💥 ERROR en importación síncrona:');
  console.error('   Mensaje:', error.message);
}

console.log('🔍 FIN DEL SCRIPT');