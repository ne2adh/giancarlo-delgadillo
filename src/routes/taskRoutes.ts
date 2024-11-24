import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTaskStatus,
  deleteTask,
} from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate); // Aplicar autenticación a todas las rutas

router.get('/', getTasks); // GET /api/tasks
router.post('/', createTask); // POST /api/tasks
router.get('/:id', getTaskById); // GET /api/tasks/:id
router.put('/:id', updateTask); // PUT /api/tasks/:id
router.patch('/:id', patchTaskStatus); // PATCH /api/tasks/:id
router.delete('/:id', deleteTask); // DELETE /api/tasks/:id

export default router;
