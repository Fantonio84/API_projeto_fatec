import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

export class GenericController<T extends Document> {
  constructor(protected model: Model<T>) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.model.create(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.model.find();
      res.status(200).json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.status(200).json(item);
    } catch (error: any) {
      res.status(400).json({ error: 'ID inválido ou erro na consulta' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        //{ new: true, runValidators: true }
        { returnDocument : 'after' }
      );
      if (!updatedItem) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.status(200).json(updatedItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.status(200).json({ message: 'Removido com sucesso' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}