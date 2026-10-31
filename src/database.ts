/* import app from './app';
import { conectarMongo } from './config/mongo'; 

require('dns').setServers(['8.8.8.8', '1.1.1.1']);

const PORT = 3001; 
conectarMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`MongoDB conectado com sucesso!`);
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Falha na conexão com o banco:", err);
}); */

import mongoose from 'mongoose';
require('dns').setServers(['8.8.8.8', '1.1.1.1']);


//export async function connectDatabase(uri: string = 'mongodb://localhost:27017/test'): Promise<void> {
export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI 
  try {
    await mongoose.connect(mongoUri);
    console.log('Conectado ao MongoDB com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}