import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Login() {
  const { state, dispatch } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password) return alert("Enter username & password");

    const user = state.users.find(
      (u) => u.username === username.trim() && u.password === password
    );
    console.log("user :",user);
    

    if (!user) {
      return alert("Invalid credentials");
    }

    dispatch({ type: "LOGIN", payload: user });
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl mb-4">Login</h2>
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
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
