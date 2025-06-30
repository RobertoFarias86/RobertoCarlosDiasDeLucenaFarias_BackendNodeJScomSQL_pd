import { RequestHandler } from 'express';
import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import dayjs from 'dayjs';


export const listarCursosHandler: RequestHandler = async (req, res) => {
  const userId = req.userId; 
  const filtro = req.query.filtro?.toString() || '';

  
  console.log('🔍 Filtro recebido da query:', filtro);
  try {
    const cursos = await prisma.curso.findMany({
      where: {
        nome: { contains: filtro }, 
      },
      orderBy: { inicio: 'asc' },
      include: {
        _count: { select: { inscricoes: true } }, 
        inscricoes: userId
          ? {
              where: { alunoId: userId }, 
              select: { canceladaEm: true } 
            }
          : false as const 
      }
    });

    
    const resultado = cursos.map(curso => {
      const inscricao = curso.inscricoes?.[0]; 
      const inscrito = userId ? !!inscricao : false;
      const inscricaoCancelada = !!inscricao?.canceladaEm;

      return {
        id: curso.id,
        nome: curso.nome,
        descricao: curso.descricao,
        capa: curso.capa,
        inscricoes: curso._count.inscricoes,
        inicio: curso.inicio, 
        inscrito,
        inscricao_cancelada: inscricaoCancelada
      };
    });

    res.status(200).json(resultado);
  } catch (e) {
    console.error('Erro ao listar cursos:', e);
    res.status(500).json({ mensagem: 'Erro interno ao buscar cursos' });
  }
};


export const inscreverHandler: RequestHandler = async (req, res) => {
  const userId = req.userId;
  const cursoId = Number(req.params.idCurso);

  if (!userId) {
    return res.status(403).json({ mensagem: 'Você precisa estar logado' });
  }

  try {
    const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
    if (!curso) {
      return res.status(404).json({ mensagem: 'Curso não encontrado' });
    }

    const inscricao = await prisma.inscricao.findUnique({
      where: { alunoId_cursoId: { alunoId: userId, cursoId } }
    });

    if (inscricao) {
      if (inscricao.canceladaEm) {
        return res.status(400).json({
          mensagem: 'Inscrição cancelada — não é possível se reinscrever neste curso'
        });
      } else {
        return res.status(400).json({
          mensagem: 'Você já se inscreveu neste curso'
        });
      }
    }

    await prisma.inscricao.create({ data: { alunoId: userId, cursoId } });

    return res.status(200).json({ mensagem: 'Inscrição realizada com sucesso' });
  } catch (e) {
    console.error('Erro ao inscrever:', e);
    return res.status(500).json({ mensagem: 'Erro interno ao inscrever-se' });
  }
};


export const cancelarInscricaoHandler: RequestHandler = async (req, res) => {
  const userId = req.userId;
  const cursoId = Number(req.params.idCurso);

  if (!userId) {
    return res.status(403).json({ mensagem: 'Você precisa estar logado' });
  }

  try {
    const inscricao = await prisma.inscricao.findUnique({
      where: { alunoId_cursoId: { alunoId: userId, cursoId } }
    });

    if (!inscricao) {
      return res.status(404).json({ mensagem: 'Inscrição não encontrada' });
    }

    if (inscricao.canceladaEm) {
      return res.status(400).json({ mensagem: 'Inscrição já cancelada' });
    }

    await prisma.inscricao.update({
      where: { id: inscricao.id },
      data: { canceladaEm: new Date() }
    });

    return res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso' });
  } catch (e) {
    console.error('Erro ao cancelar inscrição:', e);
    return res.status(500).json({ mensagem: 'Erro interno ao cancelar inscrição' });
  }
};


export async function criarCursoHandler(req: Request, res: Response) {
  const { nome, descricao, capa, inicio } = req.body;

  try {
    const novoCurso = await prisma.curso.create({
      data: {
        nome,
        descricao,
        capa,
        inicio: dayjs(inicio, 'DD/MM/YYYY').toDate() 
      }
    });

    return res.status(201).json(novoCurso);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    return res.status(500).json({ mensagem: 'Erro ao criar curso' });
  }
}