import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function OrdersPage() {
  const { state } = useContext(GlobalContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {state.orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {state.orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl shadow p-5"
            >
              {/* Order Info */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold text-gray-800">
                  Order ID: <span className="text-blue-600">{order.id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2">Customer Details</h4>
                <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                <p><span className="font-medium">Mobile:</span> {order.customer.mobile}</p>
                <p><span className="font-medium">Address:</span> {order.customer.address}</p>
                <p><span className="font-medium">Pincode:</span> {order.customer.pincode}</p>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2">Items</h4>
                <ul className="list-disc list-inside space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-gray-700">
                      {item.name} x {item.qty}{" "}
                      <span className="text-gray-500">(${item.price})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-lg font-bold">
                  Total: <span className="text-green-600">${order.total}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
