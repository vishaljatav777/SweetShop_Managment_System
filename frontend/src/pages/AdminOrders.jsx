import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.status === 200) {
        // --- Mocking Data for New UI ---
        // In a real app, your API would return this
        const enhancedOrders = data.map((order) => ({
          ...order,
          // Mock a user object if not present
          user: order.user || { email: `${order.userId.slice(0, 8)}...` },
          // Mock a status
          status: order.status || (Math.random() > 0.3 ? 'Processing' : 'Shipped'),
          // Rename for consistency
          productName: order.sweetName || "Product",
        }));
        setOrders(enhancedOrders);
        // --- End of Mocking ---

      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1. NEW: Mock function to handle status updates
  const handleUpdateStatus = async (orderId, newStatus) => {
    // In a real app, you would make a PUT/PATCH request here
    // await fetch(`${API_URL}/api/orders/${orderId}`, { ... });
    toast.success(`Order ${orderId.slice(-6)} marked as ${newStatus}`);
    
    // Optimistically update UI
    setOrders(orders.map(o => 
      o._id === orderId ? { ...o, status: newStatus } : o
    ));
    // Or, you could just call loadOrders() again
  };

  return (
    // 2. Standardized page layout
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 3. Standardized header, blue theme */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Manage Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          // 4. Standardized table container from AdminDashboard
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                
                {/* 5. Standardized table header */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                {/* 6. Standardized table body */}
                <tbody className="divide-y divide-gray-200">
                  {orders.map((o) => (
                    <tr key={o._id} className="hover:bg-gray-50">
                      
                      {/* 7. Improved Customer Column */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{o.user?.email || 'N/A'}</span>
                      </td>
                      
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-gray-700">{o.productName} (x{o.quantity})</span>
                      </td>
                      
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">₹{o.total}</span>
                      </td>
                      
                      {/* 8. NEW: Status Badge */}
                      <td className="p-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          o.status === 'Shipped' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      
                      <td className="p-4 whitespace-nowrap text-gray-600">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>

                      {/* 9. NEW: Actions Column */}
                      <td className="p-4 whitespace-nowrap">
                        {o.status === 'Processing' && (
                          <button
                            onClick={() => handleUpdateStatus(o._id, 'Shipped')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
                          >
                            Mark as Shipped
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;