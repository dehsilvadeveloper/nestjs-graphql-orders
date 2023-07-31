import { PrismaClient } from '@prisma/client';
import { storeSeederData } from './seeders-data/store.seeder.data';

export async function seedStore(prisma: PrismaClient): Promise<void> {
  try {
    console.info('Seeding table store...');

    for (const data of storeSeederData) {
      await prisma.store.create({ data });
    }

    console.info('Data inserted with success on the table store.');
  } catch (error) {
    console.error('An error occurred during seeding of table store.', error);
    throw error;
  }
}
