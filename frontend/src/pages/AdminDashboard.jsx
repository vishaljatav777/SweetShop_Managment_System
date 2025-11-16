import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const AdminDashboard = () => {
  const { user, token } = useAuth();

  // 1. Renamed "sweets" to "products" for a more general name
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });
  const [editing, setEditing] = useState(null);

  // Fetch products
  const loadProducts = async () => {
    try {
      // 2. Updated API endpoint (assuming it's generic)
      const res = await fetch(`${API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear form helper
  const clearForm = () => {
    setForm({ name: "", category: "", price: "", quantity: "" });
    setEditing(null);
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing
      ? `${API_URL}/api/products/${editing._id}`
      : `${API_URL}/api/products`;
    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          editing ? "Product updated!" : "Product added!"
        );
        clearForm();
        loadProducts();
      } else {
        toast.error("Failed to save product");
      }
    } catch {
      toast.error("Error occurred");
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        toast.success("Product deleted");
        loadProducts();
      }
    } catch {
      toast.error("Failed to delete product");
    }
  };

  // 3. Main layout changed to a 2-column split on desktop
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto md:flex md:gap-8">
        
        {/* 4. LEFT COLUMN (FORM) - Sticky on desktop */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="md:sticky md:top-28">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editing ? "✏️ Edit Product" : "➕ Add New Product"}
              </h2>
              
              {/* 5. Form layout changed to a single stack (flex-col) */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* 6. Inputs redesigned with labels and better styling */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="e.g., 'Premium Kaju Katli'"
                    value={form.name}
                    required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="e.g., 'Sweets'"
                    value={form.category}
                    required
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>
                
                {/* Price & Qty in a 2-col grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      placeholder="e.g., 800"
                      value={form.price}
                      required
                      min={0}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      placeholder="e.g., 20"
                      value={form.quantity}
                      required
                      min={0}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    />
                  </div>
                </div>

                {/* 7. Button colors standardized (Blue for primary action) */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  {editing ? "Update Product" : "Add Product"}
                </button>
                
                {/* 8. NEW "Cancel" button for better UX */}
                {editing && (
                  <button 
                    type="button" 
                    onClick={clearForm}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* 9. RIGHT COLUMN (HEADER + TABLE) */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name} 
          </h1>
          <p className="text-gray-600 mb-6">
            Manage all products available in your store.
          </p>

          {/* 10. List converted from cards to a responsive TABLE */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                {/* Table Head */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-600">{product.category}</td>
                      <td className="p-4 whitespace-nowrap text-gray-600">₹{product.price}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">{product.quantity}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {/* 11. Button styles are now "soft" buttons, which look cleaner in a table */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditing(product);
                              setForm(product);
                              // Optional: Scroll to form on mobile
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 12. Show a nice message if there are no products */}
            {products.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No products found. Add one using the form!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;