import { Router } from 'express';

import {
  inscreverHandler,
  listarCursosDoAlunoHandler
} from './inscricao.controller';

import { validateBody } from '../../middlewares/validateBody.middleware';
import { createInscricaoSchema } from './inscricao.schema';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const inscricaoRouter = Router();


inscricaoRouter.use(authMiddleware);


inscricaoRouter.post(
  '/',
  validateBody(createInscricaoSchema),
  inscreverHandler
);


inscricaoRouter.get('/:idUsuario', listarCursosDoAlunoHandler);