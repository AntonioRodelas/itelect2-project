import express from 'express';
import { fetchSampleUsers } from '../src/api.js'; 
import { validateTask, mergeTaskUpdate } from '../src/utils.js'; // GT6 import[cite: 1, 4]

const router = express.Router();

let tasks = [
  { id: 1, title: 'Finish GT3', completed: true },
  { id: 2, title: 'Finish GT4', completed: true },
  { id: 3, title: 'Finish GT5', completed: false }
]; 

let nextId = 4; 
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

router.post('/tasks', (req, res, next) => {
  
  if (!validateTask(req.body)) {
    const err = new Error('Task title and dueDate are required.');
    err.status = 400;
    return next(err); 
  }

  const newTask = {
    id: nextId++,
    completed: false,
    ...req.body
  };

  tasks.push(newTask);
  res.status(201).json(newTask); 
});


router.put('/tasks/:id', (req, res, next) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    const err = new Error(`Task with ID ${taskId} not found.`);
    err.status = 404;
    return next(err); 
  }


  tasks[index] = mergeTaskUpdate(tasks[index], req.body);
  res.status(200).json(tasks[index]); 
});


router.delete('/tasks/:id', (req, res, next) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    const err = new Error(`Task with ID ${taskId} not found.`);
    err.status = 404;
    return next(err); 
  }

  const [removed] = tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted successfully', task: removed }); 
});

export default router; 