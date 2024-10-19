import { useState } from 'react';

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([
    {id: 1, text: "Learn Typescript", completed: false},
    {id: 2, text: "Build Todo List App", completed: false}
  ]);

  const [input, setInput] = useState<string>("");

  const handleToggle = (id:number) => {
    setTodos(
      todos.map((todo) => {
        if(todo.id === id) {
          return {...todo, completed:  !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    const newTodo: item = {id: Date.now(), text: input, completed: false}
    setTodos([...todos, newTodo])
  };

  return (
    <div className='main-container'>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.text} onClick={() => handleToggle(todo.id)} style={{cursor: "pointer", textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</li>
        ))}
      </ul>
      <input type="text" placeholder="Add todo item" onChange={(e) => setInput(e.currentTarget.value)} />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}
