import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const client = globalForPrisma.prisma ?? new PrismaClient();

// using this, because of Next JS hot preloading (on every code change our code updates and reruns)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client

export default client;
