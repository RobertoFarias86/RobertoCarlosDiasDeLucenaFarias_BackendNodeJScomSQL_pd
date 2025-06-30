import { prisma } from '../../prisma';

export async function inscreverAlunoEmCurso(alunoId: number, cursoId: number) {
  
  const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
  if (!curso) {
    throw new Error("Curso não encontrado");
  }
  
  const jaInscrito = await prisma.inscricao.findFirst({
    where: { alunoId, cursoId }
  });
  if (jaInscrito) {
    throw new Error("Aluno já está inscrito neste curso");
  }
  
  const inscricao = await prisma.inscricao.create({
    data: { alunoId, cursoId }
  });
  return inscricao;
}


export async function listarCursosDoAluno(alunoId: number) {
  return prisma.inscricao.findMany({
    where: { alunoId },
    include: {
      curso: {
        include: {
          _count: {
            select: {
              
              inscricoes: { where: { canceladaEm: null } }
            }
          }
        }
      }
    }
  });
}


export async function cancelarInscricao(alunoId: number, cursoId: number) {
  
  const curso = await prisma.curso.findUnique({ where: { id: cursoId } });
  if (!curso) {
    throw new Error('Curso não encontrado');
  }

  
  const inscricao = await prisma.inscricao.findFirst({
    where: {
      alunoId,
      cursoId,
      canceladaEm: null, 
    },
  });

  if (!inscricao) {
    throw new Error('Inscrição não encontrada ou já cancelada');
  }

  
  await prisma.inscricao.update({
    where: { id: inscricao.id },
    data: { canceladaEm: new Date() },
  });
}