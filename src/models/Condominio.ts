import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ICondominio extends Document {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  senhaAdmHash: string;
  codigoAcessoMoradores: string;
  compareSenha(senhaDigitada: string): Promise<boolean>;
}

const CondominioSchema = new Schema<ICondominio>(
  {
    nome: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    senhaAdmHash: { type: String, required: true },
    codigoAcessoMoradores: { type: String, required: true }
  },
  { collection: 'condominios', timestamps: true }
);

CondominioSchema.pre('save', async function () {
  if (!this.isModified('senhaAdmHash')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.senhaAdmHash = await bcrypt.hash(this.senhaAdmHash, salt);
  } catch (error) {
    throw error;
  }
});


CondominioSchema.methods.compareSenha = async function (senhaDigitada: string): Promise<boolean> {
  return bcrypt.compare(senhaDigitada, this.senhaAdmHash);
};

export const Condominio = model<ICondominio>('Condominio', CondominioSchema);