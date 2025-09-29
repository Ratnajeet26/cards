import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Signup() {
  const { state, dispatch } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim() || !password || !confirmPassword) {
      return alert("All fields are required");
    }
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    // check if username already exists
    if (state.users.some((u) => u.username === username.trim())) {
      return alert("Username already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      password,
    };

    dispatch({ type: "SIGNUP", payload: newUser });
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 p-4">
      <form onSubmit={handleSignup} className="max-w-md w-full bg-white p-6 rounded-lg shadow">
  <div className="flex items-center mb-4">
    <img src="/src/assets/digi.jpg" className="h-12 w-12 mr-2" alt="logo" />
    <h2 className="text-2xl">Sign up</h2>
  </div>

  <input
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="w-full border rounded px-3 py-2 mb-3"
    placeholder="Username"
  />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border rounded px-3 py-2 mb-3"
    placeholder="Password"
  />
  <input
    type="password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border rounded px-3 py-2 mb-3"
    placeholder="Confirm Password"
  />
  <button className="w-full bg-blue-600 text-white py-2 rounded">Sign up</button>
</form>

    </div>
  );
}
