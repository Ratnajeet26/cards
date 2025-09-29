import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center px-4 h-16">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center space-x-2">
        {/* Hamburger only visible on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden px-2 py-1 border rounded border-white"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold">Digital Cards</h1>
      </div>

      {/* Right: User info + Logout */}
      <div className="flex items-center space-x-4">
        <span>{state.user?.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
