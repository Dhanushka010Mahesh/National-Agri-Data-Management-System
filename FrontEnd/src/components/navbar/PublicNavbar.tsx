
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { Bell, Menu, X } from "lucide-react";
import UserMenu from "./FarmerMenu";
import NotificationPanel from "./NotificationPanel";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-10 w-10 mr-2"
                  src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=50&h=50&fit=crop"
                  alt="Agri-Connect Logo"
                />
                <span className="text-xl font-bold text-primary">AgriConnect</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/blogs" className="nav-link">Blogs</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated ? (
              <>
                {(user?.role === UserRole.FARMER) && (
                  <Button variant="ghost" onClick={toggleNotifications} className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
                  </Button>
                )}
                <UserMenu user={user} onLogout={handleLogout} />
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleLogin}>Login</Button>
                <Button onClick={handleRegister}>Register</Button>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light hover:text-primary-dark">
            Home
          </Link>
          <Link to="/blogs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light hover:text-primary-dark">
            Blogs
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light hover:text-primary-dark">
            About
          </Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light hover:text-primary-dark">
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.profilePicture || "https://images.unsplash.com/photo-1582562124811-c09040d0a901"}
                    alt={user?.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.nic}</div>
                </div>
                {(user?.role === UserRole.FARMER) && (
                  <Button variant="ghost" onClick={toggleNotifications} className="ml-auto relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
                  </Button>
                )}
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/farmer/profile" className="block px-4 py-2 text-base font-medium hover:bg-primary-light hover:text-primary-dark">
                  Profile
                </Link>
                {user?.role === UserRole.FARMER && (
                  <Link to="/farmer/lands" className="block px-4 py-2 text-base font-medium hover:bg-primary-light hover:text-primary-dark">
                    Land Details
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium hover:bg-primary-light hover:text-primary-dark"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1 px-2">
              <Button onClick={handleLogin} className="w-full mb-2">Login</Button>
              <Button onClick={handleRegister} variant="outline" className="w-full">Register</Button>
            </div>
          )}
        </div>
      </div>

      {/* Notification panel */}
      {showNotifications && <NotificationPanel onClose={toggleNotifications} />}
    </nav>
  );
};

export default Navbar;
