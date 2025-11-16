import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const PurchaseModal = ({ sweet, token, onClose, onSuccess }) => {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  // Logic is unchanged
  const purchase = async () => {
    if (qty < 1) return toast.error("Quantity must be at least 1");
    setLoading(true);
    // ... (rest of the fetch logic)
    try {
      const res = await fetch(
        `${API_URL}/api/sweets/${sweet._id}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: qty }),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        toast.success("🎉 Purchase successful!");
        onSuccess();
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8 relative animate-scaleIn">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Purchase {sweet.name} 🍬
        </h2>

        <div className="text-center mb-6">
          {/* 1. Price text changed from pink to blue */}
          <p className="text-xl font-medium text-gray-700 mb-1">
            Price: <span className="text-blue-600">₹{sweet.price}</span>
          </p>
          <p className="text-sm text-gray-500">
            Available Stock: {sweet.quantity}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 mb-6">
          <label htmlFor="quantity-input" className="font-medium text-gray-700 sr-only">Quantity</label>
          <input
            id="quantity-input"
            type="number"
            value={qty}
            min={1}
            max={sweet.quantity}
            onChange={(e) => setQty(e.target.value)}
            // 2. Focus ring changed from pink to blue
            className="w-32 p-3 border border-gray-300 rounded-lg text-center bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <p className="text-center text-4xl font-extrabold text-gray-900 mb-8">
          ₹{(sweet.price * qty).toFixed(2)}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={purchase}
            disabled={loading}
            // 3. Button background changed from pink to blue
            className={`px-6 py-3 text-white rounded-lg shadow-lg font-semibold transition 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;