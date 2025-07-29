import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

const API_BASE = "http://localhost:4000/api"; // Make sure this matches your backend

export default function Board() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch lists from backend on mount
  useEffect(() => {
    axios.get(`${API_BASE}/lists`)
      .then(res => setLists(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Add a new task
  const addTask = async (listId, title, description) => {
    const res = await axios.post(`${API_BASE}/lists/${listId}/tasks`, { title, description });
    setLists(lists => lists.map(
      list => list.id === listId
        ? { ...list, tasks: [...list.tasks, res.data] }
        : list
    ));
  };

  // Delete a task
  const deleteTask = async (listId, taskId) => {
    await axios.delete(`${API_BASE}/lists/${listId}/tasks/${taskId}`);
    setLists(lists => lists.map(
      list => list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    ));
  };

  if (loading) return <div>Loading...</div>;

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

