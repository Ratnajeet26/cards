import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FiEdit2, FiTrash2, FiShare2 } from "react-icons/fi";
import Swal from "sweetalert2";

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
      return Swal.fire({
              title: "Oops..",
              text: "Enter product name, select card and category",
              icon: "error",
              timer:1500
            });

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
      Swal.fire({
              title: "Success",
              text: "Product Updated Successfully",
              icon: "success",
              timer:1500
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
       Swal.fire({
              title: "Success",
              text: "Product Addedd Successfully",
              icon: "success",
              timer:1500
            });
      
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

Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // dispatch your action or call API
dispatch({ type: "DELETE_PRODUCT", payload: product.id });
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  });

    
    // if (window.confirm(`Are you sure you want to delete "₹{product.name}"?`)) {
    //   dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    // }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-gray-800 font-semibold">Price: ₹{p.price}</p>
              </div>

              <div className="flex justify-end  space-x-5">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3  text-yellow-500 hover:text-yellow-600 cursor-pointer"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  className="px-3 py-1 text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
