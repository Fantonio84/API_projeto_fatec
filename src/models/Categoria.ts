import { Schema, model, Document } from 'mongoose';

export interface ICategoria extends Document {
  nome: string;
  slug: string;
  icone?: string;
}

const CategoriaSchema = new Schema<ICategoria>(
  {
    nome: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icone: { type: String, default: null }
  },
  { collection: 'categorias', timestamps: true }
);

export const Categoria = model<ICategoria>('Categoria', CategoriaSchema);