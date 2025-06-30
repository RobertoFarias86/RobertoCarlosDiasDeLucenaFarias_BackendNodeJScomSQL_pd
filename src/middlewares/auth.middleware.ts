import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(403).json({ mensagem: 'Usuário não autenticado' });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
};