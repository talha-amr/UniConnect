import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <header className="bg-white my-container">
      <div className="mx-auto py-5 flex justify-between items-center">

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">UniConnect</h1>
            <p className="text-[10px] text-gray-500 leading-tight">Complaint System Portal</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6">
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

        {/* Logout */}
        <button 
          onClick={handleLogout} 
          className="text-gray-500 text-sm cursor-pointer hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavbarAdmin;