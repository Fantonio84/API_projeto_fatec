import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  role: 'admin' | 'morador';
  condominioId: string;
}

// Middleware para verificar se a requisição contém um JWT válido
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ message: 'Formato do token inválido. Use "Bearer <token>".' });
    return;
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET || 'fallback_secret';

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = decoded; // Injeta os dados decodificados no Request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

// Middleware opcional para restrição de papéis (Role-Based Access Control)
export function authorizeRoles(...allowedRoles: ('admin' | 'morador')[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Acesso negado: você não tem permissão para realizar esta ação.' });
      return;
    }
    next();
  };
}