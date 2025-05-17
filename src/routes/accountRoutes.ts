import express, { Request, Response } from 'express';
import {
  registerAccount,
  checkBalance,
  depositFunds,
  withdrawFunds,
  transferFunds,
  transactionHistory
} from '../controllers/accountController';

const router = express.Router();

// Register akun
router.post('/accounts', (req: Request, res: Response) => {
  registerAccount(req, res).catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Cek saldo
router.get('/accounts/:id/balance', (req: Request, res: Response) => {
  checkBalance(req, res).catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Deposit
router.post('/accounts/:id/deposit', (req: Request, res: Response) => {
  depositFunds(req, res).catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Withdraw
router.post('/accounts/:id/withdraw', (req: Request, res: Response) => {
  withdrawFunds(req, res).catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Transfer
router.post('/accounts/:id/transfer', (req: Request, res: Response) => {
  transferFunds(req, res).catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Riwayat transaksi
router.get('/accounts/:id/transactions', (req: Request, res: Response) => {
  transactionHistory(req, res).catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

export default router;