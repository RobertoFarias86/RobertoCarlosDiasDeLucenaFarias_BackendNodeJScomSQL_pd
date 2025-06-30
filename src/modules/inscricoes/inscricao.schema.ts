import { z } from 'zod';

export const createInscricaoSchema = z.object({
  cursoId: z.number({ invalid_type_error: "cursoId deve ser numérico" })
});