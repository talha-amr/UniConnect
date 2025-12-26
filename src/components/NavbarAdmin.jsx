import React, { useState } from 'react'; // Added useState
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Added icons

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      <header className="bg-white my-container relative z-40">
        <div className="mx-auto py-5 px-4 md:px-0 flex justify-between items-center">

          {/* Logo + Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              U
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">UniConnect</h1>
              <p className="text-[10px] text-gray-500 leading-tight">Complaint System Portal</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-6">
            <Link
              to="/adminDash"
              className={`font-medium text-xs ${isActive('/adminDash') ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Dashboard
            </Link>
            <Link
              to="/adminComplaint"
              className={`font-medium text-xs ${isActive('/adminComplaint') ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Complaints
            </Link>
            <Link
              to="/adminAccounts"
              className={`font-medium text-xs ${isActive('/adminAccounts') ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Accounts
            </Link>
          </nav>

          {/* Desktop Logout */}
          <button
            onClick={handleLogout}
            className="hidden md:block text-gray-500 text-sm cursor-pointer hover:text-red-500 transition-colors"
          >
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 animate-slide-in-right">

          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                U
              </div>
              <h1 className="font-bold text-xl text-gray-900">UniConnect</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
              <X size={32} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-6 text-xl font-medium text-gray-800">
            <Link
              to="/adminDash"
              onClick={() => setIsOpen(false)}
              className={isActive('/adminDash') ? 'text-yellow-500' : ''}
            >
              Dashboard
            </Link>
            <Link
              to="/adminComplaint"
              onClick={() => setIsOpen(false)}
              className={isActive('/adminComplaint') ? 'text-yellow-500' : ''}
            >
              Complaints
            </Link>
            <Link
              to="/adminAccounts"
              onClick={() => setIsOpen(false)}
              className={isActive('/adminAccounts') ? 'text-yellow-500' : ''}
            >
              Accounts
            </Link>

            <hr className="border-gray-100 my-2" />

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="text-left text-red-500 font-medium"
            >
              Logout
            </button>
          </nav>

        </div>
      )}
    </>
  );
};

export default NavbarAdmin;