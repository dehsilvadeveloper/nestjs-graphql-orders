import { PrismaClient } from '@prisma/client';
import { seedPaymentType } from './payment-type.seeder';
import { seedOrderStatus } from './order-status.seeder';
import { seedStore } from './store.seeder';
import { seedOrder } from './order.seeder';

async function seedDatabase(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    console.info('Starting database seeding ...');

    await seedPaymentType(prisma);
    await seedOrderStatus(prisma);
    await seedStore(prisma);
    await seedOrder(prisma);

    console.info('Database seeding completed.');
  } catch (error) {
    console.error('Error occurred during database seeding.', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
