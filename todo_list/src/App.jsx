import { useState } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
    setNewTodo('');
  };
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleToggleTodo = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };
  return (
    <div>
      <h1>Todo List</h1>
      <input type= "text" placeholder="Add a new todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button type="button" onClick={() => handleToggleTodo(todo.id)}>{todo.completed ? 'Not Done' : 'Done'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;