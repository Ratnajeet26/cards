import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

export default function PublicCardPage() {
  const { cardId } = useParams();
  const { state,dispatch } = useContext(GlobalContext);

  const card = state.cards.find((c) => String(c.id) === String(cardId));
  if (!card) return <p className="p-4">Card not found</p>;

  // Filter products by card
  const allProducts = state.products.filter(
    (p) => String(p.cardId) === String(card.id)
  );
  

  // Categories from products
const categories = card.productCategories || [];



  // Selected category to filter products
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cart state, persisted in localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [cartVisible, setCartVisible] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      alert("Item already in cart!");
      return;
    }
    setCart([...cart, { ...product, qty: 1 }]);
    setCartVisible(true);
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  // Increment/Decrement qty
  const updateQty = (id, delta) => {
    setCart(
      cart.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
      )
    );
  };

  // Handle checkout input change
  const handleCheckoutChange = (field, value) => {
    setCheckoutInfo({ ...checkoutInfo, [field]: value });
  };

  // Handle checkout
  // const handleCheckout = () => {
  //   const { name, email, mobile, address, pincode } = checkoutInfo;
  //   if (!name || !email || !mobile || !address || !pincode) {
  //     return alert("Please fill all details before checkout!");
  //   }
  //   alert("Order placed successfully!");
  //   setCart([]);
  //   setCheckoutInfo({
  //     name: "",
  //     email: "",
  //     mobile: "",
  //     address: "",
  //     pincode: "",
  //   });
  //   setCartVisible(false);
  // };
  // Handle checkout
const handleCheckout = () => {
  const { name, email, mobile, address, pincode } = checkoutInfo;
  if (!name || !email || !mobile || !address || !pincode) {
    return alert("Please fill all details before checkout!");
  }

  // Prepare order items
  const items = cart.map((ci) => ({
    ...ci,
  }));

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Dispatch order to global state
  dispatch({
    type: "CHECKOUT",
    payload: {
      id: Date.now().toString(),
      customer: { name, email, mobile, address, pincode },
      items,
      total,
      cardId,
       date: new Date().toISOString(),

    },
  });
  localStorage.removeItem("cart");

  alert("Order placed successfully!");

  // Clear local states
  setCart([]);
  setCheckoutInfo({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });
  setCartVisible(false);
};


  // Filter products based on selected category
  const displayedProducts = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  // Cart summary
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 font-bold text-lg flex justify-between items-center">
        <span>{card.details?.Name || card.title || card.category}</span>

        {/* Cart Icon */}
        <button
          onClick={() => setCartVisible(true)}
          className="relative"
          title="View Cart"
        >
          <FiShoppingCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {/* Carousel - static */}
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-600 mb-6">
        Carousel Placeholder
      </div>

      {/* Product Categories */}
      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded border ${
            selectedCategory === null
              ? "border-blue-500 text-blue-500"
              : "border-gray-300 text-gray-400"
          }`}
        >
          All
        </button>
        {categories?.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded border ${
              selectedCategory === cat
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {displayedProducts.map((p) => (
          <div key={p.id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-600">Category: {p.category}</p>
              <p className="text-gray-800 font-semibold">Price: ${p.price}</p>
            </div>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Side Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform z-50 ${
          cartVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Cart</h2>
          <button
            onClick={() => setCartVisible(false)}
            className="text-gray-700 hover:text-gray-900 font-bold"
          >
            X
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">Price: ${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 size={20} className="text-red-500 hover:text-red-700"/>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <p className="font-semibold">
              Total Items: {totalItems} | Total Price: ${totalPrice}
            </p>
            <input
              type="text"
              placeholder="Name"
              value={checkoutInfo.name}
              onChange={(e) => handleCheckoutChange("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={checkoutInfo.email}
              onChange={(e) => handleCheckoutChange("email", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Mobile"
              value={checkoutInfo.mobile}
              onChange={(e) => handleCheckoutChange("mobile", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={checkoutInfo.address}
              onChange={(e) => handleCheckoutChange("address", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={checkoutInfo.pincode}
              onChange={(e) => handleCheckoutChange("pincode", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleCheckout}
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
