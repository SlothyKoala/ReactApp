import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    if (input.trim()) {
      const newTodo: Item = { id: Date.now(), text: input, completed: false };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-300 smooth-entrance">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          className="border border-gray-600 rounded-md p-2 flex-grow bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleClick}
          className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between items-center p-4 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:bg-gray-700 ${
              todo.completed ? "line-through text-gray-500" : "text-gray-300"
            }`}
          >
            <span onClick={() => handleToggle(todo.id)} className="flex-1 cursor-pointer">
              {todo.text}
            </span>
            <button
              className="ml-4 text-red-500 hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;