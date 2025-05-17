import prisma from '../prisma/client';

// Register akun
export const createAccount = async (name: string, email: string) => {
  const existing = await prisma.account.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');
  return prisma.account.create({ data: { name, email } });
};

// ✅ Fungsi yang dicari:
export const getAccountBalance = async (id: number) => {
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) throw new Error('Account not found');
  return account.balance;
};

export const depositToAccount = async (id: number, amount: number) => {
  if (amount <= 0) throw new Error('Amount must be > 0');
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) throw new Error('Account not found');
  const updated = await prisma.account.update({
    where: { id },
    data: { balance: { increment: amount } },
  });
  return updated;
};

export const withdrawFromAccount = async (id: number, amount: number) => {
  if (amount <= 0) throw new Error('Amount must be > 0');
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) throw new Error('Account not found');
  if (account.balance < amount) throw new Error('Insufficient balance');
  const updated = await prisma.account.update({
    where: { id },
    data: { balance: { decrement: amount } },
  });
  return updated;
};

export const transferBetweenAccounts = async (fromId: number, toId: number, amount: number) => {
  if (amount <= 0) throw new Error('Amount must be > 0');
  if (fromId === toId) throw new Error('Cannot transfer to self');

  const [from, to] = await Promise.all([
    prisma.account.findUnique({ where: { id: fromId } }),
    prisma.account.findUnique({ where: { id: toId } }),
  ]);
  if (!from || !to) throw new Error('Account not found');
  if (from.balance < amount) throw new Error('Insufficient balance');

  const [updatedFrom, updatedTo] = await prisma.$transaction([
    prisma.account.update({ where: { id: fromId }, data: { balance: { decrement: amount } } }),
    prisma.account.update({ where: { id: toId }, data: { balance: { increment: amount } } }),
  ]);

  return { fromBalance: updatedFrom.balance, toBalance: updatedTo.balance };
};

//Fungsi Get Transaction
export const getTransactions = async (id: number) => {
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) throw new Error('Account not found');

  return prisma.transaction.findMany({
    where: {
      OR: [
        { fromAccountId: id },
        { toAccountId: id }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
};
