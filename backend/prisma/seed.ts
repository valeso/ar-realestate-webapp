import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const seller = await prisma.user.upsert({
    where: { email: 'seller@example.com' },
    update: {},
    create: {
      email: 'seller@example.com',
      password: 'hashed_password_here',
      fullName: 'John Seller',
      role: 'SELLER',
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      password: 'hashed_password_here',
      fullName: 'Jane Buyer',
      role: 'BUYER',
    },
  });

  // Create sample property
  const property = await prisma.property.upsert({
    where: { id: 'property-1' },
    update: {},
    create: {
      id: 'property-1',
      userId: seller.id,
      title: 'Beautiful Downtown House',
      description: '3 bedroom, 2 bathroom house with modern design',
      price: BigInt(450000),
      propertyType: 'HOUSE',
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 2500,
      address: '123 Main St, Downtown, CA 90210',
      latitude: 34.0522,
      longitude: -118.2437,
    },
  });

  console.log('Database seeded successfully!');
  console.log({ seller, buyer, property });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
