import React from 'react';
import { User, Mail, Building, LogOut, Shield, FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const StudentSettings = ({ user, stats, onLogout }) => {
    // Fallback data if no user prop is passed (matches your User Context)
    const currentUser = user || {
        Name: "Loading...",
        Email: "...",
        Department: "...",
        Student_ID: "..."
    };

    // Stats passed from parent
    const currentStats = stats || {
        total: 0,
        solved: 0,
        pending: 0
    };

    return (
        <div className="min-h-screen bg-[#FFFDF7] p-8 font-sans text-gray-800">

            {/* 1. Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-medium text-gray-900">Settings & Profile</h1>
                <p className="text-sm text-gray-400 mt-1">Manage your account and view your activity stats.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">

                {/* 2. Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{currentUser.Name}</h2>
                            <p className="text-sm text-gray-500">
                                {currentUser.Student_ID ? `Student ID: ${currentUser.Student_ID}` :
                                    currentUser.Staff_ID ? `Staff ID: ${currentUser.Staff_ID}` :
                                        currentUser.Admin_ID ? `Admin ID: ${currentUser.Admin_ID}` : 'ID: N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Mail size={16} className="text-orange-400" />
                                {currentUser.Email}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</label>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Building size={16} className="text-orange-400" />
                                {currentUser.Department}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Stats Overview (As requested) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-full">
                            <FileText size={20} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{currentStats.total}</span>
                        <span className="text-xs text-gray-400 font-medium">Total Complaints</span>
                    </div>

                    {/* Solved */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2">
                        <div className="p-2 bg-green-50 text-green-500 rounded-full">
                            <CheckCircle size={20} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{currentStats.solved}</span>
                        <span className="text-xs text-gray-400 font-medium">Resolved Issues</span>
                    </div>

                    {/* Pending */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2">
                        <div className="p-2 bg-yellow-50 text-yellow-500 rounded-full">
                            <Clock size={20} />
                        </div>
                        <span className="text-3xl font-bold text-gray-900">{currentStats.pending}</span>
                        <span className="text-xs text-gray-400 font-medium">Pending Review</span>
                    </div>
                </div>

                {/* 4. Account Actions & Logout */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-50">
                        <h3 className="text-sm font-semibold text-gray-900">Security & Session</h3>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {/* Change Password */}
                        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Shield size={18} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
                                <span className="text-sm text-gray-700 font-medium">Change Password</span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300" />
                        </button>

                        {/* Logout Option */}
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                <span className="text-sm text-gray-700 font-medium group-hover:text-red-600">Log Out</span>
                            </div>
                            <div className="text-xs text-gray-300 group-hover:text-red-400">End Session</div>
                        </button>
                    </div>
                </div>

                {/* Footer / Version Info */}
                <div className="text-center pt-8">
                    <p className="text-xs text-gray-300">UniConnect Portal v1.0.0</p>
                </div>

            </div>
        </div>
    );
};

export default StudentSettings;