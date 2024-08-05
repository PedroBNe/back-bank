import transactionService from '../services/transactionService.js';

async function handleDeposit(req, res) {
  const { userId, amount } = req.body;
  try {
    const transaction = await transactionService.deposit(userId, amount);
    res.json({ message: 'Depósito realizado com sucesso', transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function handleWithdraw(req, res) {
  const { userId, amount } = req.body;
  try {
    const transaction = await transactionService.withdraw(userId, amount);
    res.json({ message: 'Saque realizado com sucesso', transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default {
  handleDeposit,
  handleWithdraw,
};
