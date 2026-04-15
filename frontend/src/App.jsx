import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const getTodos = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;

    await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this todo?")) return;

    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });

    getTodos();
  };

  return (
    <div className="container">
      <h1>Todo App 🚀</h1>

      <input
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />

      <button onClick={addTodo}>Add</button>

      <h2>Total Todos: {todos.length}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="todo">
            <p>
              {todo.text}
              <button onClick={() => deleteTodo(todo._id)}>❌</button>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;