import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { authRouter } from './modules/auth/auth.router';
import { alunoRouter } from './modules/alunos/aluno.router';
import { cursoRouter } from './modules/cursos/curso.router';

import { authMiddleware } from './middlewares/auth.middleware';
import { prisma } from './prisma';

const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/ping', async (req, res) => {
  const hora = await prisma.$queryRaw`SELECT NOW()`;
  res.json({ status: 'ok', hora });
});


app.use('/usuarios', alunoRouter);   
app.use('/login', authRouter);       
app.use('/cursos', cursoRouter);     


app.get('/protegida', authMiddleware, (req, res) => {
  const userId = (req as any).userId as number;

  res.status(200).json({
    mensagem: 'Você está autenticado!',
    id: userId
  });
});

export default app;