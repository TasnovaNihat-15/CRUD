let tasks = [];
let nextId = 1;

const VALID_STATUSES = ["To Do", "In Progress", "Completed"];

function getAllTasks({ status, sort, search } = {}) {
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(lowerSearch) ||
      task.description.toLowerCase().includes(lowerSearch)
    );
  }

  if (sort) {
    filteredTasks.sort((a, b) => {
      if (sort === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sort === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sort === 'createdAt') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  }

  return filteredTasks;
}

function getTaskById(id) {
  const numId = parseInt(id, 10);
  return tasks.find(task => task.id === numId);
}

function createTask({ title, description, status = "To Do" }) {
  if (!title || !description) {
    throw new Error("Title and description are required");
  }
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  const task = {
    id: nextId++,
    title,
    description,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
}

function updateTask(id, updates) {
  const numId = parseInt(id, 10);
  const taskIndex = tasks.findIndex(task => task.id === numId);
  if (taskIndex === -1) return null;

  const task = tasks[taskIndex];
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.status !== undefined) {
    if (!VALID_STATUSES.includes(updates.status)) {
      throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`);
    }
    task.status = updates.status;
  }
  task.updatedAt = new Date().toISOString();
  return task;
}

function deleteTask(id) {
  const numId = parseInt(id, 10);
  const taskIndex = tasks.findIndex(task => task.id === numId);
  if (taskIndex === -1) return false;
  tasks.splice(taskIndex, 1);
  return true;
}

module.exports = {
  VALID_STATUSES,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};