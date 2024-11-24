import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { verifyToken } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', verifyToken, taskRoutes);

export default app;