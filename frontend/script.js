const apiURL = "http://localhost:3000/todos";

async function fetchTodos() {
  try {
    const response = await fetch(apiURL);
    const todos = await response.json();
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach(todo => {
      const li = document.createElement("li");
      li.innerText = todo;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const todo = input.value.trim();

  if (todo === "") return;

  try {
    await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo })
    });

    input.value = "";
    fetchTodos(); // Refresh the list
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

// Load todos on page load
document.addEventListener("DOMContentLoaded", fetchTodos);
