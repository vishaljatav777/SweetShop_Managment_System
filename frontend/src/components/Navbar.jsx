// 1. Imports are the same
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. We need a clean, professional link style for the white bg
  const getNavLinkClass = ({ isActive }) =>
    isActive
      // Active link is bold and uses the brand color
      ? "font-semibold text-pink-600"
      // Inactive links are subtle gray
      : "font-medium text-gray-500 hover:text-gray-900 transition-colors";

  return (
    // 3. The main nav bar is now a flex container.
    // It's fixed, with a shadow. No single bg color here!
    <nav className="fixed top-0 left-0 w-full z-50 flex shadow-md">
      {/* 4. This is the "Brand Block" */}
      <div className="flex items-center px-6 py-4 bg-gray-800">
        <Link to="/" className="text-2xl font-bold text-white">
          Mithai_Dukan
        </Link>
      </div>

      {/* 5. This is the "Navigation Block" */}
      {/* It grows to fill all remaining space */}
      <div className="flex-grow bg-white flex items-center justify-between px-6">
        
        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-base">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/sweets" className={getNavLinkClass}>
            Sweets
          </NavLink>
          {token && user?.role === "user" && (
            <NavLink to="/orders" className={getNavLinkClass}>
              My Orders
            </NavLink>
          )}
          {token && user?.role === "admin" && (
            <NavLink to="/admin-orders" className={getNavLinkClass}>
              Orders
            </NavLink>
          )}
        </div>

        {/* Right Side Buttons (Desktop) */}
        <div className="hidden md:flex gap-4">
          {!token && (
            <Link
              to="/login"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Login
            </Link>
          )}
          {token && (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-400 transition"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* 6. Hamburger Menu Button (Mobile) */}
        {/* This now lives in the white section */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="h-6 w-6 text-gray-800" /* ...close icon... */ >
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-800" /* ...bars icon... */ >
                 <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* 7. Mobile Menu (Dropdown) */}
      {/* It now appears *below* the main nav bar */}
      {/* It needs a white bg and a shadow to stand out */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
          <div className="flex flex-col space-y-4 p-4">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/sweets" className={getNavLinkClass}>
              Sweets
            </NavLink>
            {token && user?.role === "user" && (
              <NavLink to="/orders" className={getNavLinkClass}>
                My Orders
              </NavLink>
            )}
            {token && user?.role === "admin" && (
              <NavLink to="/admin-orders" className={getNavLinkClass}>
                Orders
              </NavLink>
            )}

            {/* Mobile Auth Buttons */}
            <div className="border-t border-gray-200 pt-4 flex flex-col space-y-2">
              {!token && (
                <Link to="/login" className="px-4 py-2 bg-pink-600 text-white rounded-lg text-center">
                  Login
                </Link>
              )}
              {token && (
                <>
                  {user?.role === "admin" && (
                    <Link to="/admin" className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg text-center">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={logout} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;