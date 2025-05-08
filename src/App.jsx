import React, { useEffect, useRef, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [ringingTodo, setRingingTodo] = useState(null); // To track which alarm is ringing
  const alarmRef = useRef(null);
  const todosRef = useRef(todos);

  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }

    // Mark the todo as completed
    const updatedTodos = todosRef.current.map((todo) =>
      todo.id === ringingTodo?.id ? { ...todo, completed: true } : todo
    );

    setTodos(updatedTodos);
    setRingingTodo(null); // Clear ringing state
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      todosRef.current.forEach((todo) => {
        const todoTime = new Date(todo.datetime);

        const isSameMinute =
          !todo.completed &&
          now.getFullYear() === todoTime.getFullYear() &&
          now.getMonth() === todoTime.getMonth() &&
          now.getDate() === todoTime.getDate() &&
          now.getHours() === todoTime.getHours() &&
          now.getMinutes() === todoTime.getMinutes();

        if (isSameMinute && !ringingTodo) {
          const alarm = new Audio('/alarm.mp3');
          alarm.loop = true;
          alarm.play();

          alarmRef.current = alarm;
          setRingingTodo(todo); // Set which task is ringing
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ringingTodo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📋 To-Do List with Alarm
        </h1>

        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} removeTodo={removeTodo} />

        {ringingTodo && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-red-600 mb-2">
              ⏰ Alarm ringing for: {ringingTodo.text}
            </p>
            <button
              onClick={stopAlarm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Stop Alarm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
