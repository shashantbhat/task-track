// dashboards/DeveloperDashboard.tsx
import React, { useState, useEffect, useRef } from "react";
import TaskCard from "../components/task-ticket";
import AddTaskModal from "../components/add-task-modal";
import DeveloperSidebar from "../components/side-bar";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const columns = ["Backlog", "To Do", "In Progress", "Under Review", "Done", "Cancelled"];

interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: string;
  status: string;
  requestedStatus?: string | null;
  projectId: string;
  timeSpent?: number;
  timerStart?: number | null;
}

const filterFields = ["assignee", "priority", "status"];

const DeveloperDashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [filterField, setFilterField] = useState("assignee");
  const [filterValue, setFilterValue] = useState("");
  const [greeting, setGreeting] = useState("");
  const [developerName, setDeveloperName] = useState("");

  const popoverRef = useRef<HTMLDivElement>(null);

  // 🟢 Load saved tasks on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("devTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // 🟢 Handle clicking outside filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowFilterPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🕒 Persistent timer updater
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => {
        const updated = prevTasks.map((task) => {
          if (
            task.status !== "Done" &&
            task.status !== "Cancelled" &&
            task.timerStart
          ) {
            const now = Date.now();
            const elapsed = Math.floor((now - task.timerStart) / 1000);
            return { ...task, timeSpent: elapsed };
          }
          return task;
        });
        localStorage.setItem("devTasks", JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🟢 Greeting + current user
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const currentUser = users.find((u: any) => u.email === currentUserEmail);

    if (currentUser) {
      setDeveloperName(currentUser.username);
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // 🟢 Save tasks
  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("devTasks", JSON.stringify(updatedTasks));
  };

  // 🆕 Add Task — starts timer immediately
  const addTask = (task: Task) => {
    const newTask = {
      ...task,
      timerStart: Date.now(),
      timeSpent: 0,
    };
    saveTasks([...tasks, newTask]);
  };

  // 📝 Update Task — preserve / stop / resume timer
 const updateTask = (task: Task) => {
  const oldTask = tasks.find((t) => t.id === task.id);
  if (!oldTask) return;

  let updatedTask: Task = { ...task };

  // If status changed
  if (oldTask.status !== task.status) {
    // Developer requests Done or Cancelled
    if (task.status === "Done" || task.status === "Cancelled") {
      const elapsed = oldTask.timerStart
        ? Math.floor((Date.now() - oldTask.timerStart) / 1000)
        : oldTask.timeSpent || 0;

      updatedTask = {
        ...task,
        status: "Under Review", // show Under Review to developer
        requestedStatus: task.status, // record request for manager
        timeSpent: elapsed, // stop timer
        timerStart: null,
      };

      alert(
        `Your request to mark this task as "${task.status}" has been recorded and sent for review.`
      );
    } else {
      // Status changed to something other than Done/Cancelled
      // Resume timer if previously stopped
      if (oldTask.status === "Done" || oldTask.status === "Cancelled") {
        updatedTask.timerStart = Date.now() - (oldTask.timeSpent || 0) * 1000;
      }
      // Clear requestedStatus because it's no longer pending
      updatedTask.requestedStatus = null;
    }
  } else {
    // Status did not change, just update other fields
    updatedTask = { ...oldTask, ...task };
  }

  const newTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
  saveTasks(newTasks);
};

  // 🗑 Delete Task
  const deleteTask = (taskId: string | number) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    saveTasks(updatedTasks);
  };

  // 🔍 Filter + Search
  const filteredTasks = tasks.filter((task) => {
    if (task.projectId !== currentProject?.id) return false;
    const matchesName = task.name.toLowerCase().includes(searchValue.toLowerCase());
    let matchesFilter = true;
    if (filterValue) {
      const fieldValue = (task as any)[filterField]?.toLowerCase() || "";
      matchesFilter = fieldValue.includes(filterValue.toLowerCase());
    }
    return matchesName && matchesFilter;
  });

  // 🧱 UI
  return (
    <div className="flex h-screen">
      <DeveloperSidebar onSelectProject={(project) => setCurrentProject(project)} />

      <div className="flex-1 p-6 overflow-auto relative">
        {!currentProject ? (
          <p className="text-gray-500">Select a project to see the dashboard</p>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {greeting}, {developerName}
              </h2>
            </div>

            <div className="flex justify-between">
              <h1 className="text-3xl font-bold mb-6">{currentProject.name}</h1>
              <Link
                to={"/"}
                className="flex text-md px-3 py-1.5 font-medium items-center max-w-30 max-h-8 bg-black text-white rounded-lg hover:opacity-90 transition"
              >
                Log out
              </Link>
            </div>

            {/* Search bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search by task name..."
                className="w-full border px-4 py-2 rounded-lg"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowFilterPopover(true)}
              />

              <AnimatePresence>
                {showFilterPopover && (
                  <motion.div
                    ref={popoverRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-full max-w-xs bg-white border shadow-lg rounded-lg p-4 z-50"
                  >
                    <select
                      className="w-full border px-3 py-2 rounded-lg mb-2"
                      value={filterField}
                      onChange={(e) => setFilterField(e.target.value)}
                    >
                      {filterFields.map((field) => (
                        <option key={field} value={field}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder={`Filter by ${filterField}`}
                      className="w-full border px-3 py-2 rounded-lg"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              Add Task
            </button>

            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {columns.map((col) => (
                <div key={col} className="bg-gray-100 p-4 rounded-lg min-h-full">
                  <h2 className="font-semibold mb-4">{col}</h2>
                  {filteredTasks
                    .filter((task) => task.status === col)
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => setEditingTask(task)}
                        onDelete={deleteTask}
                      />
                    ))}
                </div>
              ))}
            </div>

            {/* Modals */}
            {showModal && (
              <AddTaskModal
                projectId={currentProject.id}
                onClose={() => setShowModal(false)}
                onAddTask={addTask}
              />
            )}
            {editingTask && (
              <AddTaskModal
                projectId={currentProject.id}
                onClose={() => setEditingTask(null)}
                onAddTask={updateTask}
                taskToEdit={editingTask}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeveloperDashboard;