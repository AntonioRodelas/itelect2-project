import express from 'express';
import db from '../models/index.cjs';
import authRouter from './auth.js';
import verifyToken from '../middleware/verifyToken.js';
import requireRole from '../middleware/requireRole.js';

const { Task, User } = db;
const router = express.Router();

router.use('/auth', authRouter);

router.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: User,
      order: [['id', 'ASC']]
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: User });
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: Task,
      order: [['id', 'ASC']]
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Protected: Requires valid JWT token
router.post('/tasks', verifyToken, async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Protected: Requires valid JWT token
router.put('/tasks/:id', verifyToken, async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
    }
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Protected: Requires valid JWT token AND 'admin' role
router.delete('/tasks/:id', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found.` });
    }
    await task.destroy();
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    next(error);
  }
});

export default router;