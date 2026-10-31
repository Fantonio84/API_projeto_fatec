import mongoose from 'mongoose';
import 'dotenv/config'; // Garante que o Node.js consiga ler o arquivo .env

export const conectarMongo = async () => {
  // Verifica se a string de conexão foi configurada corretamente no ambiente
  if (!process.env.MONGODB_URI) {
    console.error('Erro crítico: A variável MONGODB_URI não foi definida no arquivo .env');
    process.exit(1);
  }

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB (banco: acessos_sistema_odonto) com sucesso!');
  } catch (error) {
    // Verifica se o erro é um objeto do tipo Error
    if (error instanceof Error) {
      console.error('Erro ao conectar ao MongoDB:', error.message);
    } else {
      console.error('Erro desconhecido ao conectar ao MongoDB:', error);
    }
    process.exit(1); 
  }
};