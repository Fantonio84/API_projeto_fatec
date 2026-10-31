import { Schema, model, Document, Types } from 'mongoose';

export interface IPrestador extends Document {
  condominioId: Types.ObjectId;
  nome: string;
  telefone: string;
  categorias: Types.ObjectId[];
  mediaAvaliacao?: number;
  origem: string;
}

const PrestadorSchema = new Schema<IPrestador>(
  {
    condominioId: { type: Schema.Types.ObjectId, ref: 'Condominio', required: true },
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    categorias: [{ type: Schema.Types.ObjectId, ref: 'Categoria', required: true }],
    mediaAvaliacao: { type: Number, min: 1, max: 3, default: null },
    origem: { type: String, required: true }
  },
  { collection: 'prestadores', timestamps: true }
);

export const Prestador = model<IPrestador>('Prestador', PrestadorSchema);