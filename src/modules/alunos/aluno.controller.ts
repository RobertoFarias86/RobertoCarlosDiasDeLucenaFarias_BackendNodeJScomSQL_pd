import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';

export async function criarAlunoHandler(req: Request, res: Response) {
  const { nome, email, senha, nascimento } = req.body;

  try {
    
    const existe = await prisma.aluno.findUnique({ where: { email } });
    if (existe) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const nascimentoDate = dayjs(nascimento, 'DD/MM/YYYY').toDate();

    await prisma.aluno.create({
      data: {
        nome,
        email,
        senhaHash,
        nascimento: nascimentoDate
      }
    });

    return res.status(200).json({ mensagem: 'Cadastro realizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno ao cadastrar aluno' });
  }
}
export async function listarCursosDoAlunoHandler(req: Request, res: Response) {
  const userIdToken = (req as any).userId;
  const userIdParam = Number(req.params.idUsuario);

  if (userIdToken !== userIdParam) {
    return res.status(403).json({ mensagem: 'Acesso negado' });
  }

  try {
    const inscricoes = await prisma.inscricao.findMany({
      where: { alunoId: userIdParam },
      include: { curso: true }
    });

    const resultado = inscricoes.map(i => ({
      id: i.curso.id,
      nome: i.curso.nome,
      descricao: i.curso.descricao,
      capa: i.curso.capa,
      inscricoes: 0, 
      inicio: dayjs(i.curso.inicio).format('DD/MM/YYYY'),
      inscrito: true,
      inscricao_cancelada: !!i.canceladaEm
    }));

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar cursos do aluno' });
  }
}