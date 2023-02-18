import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  function handleSubmit(ev) {
    // agar ketika di submit tidak reload halaman
    ev.preventDefault();
    // jalankan event onAdd
    onAdd(taskName);
    // Setelah input hapus tulisan di dalam kota inputan
    setTaskName('');
  }
  return (
    <div>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <button>+</button>
        <input type="text" value={taskName} onChange={(ev) => setTaskName(ev.target.value)} placeholder="Your Tnext task...." />
      </form>
    </div>
  );
}
