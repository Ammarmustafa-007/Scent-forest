import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Adminnav } from "./Adminnav";
import { Menu, X } from "lucide-react"; // icons

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <header className="h-20 bg-black text-white flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 shadow-md">
        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Title */}
        <h1 className="font-bold text-2xl italic text-orange-200  tracking-wide">Admin Panel</h1>

        {/* Logo */}
        <img
          className="h-20 w-auto p-2 object-contain rounded-md"
          src="/forest.jpg"
          alt="Scent Forest"
        />
      </header>

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed top-20 bottom-0 left-0 z-40 w-64 
          bg-gradient-to-b from-neutral-800 via-neutral-400 to-neutral-800
          text-white shadow-lg border-r border-gray-600
          overflow-y-auto transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
        >
          <Adminnav setSidenav={setSidebarOpen} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
