import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Reuse client in dev, create fresh in prod
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
