import React, { useState } from "react";
import { useNavigate } from "react-router";

// Utility functions
const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const addUser = (email: string, password: string, role: string) => {
  const users = getUsers();
  const username = email.split("@")[0]; // generate username from email
  users.push({ email, username, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  return username;
};

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer"); // default role
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if email already exists
    const users = getUsers();
    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      setError("Email is already registered");
      return;
    }

    const username = addUser(email, password, role);
    alert(`User registered successfully! Your username is: ${username}, kindly sign in with this username :)`);
    setEmail("");
    setPassword("");
    navigate("/"); // redirect to login page
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded-lg mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-2 rounded-lg mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className="w-full border px-4 py-2 rounded-lg mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="developer">Developer</option>
        <option value="manager">Manager</option>
      </select>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Register
      </button>
    </form>
  );
};

export default Signup;