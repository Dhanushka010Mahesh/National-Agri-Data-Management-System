import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Leaf, LogOut, MapPin, Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole, useAuth } from "@/contexts/AuthContext";
import ProfileIMGFarmer from "@/assets/tree-planting.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AgriConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              Blogs
            </Link>
            {/* <Link 
              to="/resources" 
              className="text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              Resources
            </Link> */}
            <Link
              to="/about"
              className="text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {(user?.role === 'FARMER') ? (
              
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome back!</span>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors cursor-pointer focus:outline-none">
                    <Avatar className="w-8 h-8 border-2 border-green-500">
                      <AvatarImage src={ProfileIMGFarmer} alt={user.name} />
                      <AvatarFallback className="bg-green-500 text-white text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50"
                    align="end"
                  >
                    <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>
                        <Link to="/farmer/profile">Profile</Link>
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <MapPin className="w-4 h-4" />
                      <span>
                        <Link to="/farmer/lands">My Lands</Link>
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:text-green-400 hover:bg-green-500/10"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Link to="/register" >Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-green-400 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-4 border-t border-green-500/20">
            <Link
              to="/"
              className="block text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/farmers"
              className="block text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Farmers
            </Link>
            {/* <Link 
              to="/resources" 
              className="block text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link> */}
            <Link
              to="/about"
              className="block text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-white/80 hover:text-green-400 transition-colors duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated ? (
              <div className="pt-4 space-y-3 border-t border-green-500/20">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-green-500/20">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
