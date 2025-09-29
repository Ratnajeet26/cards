import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FiEdit2, FiTrash2, FiShare2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const cardData = {
  // General: {
  //   categories: ["Cat A", "Cat B"],
  //   subcategories: {
  //     "Cat A": ["Sub A1", "Sub A2"],
  //     "Cat B": ["Sub B1", "Sub B2"],
  //   },
  //   fields: ["Name", "Email", "Phone"],

  // },
  Organisation: {
    categories: [
      "Hospitality & Food Services",
      "Education & Training",
      "Health & Wellness",
    ],
    subcategories: {
      "Hospitality & Food Services": [
        "Restaurants",
        "Catering Services",
        "Food Trucks",
      ],
      "Education & Training": ["Schools", "Colleges"],
      "Health & Wellness": ["Fitness", "Spa & Wellness"],
    },
    fields: {
      Restaurants: ["Name", "Address", "Registration No"],
      "Catering Services": ["Name", "Address", "License No"],
      "Food Trucks": ["Name", "Vehicle No", "Owner Name"],
      Schools: ["School Name", "Address", "Principal Name"],
      Colleges: ["College Name", "Address", "Principal Name"],
      Fitness: ["Gym Name", "Address", "Owner Name"],
      "Spa & Wellness": ["Spa Name", "Address", "Owner Name"],
    },
  },
  Event: {
    categories: ["Wedding", "Birthday"],
    subcategories: {
      Wedding: ["Venue", "Catering"],
      Birthday: ["Party Supplies", "Decor"],
    },
    fields:{
      Venue:["Event Name", "Date", "Location"],
      Catering:["Event Name", "Date", "Location"],
      "Party Supplies":["Event Name", "Date", "Location"],
      "Decor":["Event Name", "Date", "Location"]

    } ,
  },
};

export default function CardPage() {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();


  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [formValues, setFormValues] = useState({});

  const categories = selectedGroup ? cardData[selectedGroup].categories : [];
  const subcategories =
    selectedGroup && selectedCategory
      ? cardData[selectedGroup].subcategories[selectedCategory] || []
      : [];

  const getFields = () => {
    if (!selectedGroup) return [];
    if (selectedGroup === "Organisation" && selectedSubcategory) {
      return cardData.Organisation.fields[selectedSubcategory] || [];
    }
    if (selectedGroup === "Event" && selectedSubcategory) {
      return cardData.Event.fields[selectedSubcategory] || [];
    }
    if (cardData[selectedGroup].fields) return cardData[selectedGroup].fields;
    return [];
  };

  const fields = getFields();

  const handleInputChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleAddCard = () => {
    if (!selectedGroup) return alert("Please select a card group!");
    const newCard = {
      id: Date.now(),
      group: selectedGroup,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      details: formValues,
    };
    dispatch({ type: "ADD_CARD", payload: newCard });
    alert("Card added successfully!");
    setFormValues({});
  };

  return (
    <div className="p-6 space-y-6">
      {/* Card Group */}
      <div>
        <h2 className="text-center font-semibold mb-2">Select a Card Group</h2>
        <div className="flex gap-2 justify-center flex-wrap">
          {Object.keys(cardData).map((group) => (
            <button
              key={group}
              onClick={() => {
                setSelectedGroup(group);
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setFormValues({});
              }}
              className={`px-4 py-2 rounded border ${
                selectedGroup === group
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Card Category */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-center font-semibold mb-2">
            Select a Card Category
          </h2>
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubcategory(null);
                  setFormValues({});
                }}
                className={`px-4 py-2 rounded border ${
                  selectedCategory === cat
                    ? "border-purple-500 text-purple-500"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subcategory */}
      {subcategories.length > 0 && (
        <div>
          <h2 className="text-center font-semibold mb-2">
            Select a Card Subcategory
          </h2>
          <div className="flex gap-2 justify-center flex-wrap">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubcategory(sub);
                  setFormValues({});
                }}
                className={`px-4 py-2 rounded border ${
                  selectedSubcategory === sub
                    ? "border-green-500 text-green-500"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card Details Form */}
      {fields.length > 0 && (
        <div className="mt-4 border p-4 rounded shadow space-y-3">
          <h2 className="text-center font-semibold mb-2">Card Details</h2>
          {fields.map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              value={formValues[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}

          <button
            onClick={() => {
              if (!selectedGroup) return alert("Please select a card group!");

              if (editingCardId) {
                // Update existing card
                const updatedCard = {
                  id: editingCardId,
                  group: selectedGroup,
                  category: selectedCategory,
                  subcategory: selectedSubcategory,
                  details: formValues,
                  productCategories: [],
                };
                dispatch({ type: "UPDATE_CARD", payload: updatedCard });
                alert("Card updated successfully!");
                setEditingCardId(null); // reset edit state
              } else {
                // Add new card
                const newCard = {
                  id: Date.now(),
                  group: selectedGroup,
                  category: selectedCategory,
                  subcategory: selectedSubcategory,
                  details: formValues,
                  productCategories: [], // initialize empty array for products
                };
                dispatch({ type: "ADD_CARD", payload: newCard });
                alert("Card added successfully!");
              }

              setFormValues({});
            }}
            className="w-full py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingCardId ? "Update Card" : "Add Card"}
          </button>
        </div>
      )}

      {/* Display all Cards */}
      {state.cards.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-center font-semibold mb-2">Saved Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.cards.map((card) => (
              <div
                key={card.id}
                className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold">{card.group}</h3>
                  <p>Category: {card.category}</p>
                  {card.subcategory && <p>Subcategory: {card.subcategory}</p>}
                  <div className="mt-2 space-y-1">
                    {Object.entries(card.details).map(([k, v]) => (
                      <p key={k}>
                        <strong>{k}:</strong> {v}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                {

<div className="mt-4 flex justify-between items-center">
  {/* Edit Icon */}
  <button
    onClick={() => {
      setSelectedGroup(card.group);
      setSelectedCategory(card.category);
      setSelectedSubcategory(card.subcategory || null);
      setFormValues(card.details);
      setEditingCardId(card.id);
    }}
    className="text-yellow-500 hover:text-yellow-600"
    title="Edit Card"
  >
    <FiEdit2 size={20} />
  </button>

  {/* Delete Icon */}
  <button
    onClick={() => dispatch({ type: "DELETE_CARD", payload: card.id })}
    className="text-red-500 hover:text-red-600"
    title="Delete Card"
  >
    <FiTrash2 size={20} />
  </button>

  {/* Share Icon */}
 <button
  onClick={() => {
    navigate(`/card/${card.id}`);
  }}
  className="text-gray-700 hover:text-gray-900"
  title="Go to Card"
>
  <FiShare2 size={20} />
</button>
</div>

                
                /* <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedGroup(card.group);
                      setSelectedCategory(card.category);
                      setSelectedSubcategory(card.subcategory || null);
                      setFormValues(card.details);
                      setEditingCardId(card.id); // set editing id
                    }}
                    className="flex-1 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  }
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_CARD", payload: card.id })
                    }
                    className="flex-1 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
