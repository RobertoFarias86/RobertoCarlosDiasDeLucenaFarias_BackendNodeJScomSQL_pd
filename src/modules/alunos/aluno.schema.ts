import { z } from 'zod';

export const criarAlunoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  nascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de nascimento deve estar no formato DD/MM/AAAA')
});