import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductsPage() {
  const { state, dispatch } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [cardId, setCardId] = useState("");

  // Track editing
  const [editingProductId, setEditingProductId] = useState(null);

  const selectedCard = state.cards.find((c) => String(c.id) === String(cardId));

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setCardId("");
    setEditingProductId(null);
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!name || !cardId || !category)
      return alert("Enter product name, select card and category");

    if (editingProductId) {
      // Update existing product
      dispatch({
        type: "EDIT_PRODUCT",
        payload: {
          id: editingProductId,
          name,
          price: +price,
          category,
          cardId,
        },
      });
    } else {
      // Add new product
      const product = {
        id: Date.now().toString(),
        name,
        price: +price,
        category,
        cardId,
      };
      dispatch({ type: "ADD_PRODUCT", payload: product });
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setCardId(product.cardId);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <form
        onSubmit={handleAddOrUpdateProduct}
        className="bg-white shadow p-4 rounded mb-6 grid grid-cols-1 md:grid-cols-5 gap-2"
      >
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={cardId}
          onChange={(e) => {
            setCardId(e.target.value);
            setCategory(""); // reset category when card changes
          }}
        >
          <option value="">Select Card</option>
          {state.cards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.details?.Name || c.category || c.group}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!selectedCard}
        >
          <option value="">Select Category</option>
          {selectedCard?.productCategories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.products.map((p) => {
          const card = state.cards.find(
            (c) => String(c.id) === String(p.cardId)
          );
          return (
            <div
              key={p.id}
              className="bg-white shadow rounded p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-gray-600">
                  Card: {card?.details?.Name || card?.category || "-"}
                </p>
                <p className="text-gray-600">Category: {p.category}</p>
                <p className="text-gray-800 font-semibold">Price: ${p.price}</p>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
