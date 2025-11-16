import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PurchaseModal from "../components/PurchaseModal";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const Sweets = () => {
  const { token } = useAuth();

  const [sweets, setSweets] = useState([]);
  const [selectedSweet, setSelectedSweet] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const sweetsPerPage = 9;

  // Filters
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Helper to handle API variations
  const normalizeToArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.sweets) return data.sweets;
    if (data && typeof data === "object") return [data];
    return [];
  };

  // FETCH ALL PRODUCTS
  const fetchSweets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setSweets([]);
        return;
      }

      const data = await res.json();
      setSweets(normalizeToArray(data));
      setCurrentPage(1);
    } catch {
      toast.error("Failed to load products");
      setSweets([]);
    }
  };

  // SEARCH LOGIC
  const handleSearch = async () => {
    try {
      const q = {};
      if (searchName.trim()) q.name = searchName.trim();
      if (searchCategory.trim()) q.category = searchCategory.trim().toLowerCase();
      if (minPrice !== "") q.minPrice = Number(minPrice);
      if (maxPrice !== "") q.maxPrice = Number(maxPrice);

      const query = new URLSearchParams(q).toString();

      const res = await fetch(
        `${API_URL}/api/sweets/search${query ? "?" + query : ""}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        toast.error("Search failed");
        return;
      }

      const data = await res.json();
      setSweets(normalizeToArray(data));
      setCurrentPage(1);
    } catch {
      toast.error("Search error");
    }
  };

  useEffect(() => {
    fetchSweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Pagination Logic
  const indexOfLastSweet = currentPage * sweetsPerPage;
  const indexOfFirstSweet = indexOfLastSweet - sweetsPerPage;
  const currentSweets = sweets.slice(indexOfFirstSweet, indexOfLastSweet);
  const totalPages = Math.ceil(sweets.length / sweetsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Collection</h1>
                <p className="text-gray-500 mt-1">Browse our premium handcrafted products.</p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
                Showing {currentSweets.length} of {sweets.length} results
            </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            
            <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Search</label>
                <input
                    type="text"
                    placeholder="Product name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
                <input
                    type="text"
                    placeholder="e.g., Mithai"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Price Range</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleSearch}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition shadow-sm"
                >
                    Filter
                </button>
                <button
                    onClick={() => {
                        setSearchName("");
                        setSearchCategory("");
                        setMinPrice("");
                        setMaxPrice("");
                        fetchSweets();
                    }}
                    className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition border border-gray-300"
                >
                    Reset
                </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {currentSweets.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button onClick={() => { setSearchName(""); fetchSweets(); }} className="mt-4 text-blue-600 hover:underline font-medium">Clear Filters</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentSweets.map((s) => (
                    // Product Card - No Image Section
                    <div key={s._id} className="bg-white rounded-lg shadow-lg border border-gray-100 flex flex-col transition hover:shadow-xl">
                        
                        <div className="p-6 flex-grow flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{s.name}</h3>
                                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                                    {s.category}
                                </span>
                            </div>
                            
                            {/* Price */}
                            <p className="text-3xl font-extrabold text-gray-900 mb-6">₹{s.price}</p>
                            
                            <div className="mt-auto">
                                {/* Stock Status */}
                                <div className="flex justify-between items-center mb-4 text-sm">
                                    <span className={s.quantity > 0 ? "text-green-600 font-medium flex items-center gap-1" : "text-red-600 font-medium flex items-center gap-1"}>
                                        {s.quantity > 0 ? (
                                          <>
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            In Stock ({s.quantity})
                                          </>
                                        ) : (
                                          <>
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            Out of Stock
                                          </>
                                        )}
                                    </span>
                                </div>

                                {/* Buy Button */}
                                <button
                                    disabled={s.quantity === 0}
                                    onClick={() => setSelectedSweet(s)}
                                    className={`w-full py-3 rounded-lg font-bold transition ${
                                        s.quantity === 0
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                                    }`}
                                >
                                    {s.quantity === 0 ? "Unavailable" : "Buy Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Pagination */}
        {sweets.length > sweetsPerPage && (
            <div className="flex justify-center mt-12 gap-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-900 font-medium flex items-center bg-white border border-gray-300 rounded-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </div>
        )}

        {/* Purchase Modal */}
        {selectedSweet && (
            <PurchaseModal
                sweet={selectedSweet}
                token={token}
                onClose={() => setSelectedSweet(null)}
                onSuccess={() => {
                    fetchSweets();
                    setSelectedSweet(null);
                }}
            />
        )}

      </div>
    </div>
  );
};

export default Sweets;