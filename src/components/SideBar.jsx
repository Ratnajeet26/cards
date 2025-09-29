import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar({ isOpen, toggleSidebar }) {
  const links = [
    { name: "Home", path: "/dashboard" },
    { name: "Cards", path: "/dashboard/cards" },
    { name: "Category", path: "/dashboard/category" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Orders", path: "/dashboard/orders" },
    
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-10 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0  min-h-screen  w-64 bg-gray-800 text-white z-30 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:flex md:flex-col`}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={toggleSidebar} // ✅ closes sidebar on mobile
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
