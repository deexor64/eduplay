// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { seedTeacher } from './seeds/users';

const prisma = new PrismaClient();

async function main() {
  
  await seedTeacher(prisma);
  
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
