import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export const generateToken = (userId: string) => jwt.sign({ userId }, SECRET_KEY);
export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY) as { userId: number }; // Asegúrate de que el tipo sea correcto
    return payload;
  } catch (error) {
    return null; // Devuelve null si hay un error
  }
};