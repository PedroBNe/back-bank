import { config } from "dotenv";
import express from "express";
import corsMiddleware from './middlewares/cors.js';
import authRoutes from "./routes/authRoutes.js";
import privateRoutes from "./routes/private.js";
import transactionRoutes from "./routes/transactionRoutes.js";

import auth from "./middlewares/auth.js";

config();

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use("/", authRoutes);
app.use("/", auth, privateRoutes);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
