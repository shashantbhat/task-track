import React, { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
}

interface SidebarProps {
  onSelectProject: (project: Project) => void;
}

const DeveloperSidebar: React.FC<SidebarProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");

  // Load projects from localStorage if exists
  useEffect(() => {
    const savedProjects = localStorage.getItem("devProjects");
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const addProject = () => {
    if (!newProjectName.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("devProjects", JSON.stringify(updatedProjects));
    setNewProjectName("");
  };

  return (
    <div className="w-64 bg-gray-100 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1">
        {projects.length === 0 && <p className="text-gray-500">No projects yet</p>}
        {projects.map((project) => (
          <button
            key={project.id}
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-200 font-medium"
            onClick={() => onSelectProject(project)}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="New project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={addProject}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default DeveloperSidebar;