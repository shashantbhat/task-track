import React, { useEffect, useState } from "react";

interface TaskTicketProps {
  task: {
    id: string | number;
    name: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: string;
    status: string;
    requestedStatus?: string | null;
    timerStart?: number | null; // timestamp when task started
    timeSpent?: number; // in seconds
  };
  onEdit: (task: any) => void;
  onDelete?: (taskId: string | number) => void;
}

const TaskCard: React.FC<TaskTicketProps> = ({ task, onEdit, onDelete }) => {
  const [liveTime, setLiveTime] = useState<number>(() => {
    const saved = localStorage.getItem(`timer_${task.id}`);
    return saved ? JSON.parse(saved).timeSpent : task.timeSpent || 0;
  });

  const [timerStart, setTimerStart] = useState<number | null>(() => {
    const saved = localStorage.getItem(`timer_${task.id}`);
    return saved ? JSON.parse(saved).timerStart : task.timerStart || null;
  });

  useEffect(() => {
    // Whenever task updates, if status changes to active, resume timer
    if (task.status !== "Done" && task.status !== "Cancelled") {
      if (!timerStart) {
        const now = Date.now();
        setTimerStart(now);
        localStorage.setItem(
          `timer_${task.id}`,
          JSON.stringify({ timeSpent: liveTime, timerStart: now })
        );
      }
    } else {
      // Task marked as Done or Cancelled → stop timer and save final time
      if (timerStart) {
        const now = Date.now();
        const elapsed = Math.floor((now - timerStart) / 1000);
        const total = liveTime + elapsed;
        setLiveTime(total);
        setTimerStart(null);
        localStorage.setItem(
          `timer_${task.id}`,
          JSON.stringify({ timeSpent: total, timerStart: null })
        );
      }
    }
  }, [task.status]);

  // Live timer effect
  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (timerStart && task.status !== "Done" && task.status !== "Cancelled") {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - timerStart) / 1000);
        setLiveTime((prev) => {
          const total = prev + 1;
          localStorage.setItem(
            `timer_${task.id}`,
            JSON.stringify({ timeSpent: total, timerStart })
          );
          return total;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerStart, task.status]);

  // Determine border color based on priority
  const borderColor =
    task.priority === "Low"
      ? "border-green-500"
      : task.priority === "Medium"
      ? "border-yellow-500"
      : task.priority === "High"
      ? "border-red-500"
      : "border-blue-500"; // default

  const formatTime = (seconds: number = 0) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow mb-4 border-l-4 relative ${borderColor}`}
    >
      <h3 className="font-semibold text-md break-words truncate">{task.name}</h3>
      <p className="text-sm text-gray-500 break-words truncate">ID: {task.id}</p>
      <p className="text-sm mt-2 break-words">{task.description}</p>
      <p className="text-xs text-gray-400 mt-1 break-words">
        Assignee: {task.assignee} | Due: {task.dueDate} | Priority:{" "}
        {task.priority}
      </p>

      {task.requestedStatus && (
        <p className="text-red-600 mt-1 text-sm font-semibold break-words">
          Requested: {task.requestedStatus}
        </p>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Time Spent: {formatTime(liveTime)}
      </p>

      <button
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={() => onEdit(task)}
      >
        Edit
      </button>

      {task.status === "Cancelled" && onDelete && (
        <button
          className="absolute top-2 right-2 text-red-600 font-bold text-lg hover:opacity-70"
          onClick={() => onDelete(task.id)}
        >
          ❌
        </button>
      )}
    </div>
  );
};

export default TaskCard;