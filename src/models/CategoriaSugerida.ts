import { Schema, model, Document } from 'mongoose';

export interface ICategoriaSugerida extends Document {
  textoOriginal: string;
  textoNormalizado: string;
  contagem: number;
  status: 'pendente' | 'promovida' | 'rejeitada';
}

const CategoriaSugeridaSchema = new Schema<ICategoriaSugerida>(
  {
    textoOriginal: { type: String, required: true },
    textoNormalizado: { type: String, required: true, unique: true },
    contagem: { type: Number, default: 1, required: true },
    status: { type: String, enum: ['pendente', 'promovida', 'rejeitada'], default: 'pendente', required: true }
  },
  { collection: 'categoriasSugeridas', timestamps: true }
);

export const CategoriaSugerida = model<ICategoriaSugerida>('CategoriaSugerida', CategoriaSugeridaSchema);