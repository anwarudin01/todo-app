import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  // menyimpan data tasks pada lokal storage
  useEffect(() => {
    // jika localStorage kosong tidak usah dijalankan updatenya
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, []);

  // Fungsi untuk menambahkan data yang di tulis kedalam form
  function addTask(name) {
    setTasks((prev) => {
      // ambil semua data previus(sebelumnya) yang ada di FormTask
      return [...prev, { name: name, done: false }];
    });
  }

  // menghapus task
  function removeTask(indexToRemove) {
    setTasks((prev) => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  // merubah nilai boolean pada object task
  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏 ';
    }
    if (percentage === 100) {
      return 'Nice job for you today! 💡  ';
    }

    return 'Keep it going 💪 ';
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  return (
    <main>
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      {/* masukkan event onAdd untuk menjalankan fungsi addTask */}
      <TaskForm onAdd={addTask} />
      {/* memunculkan setiap list yang ada di state tasks */}
      {tasks.map((task, index) => (
        // parsing semua data yanga ada di state tasks
        <Task {...task} onRename={(newName) => renameTask(index, newName)} onTrash={() => removeTask(index)} onToggle={(done) => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
