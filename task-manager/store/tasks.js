const { v4: uuidv4 } = require('uuid');

const VALID_STATUSES = ['To Do', 'In Progress', 'Completed'];

let tasks = [];

function getAllTasks({ status, sort, search } = {}) {
  let result = [...tasks];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
    );
  }

  if (status) {
    result = result.filter(t => t.status === status);
  }

  if (sort === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'status') {
    const order = { 'To Do': 0, 'In Progress': 1, 'Completed': 2 };
    result.sort((a, b) => order[a.status] - order[b.status]);
  } else if (sort === 'createdAt') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
}

function getTaskById(id) {
  return tasks.find(t => t.id === id) || null;
}

function createTask({ title, description = '', status = 'To Do' }) {
  if (!title || title.trim() === '') throw new Error('Title is required');
  if (!VALID_STATUSES.includes(status)) throw new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`);

  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}

function updateTask(id, { title, description, status }) {
  const task = getTaskById(id);
  if (!task) return null;

  if (title !== undefined) {
    if (title.trim() === '') throw new Error('Title cannot be empty');
    task.title = title.trim();
  }
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) throw new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    task.status = status;
  }

  task.updatedAt = new Date().toISOString();
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, VALID_STATUSES };
