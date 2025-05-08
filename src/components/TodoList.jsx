import React from 'react';

export default function TodoList({ todos, removeTodo }) {
  return (
    <ul className="mt-6 space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex justify-between items-center"
        >
          <div>
            <span className="font-medium">{todo.text}</span>
            <br />
            <span className="text-sm text-gray-500">{new Date(todo.datetime).toLocaleString()}</span>
          </div>
          <button
            onClick={() => removeTodo(todo.id)}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
