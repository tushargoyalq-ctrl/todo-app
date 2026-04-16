import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => <p key={todo._id}>{todo.text}</p>)
      )}
    </div>
  );
}

export default App;