import { Request, Response } from 'express';
import { Categoria } from '../models/Categoria';

export class CategoriaController {
  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, slug } = req.body;
      
      // Se um arquivo foi enviado, pega o nome do arquivo salvo no disco
      const icone = req.file ? req.file.filename : null;

      const categoria = await Categoria.create({
        nome,
        slug,
        icone
      });

      res.status(201).json(categoria);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  static update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, slug } = req.body;
      const updateData: any = { nome, slug };

      // Se um novo ícone for enviado no update, atualiza o campo
      if (req.file) {
        updateData.icone = req.file.filename;
      }

      const categoria = await Categoria.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!categoria) {
        res.status(404).json({ message: 'Categoria não encontrada' });
        return;
      }

      res.status(200).json(categoria);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}