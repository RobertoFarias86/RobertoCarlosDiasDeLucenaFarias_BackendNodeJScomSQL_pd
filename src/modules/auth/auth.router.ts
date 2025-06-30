import { Router } from 'express';
import { loginHandler, logoutHandler } from './auth.controller';
import { loginSchema } from './auth.schema';
import { validateBody } from '../../middlewares/validateBody.middleware';

export const authRouter = Router();


authRouter.post('/', validateBody(loginSchema), loginHandler);


authRouter.post('/logout', logoutHandler);