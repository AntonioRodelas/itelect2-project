import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

console.log('Server starting...');

const dueDate = new Date("2026-07-22");
console.log(formatDate(dueDate));

console.log(validateTask({ title: "Graded Task 3", dueDate })); 

console.log(validateTask()); 

const original = { title: "Old", priority: "High" };
console.log(mergeTaskUpdate(original, { title: "GT3" })); 
