import { Request, Response } from 'express';
import * as InscricaoService from './inscricao.service';
import dayjs from 'dayjs';


export async function inscreverHandler(req: Request, res: Response) {
  
  if (!req.userId) {
    return res.status(403).json({ mensagem: 'Você precisa estar logado' });
  }

  const alunoId = req.userId;
  const { cursoId } = req.body;

  try {
    await InscricaoService.inscreverAlunoEmCurso(alunoId, Number(cursoId));

    
    return res.status(200).json({ mensagem: 'Inscrição realizada com sucesso' });
  } catch (err: any) {
    
    const msg = err.message || 'Erro ao inscrever';
    const status =
      msg.includes('não encontrado') ? 404 :
      msg.includes('já')             ? 400 :
                                       500;

    return res.status(status).json({ mensagem: msg });
  }
}


export async function listarCursosDoAlunoHandler(req: Request, res: Response) {
  const idRota   = Number(req.params.idUsuario); 
  const idToken  = req.userId;                   

  
  if (idToken !== idRota) {
    return res.status(403).json({ mensagem: 'Acesso negado — usuário inválido' });
  }

  try {
    
    const inscricoes = await InscricaoService.listarCursosDoAluno(idRota);

    const cursosFormatados = inscricoes.map(inscricao => ({
      id: inscricao.curso.id,
      nome: inscricao.curso.nome,
      descricao: inscricao.curso.descricao,
      capa: inscricao.curso.capa,
      inicio: dayjs(inscricao.curso.inicio).format('DD/MM/YYYY'),
      inscricoes: inscricao.curso._count.inscricoes,          
      inscricao_cancelada: !!inscricao.canceladaEm,
      inscrito: true
    }));

    return res.status(200).json(cursosFormatados);
  } catch (err) {
    console.error('Erro ao buscar cursos do aluno:', err);
    return res
      .status(500)
      .json({ mensagem: 'Erro interno ao buscar cursos do aluno' });
  }
}


export async function cancelarInscricaoHandler(req: Request, res: Response) {
  const alunoId = req.userId;
  const cursoId = Number(req.params.idCurso);

  
  if (!alunoId) {
    return res.status(403).json({ mensagem: 'Você precisa estar logado' });
  }

  try {
    await InscricaoService.cancelarInscricao(alunoId, cursoId);
    return res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso' });
  } catch (err: any) {
    const msg = err.message || 'Erro ao cancelar inscrição';
    const status = msg.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ mensagem: msg });
  }
}