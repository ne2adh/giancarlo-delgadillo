import { Request, Response } from 'express';
import { Task } from '../models';

// Obtener todas las tareas del usuario autenticado
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error });
  }
};

// Obtener una tarea específica por ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task', error });
  }
};

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, done } = req.body;
    if(req.userId){
      const task = await Task.create({ name, userId: Number(req.userId), done });
      res.status(201).json(task);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Actualizar una tarea existente
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.name = name;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Cambiar el estado de una tarea
export const patchTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.done = done;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
};

// Eliminar una tarea
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
