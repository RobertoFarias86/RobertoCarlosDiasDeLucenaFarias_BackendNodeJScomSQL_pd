import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema<any>): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const erros = result.error.errors.map(e => ({
        campo: e.path.join('.'),
        mensagem: e.message
      }));
      res.status(400).json({ mensagem: 'Erro de validação', erros }); 
      return; 
    }

    req.body = result.data;
    next();
  };
}