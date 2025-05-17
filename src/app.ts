import express, { Request, Response, NextFunction } from 'express';
import accountRoutes from './routes/accountRoutes';

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan semua route akun
app.use(accountRoutes);

// Default 404 handler (jika route tidak ditemukan)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
