import { z } from 'zod';


export const criarCursoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  capa: z.string().url('Capa deve ser uma URL válida'),
  inicio: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve ser DD/MM/AAAA'),
  descricao: z.string().min(1, 'Descrição é obrigatória')
});