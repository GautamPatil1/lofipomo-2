import React, {useState} from 'react'
import styles from './TodoList.module.css';

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editTodo(value, task.id);
      };
  return (
    <form onSubmit={handleSubmit} className={styles.TodoForm}>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="styles.todo-input" placeholder='Update task' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}