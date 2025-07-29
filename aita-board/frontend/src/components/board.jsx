import { useState } from "react";
import List from "./List";

const initialLists = [
  {
    id: 1,
    title: "To Do",
    tasks: [
      { id: 1, title: "Learn React", description: "Study React fundamentals" },
      { id: 2, title: "Setup project", description: "Initialize with Vite/React" },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    tasks: [
      { id: 3, title: "Build UI", description: "Build Board/List/Task components" },
    ],
  },
  {
    id: 3,
    title: "Done",
    tasks: [
      { id: 4, title: "Folder structure", description: "Create project folders and README" },
    ],
  },
];

export default function Board() {
  const [lists, setLists] = useState(initialLists);

  // To add a new task to a list by listId
  const addTask = (listId, taskTitle, taskDescription) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: Date.now(),
                  title: taskTitle,
                  description: taskDescription,
                },
              ],
            }
          : list
      )
    );
  };

  // To delete a task by listId and taskId
  const deleteTask = (listId, taskId) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  };

  return (
    <div style={{ display: "flex", padding: 16, backgroundColor: "#ddd", minHeight: "100vh" }}>
      {lists.map(list => (
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          tasks={list.tasks}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

