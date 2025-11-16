import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] =useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // 1. RE-ADDED: This hook disables scrolling on the body
  useEffect(() => {
    // When the component mounts, hide the scrollbar
    document.body.style.overflow = "hidden";
    
    // When the component unmounts, show it again
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // The empty array means this runs only once on mount

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 200) {
        login(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    // 2. Layout changed for a non-scrolling, centered view:
    // - 'min-h-screen' -> 'h-screen' (to fill the exact screen height)
    // - 'items-start' -> 'items-center' (to vertically center the card)
    // - Removed 'pt-20 pb-20'
    <div className="
      h-screen 
      flex items-center justify-center 
      bg-gray-50 
      px-4
    ">

      {/* 3. The single login card */}
      <div className="bg-white shadow-xl p-8 md:p-10 rounded-lg w-full max-w-md animate-fadeIn">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Log in to your account
        </h2>

        {/* Subtitle with Register Link */}
        <p className="text-center text-gray-600 mb-6">
          Or{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            create an account
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition"
          >
            Log In
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;