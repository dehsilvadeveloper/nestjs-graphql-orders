import { PrismaClient } from '@prisma/client';
import { orderStatusSeederData } from './seeders-data/order-status.seeder.data';

export async function seedOrderStatus(prisma: PrismaClient): Promise<void> {
  try {
    console.info('Seeding table order_status...');

    for (const data of orderStatusSeederData) {
      await prisma.orderStatus.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }

    console.info('Data inserted with success on the table order_status.');
  } catch (error) {
    console.error('An error occurred during seeding of table order_status.', error);
    throw error;
  }
}
