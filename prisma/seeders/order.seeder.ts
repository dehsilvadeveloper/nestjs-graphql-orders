import { PrismaClient } from '@prisma/client';
import { orderSeederData } from './seeders-data/order.seeder.data';

export async function seedOrder(prisma: PrismaClient): Promise<void> {
  try {
    console.info('Seeding table order...');

    for (const data of orderSeederData) {
      await prisma.order.create({ data });
    }

    console.info('Data inserted with success on the table order.');
  } catch (error) {
    console.error('An error occurred during seeding of table order.', error);
    throw error;
  }
}
