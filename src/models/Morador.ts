import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IMorador extends Document {
  condominioId: Types.ObjectId;
  nome: string;
  telefone: string;
  lote: string;
  quadra: string;
  senha: string;
  status: 'pendente' | 'aprovado';
  compareSenha(senhaDigitada: string): Promise<boolean>;
}

const MoradorSchema = new Schema<IMorador>(
  {
    condominioId: { type: Schema.Types.ObjectId, ref: 'Condominio', required: true },
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    lote: { type: String, required: true },
    quadra: { type: String, required: true },
    senha: { type: String, required: true },
    status: { type: String, enum: ['pendente', 'aprovado'], default: 'pendente', required: true }
  },
  { collection: 'moradores', timestamps: true }
);

MoradorSchema.pre('save', async function () {
  if (!this.isModified('senha')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  } catch (error) {
    throw error;
  }
});


MoradorSchema.methods.compareSenha = async function (senhaDigitada: string): Promise<boolean> {
  return bcrypt.compare(senhaDigitada, this.senha);
};

export const Morador = model<IMorador>('Morador', MoradorSchema);