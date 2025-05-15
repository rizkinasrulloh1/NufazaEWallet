"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferBetweenAccounts = exports.withdrawFromAccount = exports.depositToAccount = exports.createAccount = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createAccount = async (name, email) => {
    const existing = await client_1.default.account.findUnique({ where: { email } });
    if (existing)
        throw new Error('Email is already registered');
    return client_1.default.account.create({ data: { name, email } });
};
exports.createAccount = createAccount;
// DEPOSIT
const depositToAccount = async (id, amount) => {
    if (amount <= 0)
        throw new Error('Deposit amount must be greater than 0'); // Semua transaksi dicek agar amount > 0.
    const account = await client_1.default.account.findUnique({ where: { id } });
    if (!account)
        throw new Error('Account not found');
    const updatedAccount = await client_1.default.account.update({
        where: { id },
        data: { balance: { increment: amount } },
    });
    await client_1.default.transaction.create({
        data: {
            toAccountId: id,
            amount,
            type: 'DEPOSIT',
        },
    });
    return { balance: updatedAccount.balance };
};
exports.depositToAccount = depositToAccount;
// WITHDRAW
const withdrawFromAccount = async (id, amount) => {
    if (amount <= 0)
        throw new Error('Withdraw amount must be greater than 0');
    const account = await client_1.default.account.findUnique({ where: { id } });
    if (!account)
        throw new Error('Account not found');
    if (account.balance < amount)
        throw new Error('Insufficient balance');
    const updatedAccount = await client_1.default.account.update({
        where: { id },
        data: { balance: { decrement: amount } },
    });
    await client_1.default.transaction.create({
        data: {
            fromAccountId: id,
            amount,
            type: 'WITHDRAW',
        },
    });
    return { balance: updatedAccount.balance };
};
exports.withdrawFromAccount = withdrawFromAccount;
// TRANSFER
//Untuk transfer, update saldo dilakukan dalam satu transaksi database (prisma.$transaction) agar konsisten.
const transferBetweenAccounts = async (fromId, toId, amount) => {
    if (amount <= 0)
        throw new Error('Transfer amount must be greater than 0');
    if (fromId === toId)
        throw new Error('Cannot transfer to the same account');
    const fromAccount = await client_1.default.account.findUnique({ where: { id: fromId } });
    const toAccount = await client_1.default.account.findUnique({ where: { id: toId } });
    if (!fromAccount || !toAccount)
        throw new Error('Account not found');
    if (fromAccount.balance < amount)
        throw new Error('Insufficient balance');
    const [updatedFrom, updatedTo] = await client_1.default.$transaction([
        client_1.default.account.update({
            where: { id: fromId },
            data: { balance: { decrement: amount } },
        }),
        client_1.default.account.update({
            where: { id: toId },
            data: { balance: { increment: amount } },
        }),
    ]);
    await client_1.default.transaction.create({
        data: {
            fromAccountId: fromId,
            toAccountId: toId,
            amount,
            type: 'TRANSFER',
        },
    });
    return {
        fromBalance: updatedFrom.balance,
        toBalance: updatedTo.balance,
    };
};
exports.transferBetweenAccounts = transferBetweenAccounts;
//Saldo dicek untuk withdraw dan transfer agar tidak minus.
//Semua transaksi dicatat di tabel transactions.
