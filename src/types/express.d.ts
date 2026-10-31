import { TokenPayload } from '../middlewares/auth';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'admin' | 'morador';
        condominioId: string;
      };
    }
  }
}