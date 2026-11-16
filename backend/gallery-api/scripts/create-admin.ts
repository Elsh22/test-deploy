
import 'dotenv/config';
import { input, password } from '@inquirer/prompts';
import * as argon2 from 'argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is missing');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    const email = (await input({
      message: 'Administrator email:',
    })).trim().toLowerCase();

    const adminPassword = await password({
      message: 'Administrator password:',
      mask: '*',
    });

    if (adminPassword.length < 12) {
      throw new Error('Password must be at least 12 characters');
    }

    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existing) {
      throw new Error('Administrator already exists');
    }

    const passwordHash = await argon2.hash(adminPassword, {
      type: argon2.argon2id,
    });

    await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });

    console.log('Administrator created successfully');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
