import { Schema, model, Document, Types } from 'mongoose';

export interface IAvaliacao extends Document {
  prestadorId: Types.ObjectId;
  autorId: Types.ObjectId;
  nota: number;
  comentario?: string;
  status: 'pendente' | 'aprovada';
}

const AvaliacaoSchema = new Schema<IAvaliacao>(
  {
    prestadorId: { type: Schema.Types.ObjectId, ref: 'Prestador', required: true },
    autorId: { type: Schema.Types.ObjectId, ref: 'Morador', required: true },
    nota: { type: Number, required: true, min: 1, max: 3 },
    comentario: { type: String, default: null },
    status: { type: String, enum: ['pendente', 'aprovada'], default: 'pendente', required: true }
  },
  { collection: 'avaliacoes', timestamps: true }
);

export const Avaliacao = model<IAvaliacao>('Avaliacao', AvaliacaoSchema);