import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const { tasks, setTasks } = useContext(TaskContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    const taskId = tasks.length + 1
    const stringId = taskId.toString()
    const newTask = {
      id: stringId,
      title: taskName,
      completed: false,
    };
    setTaskName("");
    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("failed to create listing");
        }
        return r.json();
      })
      .then(setTasks((prevTasks) => [...prevTasks, newTask]))
      .catch((error) => console.log(error.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>New Task:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
