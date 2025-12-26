import React from 'react';
import { Folder, FileText, FilePlus, Loader } from 'lucide-react';

const StaffDashboardComp = ({ user, complaints = [] }) => {

    // Calculate stats based on the complaints assigned
    // Assuming status strings: 'Resolved', 'Pending', 'In Progress'
    const solvedCount = complaints.filter(c => c.Status === 'Resolved' || c.Status === 'Solved').length;
    const assignedCount = complaints.length; // Total assigned
    const pendingCount = complaints.filter(c => c.Status === 'Pending').length;
    const inProgressCount = complaints.filter(c => c.Status === 'In Progress').length;

    return (
        <div className="bg-[#FFFDF7] min-h-screen p-8 font-sans text-gray-800">

            {/* 1. Header: WELCOME NAME - DEPARTMENT */}
            <div className="mb-10 mt-4 text-center">
                <h1 className="text-2xl md:text-3xl font-normal text-gray-900 tracking-wide uppercase">
                    Welcome {user ? user.Name : 'Staff'} - {user ? user.Department : 'Department'}
                </h1>
            </div>

            {/* 2. Main Content: Single Large White Box */}
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-10 min-h-[600px]">

                <div className="space-y-12">

                    {/* Stat 1: Complaints Solved */}
                    <StatItem
                        label="Complaints Solved"
                        count={solvedCount}
                        description="Total Number of Complaints Solved this Semester."
                        icon={<Folder size={28} className="text-orange-400 fill-orange-50" />}
                    />

                    {/* Stat 2: Assigned Complaints */}
                    <StatItem
                        label="Assigned Complaints"
                        count={assignedCount}
                        description="Total Number of Complaints Assigned this Semester."
                        icon={<Folder size={28} className="text-orange-400" />}
                    />

                    {/* Stat 3: Pending Complaints */}
                    <StatItem
                        label="Pending Complaints"
                        count={pendingCount}
                        description="Total Number of Complaints Assigned this Semester."
                        icon={<FileText size={28} className="text-orange-400" />}
                    />

                    {/* Stat 4: In Progress Complaints */}
                    <StatItem
                        label="In Progress Complaints"
                        count={inProgressCount}
                        // Description was missing in the screenshot for the last item, so I omitted it or kept it minimal
                        icon={<FilePlus size={28} className="text-orange-400" />}
                    />

                </div>
            </div>
        </div>
    );
};

/* --- Reusable Stat Component (Clean List Style) --- */
const StatItem = ({ label, count, description, icon }) => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <h3 className="text-gray-400 text-lg font-normal">{label}</h3>

            <div className="text-5xl md:text-6xl font-bold text-gray-900 leading-none tracking-tight">
                {count}
            </div>

            {description && (
                <p className="text-xs text-gray-400 max-w-xs pb-1">
                    {description}
                </p>
            )}

            <div className="pt-1">
                {icon}
            </div>
        </div>
    );
};

export default StaffDashboardComp;