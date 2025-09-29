import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function DashBoardHome() {
  const { state } = useContext(GlobalContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {state.user?.username}!</h2>
      <p className="text-gray-600">
        Use the sidebar to manage your cards, products, and view orders.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4">Cards: {state.cards.length}</div>
        <div className="bg-white shadow rounded p-4">Products: {state.products.length}</div>
        <div className="bg-white shadow rounded p-4">Cart Items: {state.cart.length}</div>
        <div className="bg-white shadow rounded p-4">Orders: {state.orders.length}</div>
      </div>
    </div>
  );
}
