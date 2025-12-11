// scripts/verify-path.js
console.log('🔍 VERIFICANDO RUTA EXACTA...');

const fs = require('fs');
const path = require('path');

// Ruta que debería funcionar
const targetPath = './product-service/src/repositories/product.repository.js';
const fullPath = path.resolve(__dirname, '..', '..', targetPath);

console.log('Ruta relativa:', targetPath);
console.log('Ruta completa:', fullPath);
console.log('¿Existe?:', fs.existsSync(fullPath) ? '✅ SÍ' : '❌ NO');

// Lista archivos en product-service/src/repositories/
const repoPath = path.join(__dirname, '..', '..', 'product-service', 'src', 'repositories');
console.log('Archivos en repositories/:');
try {
  const files = fs.readdirSync(repoPath);
  files.forEach(file => console.log('  -', file));
} catch (e) {
  console.log('Error leyendo directorio:', e.message);
}