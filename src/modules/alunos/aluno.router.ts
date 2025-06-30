import { Router } from 'express';
import { criarAlunoHandler, listarCursosDoAlunoHandler } from './aluno.controller';
import { validateBody } from '../../middlewares/validateBody.middleware';
import { criarAlunoSchema } from './aluno.schema';
import { authMiddleware } from '../../middlewares/auth.middleware';
export const alunoRouter = Router();

/**
 * @route POST /usuarios
 * @desc Realiza o cadastro de um novo aluno
 * @body { nome, email, senha, nascimento }
 * @returns 200 em caso de sucesso
 * @returns 400 se o e-mail já estiver cadastrado ou dados inválidos
 * 
 * - A validação dos dados é feita via Zod (`criarAlunoSchema`)
 * - A senha é criptografada no controller antes de salvar no banco
 */
alunoRouter.post(
  '/',
  validateBody(criarAlunoSchema),
  criarAlunoHandler
);

/**
 * @route GET /usuarios/:idUsuario/cursos
 * @desc Lista todos os cursos em que o aluno está (ou esteve) inscrito
 * @auth Obrigatório estar autenticado (mesmo id do token)
 * @returns 200 com array de cursos inscritos e cancelados
 * @returns 403 se o aluno tentar acessar os dados de outro usuário
 */
alunoRouter.get(
  '/:idUsuario/cursos',
  authMiddleware,
  listarCursosDoAlunoHandler
);