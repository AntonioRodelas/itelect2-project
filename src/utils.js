export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = ({ title, dueDate } = {}) => {
  return !!(title && dueDate);
};

export const mergeTaskUpdate = (original, ...updates) => {
  return Object.assign({}, original, ...updates);
};