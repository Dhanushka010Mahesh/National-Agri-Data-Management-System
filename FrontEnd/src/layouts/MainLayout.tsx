
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/PublicNavbar";
import { Link } from "lucide-react";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed w-full top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="bg-black py-4" style={{ height: '2cm' }}>
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div>
              <h3 className="text-lg font-bold text-white">
                Agri<span className="text-green-400">Connect</span>
              </h3>
              <p className="text-gray-400 text-xs">Sri Lankan Agriculture Platform</p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} AgriConnect Sri Lanka
            </p>
            <p className="text-gray-600 text-xs">All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
