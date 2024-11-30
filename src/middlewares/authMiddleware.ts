import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtil';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token required' });

  const token = authHeader.split(' ')[1];
  const userId = verifyToken(token);
  if (!userId) return res.status(401).json({ message: 'Invalid token' });

  req.userId = String(userId.userId);
  next();
};

export { verifyToken };
