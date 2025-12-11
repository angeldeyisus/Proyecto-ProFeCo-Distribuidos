import { SeedService } from '../../seed.service.js';

async function testSeed() {
  try {
    console.log('🧪 Probando seeding...');
    const seedService = new SeedService();
    const resultado = await seedService.crearUsuariosYTiendasCompleto();
    console.log('✅ Seed exitoso:', resultado);
  } catch (error) {
    console.error('❌ Error en seed:', error);
  }
}

testSeed();