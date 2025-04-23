const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// In-memory todo list
let todos = [];

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// API: Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// API: Add a new todo
app.post("/todos", (req, res) => {
  const { todo } = req.body;
  if (!todo || typeof todo !== "string") {
    return res.status(400).json({ error: "Invalid todo" });
  }
  todos.push(todo);
  res.status(201).json({ message: "Todo added successfully" });
});

// API: Get a specific todo by ID
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Catch-all route for frontend (for browser refresh fallback)
app.get("/*", (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
