import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from '../prisma/client.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Por favor, forneça email e senha" });
    }

    const userDb = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userDb) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, userDb.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: userDb.id, email: userDb.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token: token,
      tokenType: "Bearer",
      expiresIn: 3600,
      user: {
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
};
