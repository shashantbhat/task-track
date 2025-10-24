import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const Hero = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-black px-6 relative bg-white overflow-hidden">
      <div className="text-center max-w-2xl z-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Track, Manage & Fix Bugs — Smarter
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          <span className="font-semibold text-black">FealtyX</span> helps developers and managers
          collaborate efficiently, track issues, and ship better code.
          Connect your GitHub repo to streamline your workflow.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowAuth(true)} // open auth modal
            className="bg-black text-white px-6 py-3 rounded-xl font-medium transition shadow-lg hover:bg-gray-900"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/connect-github")}
            className="flex items-center gap-2 border bg-black text-white px-6 py-3 rounded-xl font-medium transition shadow-md hover:bg-gray-900"
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
          </button>
        </div>
      </div>

      {/* Fading Authorization Modal */}
      <AnimatePresence>
        {showAuth && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuth(false)}
            />

            {/* Auth Window */}
            <motion.div
              className="fixed z-30 bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Authorization</h2>
              <p className="text-gray-600 mb-6">
                Please sign in with your credentials to access the FealtyX dashboard.
              </p>
              <button
                onClick={() => {
                  setShowAuth(false);
                  navigate("/login");
                }}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
              >
                Proceed to Login
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;