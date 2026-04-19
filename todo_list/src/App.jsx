import { useState } from 'react';
function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className="todo-item">
      <span className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'gray' : 'black' }}>{todo.text}</span>
      <div className="todo-actions">
        <button className="todo-button" type="button" onClick={() => onDelete(todo.id)}>Delete</button>
        <button className="todo-button" type="button" onClick={() => onToggle(todo.id)}>{todo.completed ? 'Undo' : 'Done'}</button>
      </div>
    </li>
  );
}
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const isDisabled = newTodo.trim() === '';

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
    <div className="app">
      <h1>Todo List</h1>
      <div className="todo-form">
        <div className="todo-controls">
          <input className="todo-input" type="text" placeholder="Add a new todo" value={newTodo} onKeyDown= {(e) => {if (e.key === 'Enter') handleAddTodo()}} onChange={(e) => setNewTodo(e.target.value)}/>
          <button disabled={isDisabled} className={isDisabled ? 'todo-button todo-button--add todo-button--disabled': 'todo-button todo-button--add'} type="button" onClick={handleAddTodo}>
            Add
          </button>
        </div>
      </div>
      {todos.length === 0 ? (
  <p className="center">No todos found</p>
) : (
  <ul className="todo-list">
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
    ))}
  </ul>
)}
    </div>
  );
}

export default App;