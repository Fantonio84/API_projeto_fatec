import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Condominio } from '../models/Condominio';
import { Morador } from '../models/Morador';

export class AuthController {
    
  // Login do administrador
  static loginAdm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        return;
      }

      const condominio = await Condominio.findOne({ email });
      if (!condominio) {
        res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        return;
      }

      const senhaValida = await condominio.compareSenha(senha);
      if (!senhaValida) {
        res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        return;
      }

      const secret = process.env.JWT_SECRET || 'fallback_secret';
      const token = jwt.sign(
        {
          id: condominio._id,
          role: 'admin',
          condominioId: condominio._id
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(200).json({
        message: 'Login de administrador realizado com sucesso!',
        token,
        usuario: {
          id: condominio._id,
          nome: condominio.nome,
          email: condominio.email,
          role: 'admin'
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Login do Morador
  static loginMorador = async (req: Request, res: Response): Promise<void> => {
    try {
      const { telefone, senha, condominioId } = req.body;

      if (!telefone || !senha || !condominioId) {
        res.status(400).json({ message: 'Telefone, senha e ID do condomínio são obrigatórios.' });
        return;
      }

      const morador = await Morador.findOne({ telefone, condominioId });
      if (!morador) {
        res.status(401).json({ message: 'Telefone ou senha inválidos.' });
        return;
      }

      const senhaValida = await morador.compareSenha(senha);
      if (!senhaValida) {
        res.status(401).json({ message: 'Telefone ou senha inválidos.' });
        return;
      }

      if (morador.status !== 'aprovado') {
        res.status(403).json({ message: 'Seu cadastro ainda está pendente de aprovação pela administração.' });
        return;
      }

      const secret = process.env.JWT_SECRET || 'fallback_secret';
      const token = jwt.sign(
        {
          id: morador._id,
          role: 'morador',
          condominioId: morador.condominioId
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(200).json({
        message: 'Login de morador realizado com sucesso!',
        token,
        usuario: {
          id: morador._id,
          nome: morador.nome,
          role: 'morador',
          condominioId: morador.condominioId
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}