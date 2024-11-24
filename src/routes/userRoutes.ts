import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUserStatus,
  deleteUser,
  getUserTasks,
} from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Rutas abiertas
router.get('/', getUsers); // GET dominio/api/users
router.post('/', createUser); // POST dominio/api/users

// Rutas protegidas
router.use(authenticate); // Middleware de autenticación para las siguientes rutas
router.get('/:id', getUserById); // GET dominio/api/users/:id
router.put('/:id', updateUser); // PUT dominio/api/users/:id
router.patch('/:id', patchUserStatus); // PATCH dominio/api/users/:id
router.delete('/:id', deleteUser); // DELETE dominio/api/users/:id
router.get('/:id/tasks', getUserTasks); // GET dominio/api/users/:id/tasks

export default router;