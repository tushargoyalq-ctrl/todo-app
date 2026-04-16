import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // GET TODOS
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

  // ADD TODO
  const addTodo = () => {
    if (!text) return;

    fetch("https://todo-app-production-353a.up.railway.app/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then(() => {
        setText("");
        getTodos();
      })
      .catch((err) => console.log(err));
  };

  // DELETE TODO
  const deleteTodo = (id) => {
    fetch(`https://todo-app-production-353a.up.railway.app/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => getTodos())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo App 🚀</h1>

      {/* INPUT + ADD BUTTON */}
      <input
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <h3>Total Todos: {todos.length}</h3>

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id}>
            <p>{todo.text}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;