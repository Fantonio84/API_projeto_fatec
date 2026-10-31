import path from 'path';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database';
import apiRouter from './routes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Rota estática para servir as imagens enviadas
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Rota base da API

app.use('/api', apiRouter);

// Inicialização
async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api`);
  });
}

startServer();