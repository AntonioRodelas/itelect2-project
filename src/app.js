import { formatDate, validateTask, mergeTaskUpdate, createTask } from './utils.js';
import { fetchSampleUsers } from './api.js';

const API_BASE_URL = 'http://localhost:3000/api';

console.log('Server starting...');

const dueDate = new Date('2026-07-22');
console.log(formatDate(dueDate));

console.log(validateTask({ title: 'Graded Task 3', dueDate }));
console.log(validateTask());

const original = { title: 'Old', priority: 'High' };
console.log(mergeTaskUpdate(original, { title: 'GT3' }));

async function runTaskApiWorkflow() {
  try {
    // 1. Log in as Admin
    const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@taskmanager.com',
        password: 'AdminPass123!',
      }),
    });

    const authData = await loginRes.json();
    if (!loginRes.ok) throw new Error(authData.error || 'Login failed');

    const token = authData.token;
    console.log('Successfully authenticated as:', authData.user.email);

    // 2. Fetch Tasks
    const tasksRes = await fetch(`${API_BASE_URL}/tasks`);
    const tasks = await tasksRes.json();
    console.log('Fetched tasks count:', tasks.length);

    // 3. Create Task (Bearer token required)
    const newTaskRes = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Complete GT10 Security Verification',
        userId: authData.user.id,
      }),
    });

    const createdTask = await newTaskRes.json();
    console.log('Created task via API:', createdTask);

    // 4. Delete Task (Admin token required)
    if (createdTask && createdTask.id) {
      const deleteRes = await fetch(`${API_BASE_URL}/tasks/${createdTask.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deleteResult = await deleteRes.json();
      console.log('Deleted task response:', deleteResult);
    }
  } catch (err) {
    console.error('API Workflow Error:', err.message);
  }
}

async function main() {
  try {
    const users = await fetchSampleUsers();
    console.log('Sample users:', users);

    const task = createTask({ title: 'Finish GT4 assignment', dueDate: new Date() });
    console.log('Created task:', task);

    await runTaskApiWorkflow();
  } catch (err) {
    console.error('Error in main():', err.message);
  }
}

main();