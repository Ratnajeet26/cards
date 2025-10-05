import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoIosHome,
  IoIosCard,
  IoIosCube,
  IoIosListBox,
  IoIosBasket,
} from "react-icons/io";
import { MdCategory } from "react-icons/md";

export default function SideBar({ isOpen, toggleSidebar }) {
  const links = [
    { name: "Home", path: "/dashboard", icon: <IoIosHome size={20} /> },
    { name: "Cards", path: "/dashboard/cards", icon: <IoIosCard size={20} /> },
    {
      name: "Category",
      path: "/dashboard/category",
      icon: <MdCategory size={20} />,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: <IoIosCube size={20} />,
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
      icon: <IoIosBasket size={20} />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-screen w-64 bg-gray-800 text-white z-30 transform
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
                `flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 
                hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
