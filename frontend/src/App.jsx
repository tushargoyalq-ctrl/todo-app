import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ GET TODOS
  const getTodos = () => {
    setLoading(true);
    fetch("https://todo-app-production-353a.up.railway.app/api/todos")
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

  // ✅ ADD TODO
  const addTodo = () => {
    if (!text) return;

    fetch("https://todo-app-production-353a.up.railway.app/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then(() => {
        setText("");
        getTodos();
      })
      .catch((err) => console.log(err));
  };

  // ✅ LOAD ON START
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo App 🚀</h1>

      {/* INPUT + BUTTON */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo..."
        style={{ padding: "8px", width: "200px" }}
      />
      <button onClick={addTodo} style={{ marginLeft: "10px", padding: "8px" }}>
        Add
      </button>

      <h3>Total Todos: {todos.length}</h3>

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        todos.map((todo) => (
          <p key={todo._id}>{todo.text}</p>
        ))
      )}
    </div>
  );
}

export default App;