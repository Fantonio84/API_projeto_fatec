import { GenericController } from './GenericController';
import { Condominio } from '../models/Condominio';
import { Morador } from '../models/Morador';
import { Categoria } from '../models/Categoria';
import { CategoriaSugerida } from '../models/CategoriaSugerida';
import { Prestador } from '../models/Prestador';
import { Avaliacao } from '../models/Avaliacao';
import { Denuncia } from '../models/Denuncia';

export const condominioController = new GenericController(Condominio);
export const moradorController = new GenericController(Morador);
export const categoriaController = new GenericController(Categoria);
export const categoriaSugeridaController = new GenericController(CategoriaSugerida);
export const prestadorController = new GenericController(Prestador);
export const avaliacaoController = new GenericController(Avaliacao);
export const denunciaController = new GenericController(Denuncia);