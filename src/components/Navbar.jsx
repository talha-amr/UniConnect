import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ theme = "blue" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Text color logic
  const textColor = theme === "login" ? "text-black" : theme === "white" ? "text-black" : "text-white";
  const hoverColor = theme === "login" ? "hover:text-gray-700" : theme === "white" ? "hover:text-gray-700" : "hover:text-gray-300";

  return (
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
                onClick={() => setIsOpen(!isOpen)}
                className={`${textColor} focus:outline-none`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && theme !== "login" && (
        <div className={`${theme === "white" ? "bg-white" : "bg-black/70 backdrop-blur-md"} px-2 pt-2 pb-3 space-y-1`}>
          <Link to="/" className={`block px-3 py-2 rounded ${textColor} ${hoverColor}`}>Home</Link>
          <Link to="/about" className={`block px-3 py-2 rounded ${textColor} ${hoverColor}`}>About</Link>
          <Link to="/contact" className={`block px-3 py-2 rounded ${textColor} ${hoverColor}`}>Contact</Link>
          <Link to="/login" className={`block px-3 py-2 rounded ${textColor} ${hoverColor}`}>Login</Link>
          <Link
            to="/register"
            className={`block px-3 py-2 rounded ${theme === "white" ? "bg-black text-white hover:bg-gray-800" : "bg-white text-gray-800 hover:bg-gray-200"}`}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
