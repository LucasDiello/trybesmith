import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function generateToken(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret, {
    expiresIn: '1d',
  });
  return token;
}

function decodedToken(token: string): TokenPayload {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
}

async function authMiddleware(req: Request &
{ userIdTK?: number }, res: Response, next: NextFunction) : Promise<unknown> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é obrigatório' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { username, id } = await decodedToken(token);
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Token inválido' });

    req.userIdTK = id;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default {
  generateToken,
  authMiddleware,
};
