import React from 'react';

export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
 
  return (
    <div className="Todo">
        <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <div>
        <i className="fa-solid fa-pen-to-square" onClick={() => editTodo(task.id)} ></i>
        <i className="fa-solid fa-trash" onClick={() => deleteTodo(task.id)} ></i>
        </div>
    </div>
  )
}