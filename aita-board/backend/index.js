const express = require('express');
const cors = require('cors');     // <-- Add this line
const app = express();

app.use(cors());                  // <-- And this line
app.use(express.json());

// Sample in-memory data
let lists = [
  {
    id: 1,
    title: "To Do",
    tasks: [
      { id: 1, title: "Learn React", description: "Study React fundamentals" }
    ]
  },
  {
    id: 2,
    title: "Done",
    tasks: [
      { id: 2, title: "Set up backend", description: "Build API with Express" }
    ]
  }
];

// Get all lists
app.get('/api/lists', (req, res) => res.json(lists));

// Add a task to a list
app.post('/api/lists/:listId/tasks', (req, res) => {
  const { listId } = req.params;
  const { title, description } = req.body;
  const list = lists.find(l => l.id === Number(listId));
  if (!list) return res.status(404).json({ error: "List not found" });
  const newTask = {
    id: Date.now(),
    title,
    description
  };
  list.tasks.push(newTask);
  res.json(newTask);
});

// Delete a task from a list
app.delete('/api/lists/:listId/tasks/:taskId', (req, res) => {
  const { listId, taskId } = req.params;
  const list = lists.find(l => l.id === Number(listId));
  if (!list) return res.status(404).json({ error: "List not found" });
  list.tasks = list.tasks.filter(t => t.id !== Number(taskId));
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend API running on port ${PORT}`));
