import { Schema, model, Document, Types } from 'mongoose';

export interface IDenuncia extends Document {
  tipo: 'Denuncia perfil' | 'denunciar comentario';
  Prestador_Id: Types.ObjectId;
  Morador_Id: Types.ObjectId;
  motivo?: string;
  status: 'pendente' | 'removida';
}

const DenunciaSchema = new Schema<IDenuncia>(
  {
    tipo: { type: String, enum: ['Denuncia perfil', 'denunciar comentario'], required: true },
    Prestador_Id: { type: Schema.Types.ObjectId, ref: 'Prestador', required: true },
    Morador_Id: { type: Schema.Types.ObjectId, ref: 'Morador', required: true },
    motivo: { type: String, default: null },
    status: { type: String, enum: ['pendente', 'removida'], default: 'pendente', required: true }
  },
  { collection: 'denuncias', timestamps: true }
);

export const Denuncia = model<IDenuncia>('Denuncia', DenunciaSchema);