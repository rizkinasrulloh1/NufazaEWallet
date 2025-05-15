    import { Router } from 'express';
    import { registerAccount } from './controllers/accountController';
    

    const router = Router();

    router.post('/accounts', registerAccount);

    export default router;
    