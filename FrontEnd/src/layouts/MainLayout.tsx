
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/PublicNavbar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed w-full top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AgriConnect</h3>
              <p className="text-gray-300 text-sm">
                Connecting farmers, agricultural officers, and resources across Sri Lanka to build a sustainable farming ecosystem.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="/blogs" className="text-gray-300 hover:text-white">Blogs</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">
                    Ministry of Agriculture<br />
                    Govijana Mandiraya<br />
                    Battaramulla, Sri Lanka
                  </span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-300">info@agriconnect.gov.lk</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-300">+94 11 2869553</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} AgriConnect Sri Lanka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
