import prisma from '../prisma/client.js';

async function deposit(userId, amount) {
  const transaction = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId,
        amount,
        type: 'DEPOSIT',
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        balance: { increment: amount },
      },
    }),
  ]);

  return transaction;
}

async function withdraw(userId, amount) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user.balance < amount) {
    throw new Error('Saldo insuficiente');
  }

  const transaction = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId,
        amount,
        type: 'WITHDRAWAL',
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        balance: { decrement: amount },
      },
    }),
  ]);

  return transaction;
}

export default {
  deposit,
  withdraw,
};
