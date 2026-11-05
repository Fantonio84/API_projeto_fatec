import multer from 'multer';
import { multerConfig } from '../config/multer';
import { CategoriaController } from '../controllers/CategoriaController'


import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware, authorizeRoles } from '../middlewares/auth';
import {
  condominioController,
  moradorController,
  categoriaController,
  categoriaSugeridaController,
  prestadorController,
  avaliacaoController,
  denunciaController
} from '../controllers';
import { GenericController } from '../controllers/GenericController';

function createResourceRoutes(controller: GenericController<any>): Router {
  const router = Router();
  router.post('/', controller.create);
  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);
  return router;
}

const upload = multer(multerConfig);
const apiRouter = Router();

// ==========================================
// ROTAS PÚBLICAS (Sem Autenticação)
// ==========================================
apiRouter.post('/auth/login-adm', AuthController.loginAdm);
apiRouter.post('/auth/login-morador', AuthController.loginMorador);

// Permite cadastro inicial de condomínio e morador sem estar logado
apiRouter.post('/condominios', condominioController.create);
apiRouter.post('/moradores', moradorController.create);

// ==========================================
// ROTAS PROTEGIDAS (Exigem Header Authorization: Bearer <token>)
// ==========================================
apiRouter.use(authMiddleware);

// Exemplos de rotas acessíveis por Moradores e ADMs logados:
// apiRouter.use('/categorias', createResourceRoutes(categoriaController));

apiRouter.use('/prestadores', createResourceRoutes(prestadorController));
apiRouter.use('/avaliacoes', createResourceRoutes(avaliacaoController));
apiRouter.use('/categorias-sugeridas', createResourceRoutes(categoriaSugeridaController));

// Exemplo de rotas restritas apenas para o Administrador:
apiRouter.use('/denuncias', authorizeRoles('admin'), createResourceRoutes(denunciaController));
apiRouter.use('/condominios', authorizeRoles('admin'), createResourceRoutes(condominioController));
apiRouter.use('/moradores', authorizeRoles('admin'), createResourceRoutes(moradorController));

// Rotas de Categoria com suporte a Upload de Arquivo
apiRouter.post('/categorias', upload.single('icone'), CategoriaController.create);
apiRouter.put('/categorias/:id', upload.single('icone'), CategoriaController.update);

// Rota para download do ícone da categoria
apiRouter.get('/categorias/:id/download', CategoriaController.downloadIcone);

export default apiRouter;