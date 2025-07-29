import { useState } from "react";
import Task from "./Task";

export default function List({ id, title, tasks, onAddTask, onDeleteTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const handleAdd = e => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(id, taskTitle, taskDesc);
      setTaskTitle("");
      setTaskDesc("");
    }
  };

  return (
    <div style={{ width: 300, marginRight: 16, backgroundColor: "#eee", padding: 8, borderRadius: "6px" }}>
      <h3>{title}</h3>
      {tasks.map(task => (
        <Task
          key={task.id}
          title={task.title}
          description={task.description}
          onDelete={() => onDeleteTask(id, task.id)}
        />
      ))}

      <form onSubmit={handleAdd} style={{ marginTop: 12 }}>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          style={{ width: "90%", marginBottom: 4 }}
        />
        <textarea
          placeholder="Description"
          value={taskDesc}
          onChange={e => setTaskDesc(e.target.value)}
          rows={2}
          style={{ width: "90%" }}
        />
        <button type="submit" style={{ marginTop: 4, width: "95%" }}>
          Add Task
        </button>
      </form>
    </div>
  );
}
