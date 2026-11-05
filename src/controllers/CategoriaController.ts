import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { Categoria } from '../models/Categoria';

export class CategoriaController {
  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, slug } = req.body;
      
      // Se um arquivo foi enviado, pega o nome do arquivo salvo no disco
      const icone = req.file ? req.file.filename : undefined;

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

  static downloadIcone = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // 1. Busca a categoria pelo ID
      const categoria = await Categoria.findById(id);

      if (!categoria || !categoria.icone) {
        res.status(404).json({ message: 'Categoria ou ícone não encontrado.' });
        return;
      }

      // 2. Monta o caminho absoluto do arquivo na pasta uploads
      const filePath = path.resolve(__dirname, '..', '..', 'uploads', categoria.icone);

      // 3. Verifica se o arquivo realmente existe no disco
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ message: 'Arquivo de imagem não encontrado no servidor.' });
        return;
      }

      // 4. Envia o arquivo para download
      res.download(filePath, categoria.icone);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}