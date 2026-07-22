import { formatDate, validateTask, mergeTaskUpdate, createTask } from './utils.js';
import { fetchSampleUsers } from './api.js';
 
console.log('Server starting...');
 
const dueDate = new Date("2026-07-22");
console.log(formatDate(dueDate));
 
console.log(validateTask({ title: "Graded Task 3", dueDate }));
 
console.log(validateTask());
 
const original = { title: "Old", priority: "High" };
console.log(mergeTaskUpdate(original, { title: "GT3" }));
 
async function main() {
  try {
    const users = await fetchSampleUsers();
    console.log("Sample users:", users);
 
    const task = createTask({ title: "Finish GT4 assignment", dueDate: new Date() });
    console.log("Created task:", task);
  } catch (err) {
    console.error("Error in main():", err.message);
  }
}
 
main();
 