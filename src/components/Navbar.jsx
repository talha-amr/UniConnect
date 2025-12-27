import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

export default function Navbar({ theme = "blue" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Text color logic
  const textColor = theme === "login" ? "text-black" : theme === "white" ? "text-black" : "text-white";
  const hoverColor = theme === "login" ? "hover:text-gray-700" : theme === "white" ? "hover:text-gray-700" : "hover:text-gray-300";

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className={`font-bold text-xl ${textColor}`}>UniConnect</Link>
            </div>

            {theme !== "login" && (
              <div className="hidden md:flex space-x-8">
                <Link to="/" className={`${textColor} ${hoverColor}`}>Home</Link>
                <Link to="/about" className={`${textColor} ${hoverColor}`}>About</Link>
                <Link to="/contact" className={`${textColor} ${hoverColor}`}>Contact</Link>
              </div>
            )}

            {theme !== "login" && (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className={`${textColor} ${hoverColor}`}>Login</Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded ${theme === "white" ? "bg-black text-white hover:bg-gray-800" : "bg-white text-gray-800 hover:bg-gray-200"}`}
                >
                  Register
                </Link>
              </div>
            )}

            {theme !== "login" && (
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className={`${textColor} focus:outline-none`}
                >
                  <Menu size={28} />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 animate-slide-in-right">

          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl text-gray-900">UniConnect</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
              <X size={32} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-6 text-xl font-medium text-gray-800">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            <hr className="border-gray-100 my-2" />

            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-orange-500"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
