import React, { useState } from 'react';
import { FolderPlus, FilePlus, FileText, Folder } from 'lucide-react';
import ComplaintModal from './ComplaintModal';
import api from '../api/axios';

const DashboardHome = ({ user, complaints = [] }) => {
    // 2. State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate stats
    const totalComplaints = complaints.length;
    // Normalizing status checks
    const solvedCount = complaints.filter(c => c.Status === 'Resolved' || c.Status === 'Solved').length;
    const pendingCount = complaints.filter(c => c.Status === 'Pending').length;

    // 3. Handle data coming back from the modal
    const handleComplaintSubmit = async (formData) => {
        try {
            await api.post('/complaints', formData);
            alert("Complaint Submitted Successfully!");
            // Optionally trigger a refresh here if stats need to update immediately, 
            // causing a re-fetch or parent refresh. For now, alert is sufficient.
        } catch (error) {
            console.error("Failed to submit complaint", error);
            alert("Failed to submit complaint. Please try again.");
        }
    };

    return (
        <div className="bg-[#FFFDF7] min-h-screen p-8 font-sans text-gray-800">

            {/* Welcome Header */}
            <div className="mb-12 mt-4 text-center">
                <h1 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-wide uppercase">
                    Welcome {user ? user.Name : 'Student'}
                </h1>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">

                {/* "Lodge a Complaint" Action Card */}
                <button
                    onClick={() => setIsModalOpen(true)} // 4. Open modal on click
                    className="w-full bg-white border-2 border-orange-300 rounded-lg h-48 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group"
                >
                    <span className="text-orange-400 text-lg font-medium mb-3 group-hover:text-orange-500 transition-colors">
                        Lodge a Complaint
                    </span>
                    <FolderPlus
                        size={32}
                        className="text-orange-400 group-hover:scale-110 transition-transform duration-200"
                        strokeWidth={1.5}
                    />
                </button>

                {/* Stats Section */}
                <div className="space-y-6">

                    {/* Stat Item 1: Complaints Solved */}
                    <StatItem
                        label="Complaints Solved"
                        count={solvedCount}
                        description="Total Number of Complaints Solved this Semester."
                        icon={<Folder size={28} className="text-orange-400 fill-orange-50" />}
                    />

                    {/* Stat Item 2: Total Complaints */}
                    <StatItem
                        label="Total Complaints"
                        count={totalComplaints}
                        description="Total number of complaints Lodged this semester."
                        icon={<FilePlus size={28} className="text-orange-400" />}
                    />

                    {/* Carousel Indicator Dot */}
                    <div className="flex justify-center py-2">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>

                    {/* Stat Item 3: Pending Complaints */}
                    <StatItem
                        label="Pending Complaints"
                        count={pendingCount}
                        description="Total number of complaints Lodged this semester."
                        icon={<FileText size={28} className="text-orange-400" />}
                    />

                </div>
            </div>

            {/* 5. Render the Modal */}
            <ComplaintModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleComplaintSubmit}
            />
        </div>
    );
};

/* --- Reusable Stat Component --- */
const StatItem = ({ label, count, description, icon }) => {
    return (
        <div className="w-full bg-white rounded-lg p-8 border border-gray-100 shadow-sm flex flex-col items-start space-y-4">
            <h3 className="text-gray-400 text-lg font-normal">{label}</h3>

            <div className="text-6xl font-bold text-gray-900 leading-none tracking-tight">
                {count}
            </div>

            <p className="text-xs text-gray-400 max-w-xs">
                {description}
            </p>

            <div className="pt-2">
                {icon}
            </div>
        </div>
    );
};

export default DashboardHome;