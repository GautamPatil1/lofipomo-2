// useTodos.js
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";

export const useTodos = (initialTodos) => {
  const [todos, setTodos] = useState(initialTodos);
  const { user, isAuthenticated } = useAuth0();
  const server = 'https://server.gautampatil.tech'

  useEffect(() => {

    const updateDatabase = async () => {
      // Check if the user is authenticated
      if (isAuthenticated) {
        // Update the database with the current todos
        await fetch(`${server}/api/todos`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todos }),
        });
      } else {
        // Update local storage if the user is not authenticated
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    updateDatabase();
  }, [todos, isAuthenticated]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    const fetchTodosFromServer = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(`${server}/api/todos/${user.sub}`);
          const data = await response.json();
          setTodos(data);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      }
    };

    fetchTodosFromServer();
  }, [isAuthenticated]);



  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      userId: isAuthenticated ? (user ? user.sub : localStorage.getItem('userId')) : null,
      task: todo,
      completed: false,
      isEditing: false,
    };

    setTodos([...todos, newTodo]);

    // Send newTodo to the server
    if (isAuthenticated) {
      fetch(`${server}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
    }
  };

  const deleteTodo = async (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    // Delete the todo from the server
    if (isAuthenticated) {
      await fetch(`${server}/api/todos/${id}`, {
        method: "DELETE",
      });
    }
  };

  const toggleComplete = (id) => {
    let updatedTodo = null;

    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          updatedTodo = { ...todo, completed: !todo.completed };
          return updatedTodo;
        }
        return todo;
      })
    );

    // Update completion status on the server
    if (updatedTodo && isAuthenticated) {
      fetch(`${server}/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });
    }
  };

  const updateTask = async (id, newTask) => {
    // Update task text locally
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
    );
  
    // Update task text on the server
    if (isAuthenticated) {
      try {
        await fetch(`${server}/api/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        });
      } catch (error) {
        console.error("Error updating task:", error);
        // Revert the local state to the previous state on error
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? { ...todo, task: todo.task } : todo))
        );
      }
    }
  };

  

  return { todos, addTodo, deleteTodo, toggleComplete, setTodos, updateTask };
};
