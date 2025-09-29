import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashBoardHome from "./pages/DashBoardHome";
import CardsPage from "./pages/CardsPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import PublicCardPage from "./pages/PublicCardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CardCategoryPage from "./pages/Category";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />


      {/* public card shareable page */}
      <Route path="/card/:cardId" element={<PublicCardPage />} />

      {/* dashboard protected */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashBoardHome />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="category" element={<CardCategoryPage/>}/>
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      <Route path="*" element={<div className="p-8">Page not found</div>} />
    </Routes>
  );
}
