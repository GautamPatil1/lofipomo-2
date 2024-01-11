import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { useTodos } from './useTodos';
import { useAuth0 } from "@auth0/auth0-react";

const TodoList = () => {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const {isAuthenticated} = useAuth0();
  const { todos, addTodo, deleteTodo, toggleComplete, setTodos, updateTask } = useTodos(initialTodos);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true); // New state to track loading

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );

    if (isAuthenticated){
      updateTask(id, task);
    }

  };

  var currDate = new Date();
  var date = currDate.getDate();
  var day = currDate.getDay();
  var month = currDate.getMonth();
  var hours = currDate.getHours();
  var minutes = currDate.getMinutes();


  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Make request to OpenWeatherMap API
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6a4c0923662a6a85d04989ee673b84d2&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeather({
              description: data.weather[0].description,
              temperature: data.main.temp,
              icon: data.weather[0].icon,
              city: data.name,
            });
            setLoadingWeather(false);
          })
          .catch((error) => console.error("Error fetching weather:", error));
        setLoadingWeather(false);
      },
      setLoadingWeather(false),
      (error) => console.error("Error getting location:", error)
    );
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="TodoWrapper">
      <h1>
        {hours}:{minutes < 10 ? "0" + minutes : minutes}
      </h1>
      <span className="cal">
        {daysOfWeek[day]}, {date} {months[month]}
        {weather &&
          !loadingWeather && ( // Check if weather is available and not loading
            <span className="temp">
              {weather.city} {Math.round(weather.temperature)}°C
            </span>
          )}
        {loadingWeather && <span></span>}
      </span>

      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? ( 
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoList;
