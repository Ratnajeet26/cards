import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DashboardLayout() {
  // state to control sidebar
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header gets toggle function */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar gets isOpen + toggle */}
        <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 bg-gray-50 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
