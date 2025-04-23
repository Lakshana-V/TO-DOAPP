const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Temporary in-memory store for todos
let todos = [];

app.use(cors()); // Enable CORS so frontend can connect
app.use(express.json()); // Parse JSON request bodies

// Route to get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Route to add a new todo
app.post("/todos", (req, res) => {
  const { todo } = req.body;
  if (!todo || typeof todo !== "string") {
    return res.status(400).json({ error: "Invalid todo" });
  }
  todos.push(todo);
  res.status(201).json({ message: "Todo added successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
