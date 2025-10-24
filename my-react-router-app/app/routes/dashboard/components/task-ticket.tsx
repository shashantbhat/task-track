// components/TaskCard.tsx
import React from "react";

interface TaskTicketProps {
  task: {
    id: number;
    name: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: string;
    status: string;
  };
  onEdit: (task: any) => void;
}

const TaskCard: React.FC<TaskTicketProps> = ({ task, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-blue-500">
      <h3 className="font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-500">ID: {task.id}</p>
      <p className="text-sm mt-2">{task.description}</p>
      <p className="text-xs text-gray-400 mt-1">
        Assignee: {task.assignee} | Due: {task.dueDate} | Priority: {task.priority}
      </p>
      <button
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={() => onEdit(task)}
      >
        Edit
      </button>
    </div>
  );
};

export default TaskCard;