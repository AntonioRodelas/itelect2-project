import express from 'express';
import { fetchSampleUsers } from '../src/api.js'; 

const router = express.Router();

const tasks = [
  { id: 1, title: 'Finish GT3', completed: true },
  { id: 2, title: 'Finish GT4', completed: true },
  { id: 3, title: 'Finish GT5', completed: false }
];

let cachedUsers = [];

(async () => {
  try {
    cachedUsers = await fetchSampleUsers();
    console.log('Users successfully fetched and cached.');
  } catch (error) {
    console.error('Error caching sample users:', error.message);
  }
})();

router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(t => String(t.id) === String(taskId));

  if (!task) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
  }

  res.json(task);
});

router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;