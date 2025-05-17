import { Request, Response } from 'express';
import prisma from '../prisma/client';
import {
  createAccount,
  getAccountBalance,
  depositToAccount,
  withdrawFromAccount,
  transferBetweenAccounts,
  getTransactions
} from '../services/accountService';

// ✅ Register akun
export const registerAccount = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const account = await createAccount(name, email);
    res.status(201).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Check Balance
export const checkBalance = async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id);
  try {
    const balance = await getAccountBalance(accountId);
    res.json({ balance });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// ✅ Deposit
export const depositFunds = async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id);
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero' });
  }
  try {
    const account = await depositToAccount(accountId, amount);
    res.json({ balance: account.balance });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Withdraw
export const withdrawFunds = async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id);
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero' });
  }
  try {
    const account = await withdrawFromAccount(accountId, amount);
    res.json({ balance: account.balance });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Transfer
export const transferFunds = async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id);
  const { toAccountId, amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than zero' });
  }
  try {
    const result = await transferBetweenAccounts(accountId, toAccountId, amount);
    res.json(result); // result = { fromBalance, toBalance }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const transactionHistory = async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id);
  try {
    const transactions = await getTransactions(accountId);
    res.json(transactions);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
