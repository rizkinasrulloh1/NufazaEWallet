import prisma from '../prisma/client';

export const createAccount = async (name: string, email: string) => {
    return await prisma.account.create({
        data: { name, email },
    });
};

export const getBalance = async (accountId: number) => {
    const account = await prisma.account.findUnique({
        where: { id: accountId },
    });
    return account?.balance || 0;
};

export const deposit = async (accountId: number, amount: number) => {
    return await prisma.account.update({
        where: { id: accountId },
        data: { balance: { increment: amount } },
    });
};

export const withdraw = async (accountId: number, amount: number) => {
    const account = await prisma.account.findUnique({
        where: { id: accountId },
    });
    if (account?.balance < amount) {
        throw new Error('Insufficient balance');
    }
    return await prisma.account.update({
        where: { id: accountId },
        data: { balance: { decrement: amount } },
    });
};

export const transfer = async (fromAccountId: number, toAccountId: number, amount: number) => {
    const fromAccount = await prisma.account.findUnique({
        where: { id: fromAccountId },
    });
    if (fromAccount?.balance < amount) {
        throw new Error('Insufficient balance');
    }
    await prisma.account.update({
        where: { id: fromAccountId },
        data: { balance: { decrement: amount } },
    });
    return await prisma.account.update({
        where: { id: toAccountId },
        data: { balance: { increment: amount } },
    });
};
