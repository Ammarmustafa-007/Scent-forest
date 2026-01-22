import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false); // <-- track redirect

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      setRedirect(true); // trigger redirect
    } else {
      setError("Invalid username or password!");
    }
  };

  // ✅ redirect after successful login
  if (redirect) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
        <div className="flex flex-col items-center">
          <img className="h-30 w-27 spin-once fade-in-up" src="/logo.jpg" alt="" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 fade-in-up">
            Admin Authentication 
          </h2>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 fade-in-up">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-600 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-gray-500 cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
