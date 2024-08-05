import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.post('/deposit', transactionController.handleDeposit);
router.post('/withdraw', transactionController.handleWithdraw);

export default router;
