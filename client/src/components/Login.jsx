import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To handle error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the fetch POST request to your backend
      const response = await fetch("http://localhost:8000/auth/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed. Please try again.");
      }

      const data = await response.json(); // Assuming the token is returned in the response
      localStorage.setItem("token", data.token); // Store the JWT token in localStorage

      // Navigate to home page after successful login
      navigate("/");
    } catch (error) {
      // Handle any errors from the fetch request
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="button"
              className="absolute inset-y-0 pt-8 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button
            className="w-full bg-blue text-white py-3 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
