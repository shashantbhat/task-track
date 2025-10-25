// components/AddTaskModal.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

interface AddTaskModalProps {
  projectId: string; // associate task with a project
  onClose: () => void;
  onAddTask: (task: any) => void;
  taskToEdit?: {
    id: string;
    name: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: string;
    status: string;
    projectId: string;
  }; // optional, only when editing a task
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  projectId,
  onClose,
  onAddTask,
  taskToEdit,
}) => {
  const [name, setName] = useState(taskToEdit?.name || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [assignee, setAssignee] = useState(taskToEdit?.assignee || "");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");
  const [priority, setPriority] = useState(taskToEdit?.priority || "Medium");
  const [status, setStatus] = useState(taskToEdit?.status || "Backlog");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: taskToEdit?.id || Date.now().toString(),
      projectId,
      name,
      description,
      assignee,
      dueDate,
      priority,
      status,
    };
    onAddTask(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative">
        <h2 className="text-2xl font-bold mb-4">
          {taskToEdit ? "Update Task" : "Add New Task"}
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Inputs for name, description, assignee, dueDate, priority, status */}
          <input
            type="text"
            placeholder="Task Name"
            className="w-full border px-4 py-2 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border px-4 py-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Assignee"
            className="w-full border px-4 py-2 rounded-lg"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border px-4 py-2 rounded-lg"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <select
            className="w-full border px-4 py-2 rounded-lg"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select
            className="w-full border px-4 py-2 rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Backlog</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Under Review</option>
            <option>Done</option>
            <option>Cancelled</option>
          </select>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </form>
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;