import express from "express";
import prisma from '../prisma/client.js';

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
});

export default router;
