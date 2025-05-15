
import { PrismaClient } from './generated/prisma/client'
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function main() {
  try {
    const account = await prisma.account.create({
      data: {
        name: 'Rizki Nasrulloh',
        email: 'rizkinasrulloh1@gmail.com',
      },
    });
    console.log('Akun baru berhasil dibuat:', account);
  } catch (error) {
    console.error('Gagal membuat akun:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

