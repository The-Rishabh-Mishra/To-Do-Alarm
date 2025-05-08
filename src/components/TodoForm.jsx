import React, { useState, useEffect } from 'react';

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(''); // Store selected date

  // Automatically set the current date when the component mounts
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA'); // local time, format: yyyy-mm-dd
    setDate(today);
  }, []);
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the selected date (user can modify) or fallback to today's date if no date is selected
    const selectedDate = date || new Date().toISOString().split('T')[0];

    // Combine the selected date and entered time
    const datetime = `${selectedDate}T${time}:00`;

    // Create the new to-do object
    const newTodo = {
      id: Date.now(), // Unique ID based on current time
      text,
      datetime, // The datetime including the selected date and entered time
      completed: false,
    };

    // Add the new to-do
    addTodo(newTodo);

    // Reset form fields
    setText('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} // Allow user to modify date
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
}
