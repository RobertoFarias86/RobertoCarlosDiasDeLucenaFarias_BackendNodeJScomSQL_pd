import { prisma } from '../../prisma';
import dayjs from 'dayjs';


export async function listarCursos() {
  return prisma.curso.findMany();
}

/* -------------------------------------------------------------------------- */
/* CRIAR                                                                      */
/* -------------------------------------------------------------------------- */
/**
 * Cria um novo curso.
 * @param nome       – título do curso (obrigatório)
 * @param capa       – URL da imagem de capa (obrigatório)
 * @param inicioStr  – data de início em DD/MM/AAAA (obrigatório)
 * @param descricao  – descrição do curso (obrigatória)
 */
export async function criarCurso(
  nome: string,
  capa: string,
  inicioStr: string,
  descricao: string
) {
  const inicio = dayjs(inicioStr, 'DD/MM/YYYY').toDate();

  return prisma.curso.create({
    data: {
      nome,
      capa,
      inicio,
      descricao              
    }
  });
}


export async function removerCurso(id: number) {
  return prisma.curso.delete({ where: { id } });
}