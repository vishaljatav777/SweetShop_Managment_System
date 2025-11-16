import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Logic for loading products remains the same
  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      }
    } catch (e) {
      console.log("Error loading products");
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    // 1. Changed background to a clean, simple white
    <div className="pt-28 pb-16 min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6">

        {/* Welcome Section */}
        {/* 2. Changed h1 to use a bold, vibrant purple (indigo-600) */}
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-3">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Here's a quick overview of your store.
        </p>

        {/* Stats Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 3. Cards are now vibrant:
               - Gradient background from the accent color
               - White text
               - Bubbly rounded-xl and strong shadow
          */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-100 mb-2">Total Products</h2>
            <p className="text-white text-5xl font-extrabold">{products.length}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-100 mb-2">Product Categories</h2>
            <p className="text-white text-5xl font-extrabold">{categories.length}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-100 mb-2">Total Stock</h2>
            <p className="text-white text-5xl font-extrabold">
              {products.reduce((acc, p) => acc + (p.quantity || 0), 0)}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                {/* 4. Primary button is a bold gradient with a hover-transform */}
                <Link
                  to="/sweets"
                  className="w-full sm:w-auto text-center bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 
                             text-white px-6 py-3 rounded-lg shadow-md font-semibold transition transform hover:scale-105"
                >
                  Browse All Products →
                </Link>
                {/* 5. Secondary button is a "soft" version of the accent color */}
                <Link
                  to="/orders"
                  className="w-full sm:w-auto text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-800 
                             px-6 py-3 rounded-lg font-semibold transition"
                >
                  View My Orders
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;