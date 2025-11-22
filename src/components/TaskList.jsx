import React, { useContext,useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({query}) {
    const {tasks, setTasks} = useContext(TaskContext);

    function toggleComplete(task) {
      const updatedTask = !task.completed
        fetch(`http://localhost:6001/tasks/${task.id}`, {
          method:"PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({completed: updatedTask})
        })
        .then(r => {
          if(!r.ok) { throw new Error("failed to mark task completed")}
          return r.json()
        })
        .then(setTasks(prevTasks => 
          prevTasks.map(prevTask => 
            prevTask.id === task.id ? {...prevTask, completed: !prevTask.completed} : prevTask
          )))
        .catch(error => console.log(error.message))
    }
    const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button data-testid={task.id} onClick={() => toggleComplete(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
