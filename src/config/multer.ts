import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export const multerConfig = {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, callback) => {
      // Gera um hash aleatório para evitar arquivos com nomes duplicados
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  }),
  fileFilter: (req: any, file: any, callback: any) => {
    // Aceita apenas imagens
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/svg+xml'];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Formato de arquivo inválido. Envie JPG, PNG, GIF ou SVG.'));
    }
  }
};