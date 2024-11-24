import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
};

// Crear un usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, status } = req.body;
    const salt = await bcrypt.genSalt(10);
    const user_password = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password: user_password, status });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username;
    user.password = password;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Cambiar estado de un usuario
export const patchUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Obtener tareas de un usuario
export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ association: User.associations.tasks }],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user tasks', error });
  }
};
