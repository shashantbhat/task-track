import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hardcodedUsers = [
    { username: "shashant bhat", password: "152004", role: "developer" },
    { username: "mehak sharma", password: "082006", role: "manager" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1️⃣ Check hardcoded users first
    const hardcodedUser = hardcodedUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (hardcodedUser) {
      navigate(
        hardcodedUser.role === "developer"
          ? "/dashboard/developer"
          : "/dashboard/manager"
      );
      return;
    }

    // 2️⃣ Check localStorage users
    const localUsers = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users")!)
      : [];
    const localUser = localUsers.find(
      (u: any) => u.username === username && u.password === password
    );

    if (localUser) {
      navigate(
        localUser.role === "developer"
          ? "/dashboard/developer"
          : "/dashboard/manager"
      );
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-black px-6 relative">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Track, Manage & Fix Bugs — Smarter
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          <span className="font-semibold text-black">FealtyX</span> helps developers and
          managers collaborate efficiently, track issues, and ship better code.
          Connect your GitHub repo to streamline your workflow.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowAuth(true)}
            className="bg-black text-white px-6 py-3 rounded-xl font-medium transition shadow-lg"
          >
            Get Started
          </button>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border bg-black text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#ffffff"
              viewBox="0 0 256 256"
            >
              <path d="M232,64a32,32,0,1,0-40,31v17a8,8,0,0,1-8,8H96a23.84,23.84,0,0,0-8,1.38V95a32,32,0,1,0-16,0v66a32,32,0,1,0,16,0V144a8,8,0,0,1,8-8h88a24,24,0,0,0,24-24V95A32.06,32.06,0,0,0,232,64ZM64,64A16,16,0,1,1,80,80,16,16,0,0,1,64,64ZM96,192a16,16,0,1,1-16-16A16,16,0,0,1,96,192ZM200,80a16,16,0,1,1,16-16A16,16,0,0,1,200,80Z"></path>
            </svg>
            Connect with Git
          </a>
        </div>
      </div>

      {/* AUTHORIZATION MODAL */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center relative"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-black"
                onClick={() => setShowAuth(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-6">Login to FealtyX</h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Log In
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;