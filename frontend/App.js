// Select DOM elements
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Fetch todos from the server and display them
const fetchTodos = async () => {
  try {
    const response = await fetch("/todos");
    const todos = await response.json();
    todoList.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo;
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

// Add a new todo
const addTodo = async () => {
  const todo = todoInput.value.trim();
  if (!todo) {
    alert("Please enter a valid todo.");
    return;
  }

  try {
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo })
    });

    if (response.ok) {
      fetchTodos(); // Refresh the list after adding a new todo
      todoInput.value = ""; // Clear the input field
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

// Event listeners
addTodoButton.addEventListener("click", addTodo);
window.addEventListener("load", fetchTodos); // Fetch todos when the page loads
