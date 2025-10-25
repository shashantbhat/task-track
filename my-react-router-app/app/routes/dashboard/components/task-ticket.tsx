// components/TaskCard.tsx
import React from "react";

interface TaskTicketProps {
  task: {
    id: string | number;
    name: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: string;
    status: string;
    requestedStatus?: string | null; // optional requested status
  };
  onEdit: (task: any) => void;
  onDelete?: (taskId: string | number) => void; // optional delete function
}

const TaskCard: React.FC<TaskTicketProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-blue-500 relative">
      <h3 className="font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-500">ID: {task.id}</p>
      <p className="text-sm mt-2">{task.description}</p>
      <p className="text-xs text-gray-400 mt-1">
        Assignee: {task.assignee} | Due: {task.dueDate} | Priority: {task.priority}
      </p>
      
      {/* Show requested status if it exists */}
      {task.requestedStatus && (
        <p className="text-red-600 mt-1 text-sm font-semibold">
          Requested: {task.requestedStatus}
        </p>
      )}

      <button
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={() => onEdit(task)}
      >
        Edit
      </button>

      {/* ❌ Show delete button for Cancelled tasks */}
      {task.status === "Cancelled" && onDelete && (
        <button
          className="absolute top-2 right-2 text-red-600 font-bold text-lg hover:opacity-70"
          onClick={() => onDelete(task.id)}
        >
          <div className="translate-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF0000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default TaskCard;