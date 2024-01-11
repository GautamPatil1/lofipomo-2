import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const { user, isAuthenticated } = useAuth0();

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder={
          isAuthenticated
            ? user.nickname + "'s Tasks for Today: "
            : "Add your Tasks:"
        }
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
