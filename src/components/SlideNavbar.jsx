import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

const SlideNavbar = ({ children }) => {
    // Default to closed on mobile, open on desktop
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
    const location = useLocation();

    // Handle window resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setIsOpen(false);
            else setIsOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // ... existing navigation logic ...

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-orange-50/30 overflow-hidden font-sans">

            {/* 1. SIDEBAR COMPONENT */}
            <aside
                className={`
          fixed top-0 left-0 z-40 h-screen bg-white shadow-xl transition-transform duration-300 ease-in-out
          flex flex-col border-r border-gray-100
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-full md:w-64
        `}
            >
                {/* Header / Logo Area */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Placeholder for the Gold Logo in your image */}
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                            UC
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-gray-800 leading-tight">UniConnect</h1>
                            <p className="text-[10px] text-gray-500">Complaint System Portal</p>
                        </div>
                    </div>

                    {/* Close button for mobile */}
                    <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 mt-8 space-y-2">
                    {/* Read role directly from localStorage */}
                    {(() => {
                        const role = localStorage.getItem('role');

                        if (role === 'staff') {
                            return (
                                <>
                                    <NavItem to="/staff" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/staff'} />
                                    <NavItem to="/staff/assigned-complaints" icon={<FileText size={20} />} label="Assigned Complaints" active={location.pathname === '/staff/assigned-complaints'} />
                                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" active={location.pathname === '/settings'} />
                                </>
                            );
                        } else {
                            // Default to Student (or check 'student')
                            return (
                                <>
                                    <NavItem to="/student" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/student'} />
                                    <NavItem to="/student-complaints" icon={<FileText size={20} />} label="My Complaints" active={location.pathname === '/student-complaints'} />
                                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" active={location.pathname === '/settings'} />
                                </>
                            );
                        }
                    })()}
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-gray-50 mb-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                        <LogOut size={20} className="group-hover:text-red-500 transition-colors" />
                        <span className="text-sm font-medium group-hover:text-red-500 transition-colors">Logout</span>
                    </button>
                </div>
            </aside>


            {/* 2. MAIN CONTENT AREA */}
            <main
                className={`
          flex-1 transition-all duration-300 ease-in-out p-8 overflow-y-auto
          ${isOpen ? 'md:ml-64' : ''}
        `}
            >
                {/* Toggle Button */}
                <div className="mb-8">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {children}
            </main>

        </div>
    );
};

/* --- Helper Components for cleaner code --- */

const NavItem = ({ icon, label, to, active = false }) => (
    <Link
        to={to}
        className={`
      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
      ${active
                ? 'text-gray-900 bg-gray-100 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
    `}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </Link>
);

const StatBlock = ({ count, label, sub }) => (
    <div>
        <h3 className="text-gray-500 text-sm mb-1">{label}</h3>
        <div className="text-4xl font-bold text-gray-800 mb-1">{count}</div>
        <p className="text-xs text-gray-400">{sub}</p>
        <div className="mt-2 text-orange-400">
            <FileText size={20} />
        </div>
    </div>
);

export default SlideNavbar;
