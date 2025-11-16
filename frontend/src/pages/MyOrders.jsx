import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      
      const enhancedOrders = data.map((order) => ({
        ...order,
        // --- FIX: Changed from Math.random() to a consistent default ---
        status: order.status || 'Shipped', // All orders will default to "Shipped"
        productName: order.sweetName || "Product",
      }));
      
      setOrders(enhancedOrders.reverse());
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper for status badge styling
  const getStatusColor = (status) => {
    if (status === 'Shipped') return 'text-green-600 bg-green-50 border-green-200';
    // Kept this in case your data one day has a "Processing" status
    return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
            <p className="text-gray-500 mt-1">Track, return, or buy things again.</p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">No orders found</h2>
            <p className="text-gray-500 mt-2 mb-6">Looks like you haven't bought anything yet.</p>
            <a href="/products" className="text-blue-600 font-medium hover:underline">
                Start Shopping &rarr;
            </a>
          </div>
        ) : (
          
          // STACKED LIST LAYOUT
          <div className="space-y-6">
            {orders.map((order) => (
                <div 
                    key={order._id} 
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                >
                    {/* Card Header: Date & Order ID */}
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 rounded-t-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-600">
                        <div className="flex gap-6">
                            <div>
                                <span className="block text-xs uppercase font-bold text-gray-400">Date Placed</span>
                                <span className="font-medium text-gray-900">
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase font-bold text-gray-400">Total Amount</span>
                                <span className="font-medium text-gray-900">₹{order.total}</span>
                            </div>
                        </div>
                        <div className="font-mono text-xs text-gray-400">
                            ORDER # {order._id.slice(-8).toUpperCase()}
                        </div>
                    </div>

                    {/* Card Body: Product Details */}
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        
                        {/* Left: Product Info */}
                        <div className="flex-grow text-center sm:text-left">
                            <h3 className="text-xl font-bold text-blue-600 mb-1">
                                {order.productName}
                            </h3>
                            <p className="text-gray-500">
                                Quantity: <span className="font-medium text-gray-900">{order.quantity}</span>
                            </p>
                        </div>

                        {/* Right: Status Badge */}
                        <div className={`px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                            {order.status}
                        </div>

                    </div>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
