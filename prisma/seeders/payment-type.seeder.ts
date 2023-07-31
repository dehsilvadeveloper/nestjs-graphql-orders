import { PrismaClient } from '@prisma/client';
import { paymentTypeSeederData } from './seeders-data/payment-type.seeder.data';

export async function seedPaymentType(prisma: PrismaClient): Promise<void> {
  try {
    console.info('Seeding table payment_type...');

    for (const data of paymentTypeSeederData) {
      await prisma.paymentType.upsert({
        where: { id: data.id },
        update: data,
        create: data,
      });
    }

    console.info('Data inserted with success on the table payment_type.');
  } catch (error) {
    console.error('An error occurred during seeding of table payment_type.', error);
    throw error;
  }
}
