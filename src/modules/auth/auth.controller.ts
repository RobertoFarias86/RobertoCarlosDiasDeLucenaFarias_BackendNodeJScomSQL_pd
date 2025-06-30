import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function loginHandler(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const aluno = await prisma.aluno.findUnique({ where: { email } });

    if (!aluno) {
      return res.status(400).json({ mensagem: 'E-mail ou senha inválidos' });
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senhaHash);
    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign({ userId: aluno.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ mensagem: 'Login realizado com sucesso' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao realizar login' });
  }
}


export async function logoutHandler(req: Request, res: Response) {
  
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  });

  return res.status(200).json({ mensagem: 'Logout efetuado com sucesso' });
}