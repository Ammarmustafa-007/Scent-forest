import React from "react";
import { NavLink } from "react-router-dom";

export const Adminnav = ({setSidenav}) => {
  return (
    <nav className="flex flex-col h-full pt-15 text-lg italic p-4 space-y-10 fade-in-up ">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `block px-4 py-2 rounded hover:bg-gray-700 transition ${
            isActive ? "bg-gray-800 font-bold": ""
          }`
          
        }
        onClick={() => setSidenav(false)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `block px-4 py-2 rounded hover:bg-gray-700 transition ${
            isActive ? "bg-#1E1B4B font-bold" : ""
          }`
        }
        onClick={() => setSidenav(false)}
      >
        Order Management
      </NavLink>
      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          `block px-4 py-2 rounded hover:bg-gray-700 transition ${
            isActive ? "bg-gray-800 font-bold" : ""
          }`
        }
        onClick={() => setSidenav(false)}
      >
        Product Management
      </NavLink>
    </nav>
  );
};
