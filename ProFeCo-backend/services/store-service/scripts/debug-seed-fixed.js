// scripts/debug-seed-fixed.js
console.log('🔍 DEBUG CON RUTA CORRECTA - INICIANDO');

import('../../seed.service.js')
  .then(module => {
    console.log('✅ SeedService importado correctamente desde services/');
    
    const { SeedService } = module;
    const seedService = new SeedService();
    console.log('✅ SeedService instanciado');
    
    console.log('🚀 Ejecutando seeding completo...');
    return seedService.crearUsuariosYTiendasCompleto();
  })
  .then(resultado => {
    console.log('🎉 ¡SEED EXITOSO!');
    console.log('📊 Resultados:');
    console.log('   👥 Usuarios:', resultado.usuarios);
    console.log('   🏪 Tiendas:', resultado.tiendas);
    console.log('   📦 Productos:', resultado.productos);
    console.log('   💰 Precios:', resultado.precios);
  })
  .catch(error => {
    console.error('💥 ERROR:', error.message);
    
    if (error.message.includes('Cannot find module')) {
      console.log('🔍 Verificando archivo...');
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '../../seed.service.js');
      console.log('   Ruta completa:', filePath);
      console.log('   ¿Existe?:', fs.existsSync(filePath) ? '✅ SÍ' : '❌ NO');
    }
  });

console.log('🔍 SCRIPT EJECUTÁNDOSE...');