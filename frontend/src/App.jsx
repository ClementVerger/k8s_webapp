// src/App.jsx
import { useEffect, useState } from 'react';
import { fetchTasks, createTask } from './api/client';


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[App] useEffect déclenché, début fetchTasks');
    (async () => {
      try {
        const data = await fetchTasks();
        console.log('[App] fetchTasks OK, data =', data);
        setTasks(data);
      } catch (err) {
        console.error('Erreur fetchTasks:', err);
      } finally {
        console.log('[App] setLoading(false)');
        setLoading(false);
      }
    })();
  }, []);


  const handleAddTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error('Erreur createTask:', err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Mes tâches</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}
