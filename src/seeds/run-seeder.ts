import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module'; // or your main root module
import { DataSource } from 'typeorm';
import { seedDatabase } from './seeder';

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  //   await seedDatabase(dataSource);

  await app.close();
}

runSeeder().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
