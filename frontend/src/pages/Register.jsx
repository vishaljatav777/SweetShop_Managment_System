import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- MOCK DEPENDENCIES (Added to fix compilation errors) ---
const API_URL = "https://api.mitha-dukan.com"; // Placeholder URL

// Mock Auth Context Hook
const useAuth = () => {
  return {
    login: (token, user) => {
      console.log("Logged in with:", token, user);
    }
  };
};
// -----------------------------------------------------------

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  // 1. Disable scroll on register page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Simulating a fetch request for the demo
      console.log("Submitting to:", `${API_URL}/api/auth/register`, form);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSuccess = true; 
      if (mockSuccess) {
        login("mock-token", { name: form.name, email: form.email, role: form.role });
        alert("Registration Successful!");
        // navigate("/dashboard");
      } else {
        setError("Registration failed");
      }
    } catch {
      setError("Server error. Try again.");
    }
  };

  return (
    // 2. Layout changed to match Login page
    <div
      className="
        h-screen 
        flex items-center justify-center 
        bg-gray-50 
        px-4
      "
    >

      {/* 3. Card: Changed from glassmorphism to solid white */}
      <div className="bg-white shadow-xl p-8 md:p-10 rounded-lg w-full max-w-md animate-fadeIn">

        {/* 4. Header: Text and colors updated */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create an account
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}

        {/* 5. Form: Inputs and labels restyled */}
        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 6. Select menu restyled */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* 7. Button color changed to blue */}
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition mt-2"
          >
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;