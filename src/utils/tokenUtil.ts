import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export const generateToken = (userId: string) => jwt.sign({ userId }, SECRET_KEY);
export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY) as { userId: string };
    return payload.userId;
  } catch {
    return null;
  }
};