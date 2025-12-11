// scripts/final-seed-test.js
console.log('🎯 TEST FINAL DEL SEED CON DEPENDENCIAS INSTALADAS');

import('../../seed.service.js')
  .then(async (module) => {
    console.log('✅ SeedService cargado correctamente');
    
    const { SeedService } = module;
    console.log('🔧 Creando instancia de SeedService...');
    
    const seedService = new SeedService();
    console.log('✅ SeedService instanciado');
    
    console.log('🚀 INICIANDO SEED COMPLETO...');
    console.log('📋 Esto creará:');
    console.log('   👥 10 usuarios TIENDA');
    console.log('   🏪 10 tiendas');
    console.log('   📦 21 productos');
    console.log('   💰 210 precios (10 tiendas × 21 productos)');
    
    const resultado = await seedService.crearUsuariosYTiendasCompleto();
    
    console.log('\n🎉 ¡SEED COMPLETADO EXITOSAMENTE!');
    console.log('📊 RESULTADOS:');
    console.log('   👥 Usuarios creados:', resultado.usuarios);
    console.log('   🏪 Tiendas creadas:', resultado.tiendas);
    console.log('   📦 Productos creados:', resultado.productos);
    console.log('   💰 Precios creados:', resultado.precios);
    
    if (resultado.mensaje) {
      console.log('💡 Nota:', resultado.mensaje);
    }
    
    console.log('\n🔐 CREDENCIALES DE PRUEBA:');
    console.log('   Puedes usar estos usuarios para login:');
    console.log('   Email: super.esperanza@profeco.com');
    console.log('   Password: password123');
    console.log('   (Y los otros 9 usuarios similares)');
    
  })
  .catch(error => {
    console.error('💥 ERROR DURANTE EL SEED:', error.message);
    console.error('🔍 Stack completo:', error.stack);
    
    // Errores comunes y sus soluciones
    if (error.message.includes('bcrypt')) {
      console.log('🔧 bcrypt error - Las dependencias no se cargan correctamente');
    }
    if (error.message.includes('prisma')) {
      console.log('🔧 Prisma error - Verifica la conexión a PostgreSQL');
    }
    if (error.message.includes('mongoose')) {
      console.log('🔧 Mongoose error - Verifica la conexión a MongoDB');
    }
    if (error.message.includes('Cannot find module')) {
      console.log('🔧 Module error - Revisa las rutas de importación en seed.service.js');
    }
  });

console.log('🔍 Script iniciado...');