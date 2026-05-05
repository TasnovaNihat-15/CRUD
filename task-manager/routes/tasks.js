const express = require("express");
const router = express.Router();
const store = require("../store/tasks");

router.get("/", (req, res) => {
  const { status, sort, search } = req.query;

  if (status && !store.VALID_STATUSES.includes(status)) {
    return res
      .status(400)
      .json({
        error: `Invalid status. Must be one of: ${store.VALID_STATUSES.join(", ")}`,
      });
  }

  const tasks = store.getAllTasks({ status, sort, search });
  res.json({ count: tasks.length, tasks });
});

router.get("/:id", (req, res) => {
  const task = store.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

router.post("/", (req, res) => {
  try {
    const task = store.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const task = store.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  if (!status)
    return res.status(400).json({ error: "status field is required" });

  try {
    const task = store.updateTask(req.params.id, { status });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", (req, res) => {
  const deleted = store.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Task not found" });
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;
