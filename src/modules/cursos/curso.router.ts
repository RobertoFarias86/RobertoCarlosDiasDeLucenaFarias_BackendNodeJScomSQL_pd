import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validateBody.middleware';

import {
  listarCursosHandler,
  inscreverHandler,
  cancelarInscricaoHandler,
  criarCursoHandler
} from './curso.controller';

import { criarCursoSchema } from './curso.schema';

export const cursoRouter = Router();


cursoRouter.get('/', listarCursosHandler);


cursoRouter.post('/:idCurso/inscricao', authMiddleware, inscreverHandler);
cursoRouter.delete('/:idCurso/inscricao', authMiddleware, cancelarInscricaoHandler);


cursoRouter.post(
  '/',
  authMiddleware,               
  validateBody(criarCursoSchema),
  criarCursoHandler
);