import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Swal from "sweetalert2";

export default function CardCategoryPage() {
  const { state, dispatch } = useContext(GlobalContext);

  const [selectedCardId, setSelectedCardId] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  console.log("Selected card id:", selectedCardId);

  const selectedCard = state.cards.find(
    (c) => String(c.id) === String(selectedCardId)
  );
  console.log("selected card:", selectedCard);

  // Add new product category
  const handleAddProductCategory = () => {
    if (!selectedCardId) return alert("Please select a card");
    if (!newProductCategory.trim()) return;

    const updatedCard = {
      ...selectedCard,
      productCategories: [
        ...(selectedCard.productCategories || []),
        newProductCategory.trim(),
      ],
    };

    dispatch({ type: "UPDATE_CARD", payload: updatedCard });
    setNewProductCategory("");
  };

  // Delete product category
  const handleDeleteProductCategory = (cat) => {
    const updatedCard = {
      ...selectedCard,
      productCategories: selectedCard.productCategories.filter(
        (c) => c !== cat
      ),
    };

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
     dispatch({ type: "UPDATE_CARD", payload: updatedCard });
          Swal.fire({
            title: "Deleted!",
            text: "Your category has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });



   
  };

  return (
    <div className="p-6 space-y-6">
      {/* Select Card */}
      <div>
        <h2 className="text-center font-semibold mb-2">Select Card</h2>
        <select
          value={selectedCardId}
          onChange={(e) => setSelectedCardId(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Select Card --</option>
          {state.cards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.details?.Name || c.category || c.group}
            </option>
          ))}
        </select>
      </div>

      {/* Add Product Categories */}
      {selectedCardId && (
        <div>
      <h2 className="text-2xl font-bold mb-4">Product Category</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New Product Category"
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAddProductCategory}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {/* Existing Product Categories */}
          <ul className="mt-4 space-y-1">
            {selectedCard.productCategories?.map((cat) => (
              <li
                key={cat}
                className="flex justify-between items-center border-b py-1"
              >
                <span>{cat}</span>
                <button
                  onClick={() => handleDeleteProductCategory(cat)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
