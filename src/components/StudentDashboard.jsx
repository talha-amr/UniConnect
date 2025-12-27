import React, { useState } from 'react';
import { FolderPlus, FilePlus, FileText, Folder } from 'lucide-react';
import ComplaintModal from './ComplaintModal';
import api from '../api/axios';

const DashboardHome = ({ user, complaints = [] }) => {
    // 2. State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Calculate stats
    const totalComplaints = complaints.length;
    // Normalizing status checks
    const solvedCount = complaints.filter(c => c.Status === 'Resolved' || c.Status === 'Solved').length;
    const pendingCount = complaints.filter(c => c.Status === 'Pending').length;

    // 3. Handle data coming back from the modal
    const handleComplaintSubmit = async (formData) => {
        try {
            await api.post('/complaints', formData);
            setShowSuccessModal(true); // Show success modal instead of alert
            // Optionally trigger a refresh here if stats need to update immediately, 
            // causing a re-fetch or parent refresh. For now, alert is sufficient.
        } catch (error) {
            console.error("Failed to submit complaint", error);
            alert("Failed to submit complaint. Please try again.");
        }
    };

    return (
        <div className="bg-[#FFFDF7] min-h-screen p-4 md:p-8 font-sans text-gray-800">

            {/* Welcome Header */}
            <div className="mb-8 sm:mb-12 mt-4 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 tracking-wide uppercase">
                    Welcome {user ? user.Name : 'Student'}
                </h1>
            </div>

            <div className="max-w-5xl mx-auto">
                {/* "Lodge a Complaint" Action Card */}
                <button
                    onClick={() => setIsModalOpen(true)} // 4. Open modal on click
                    className="w-full bg-white border-2 border-orange-300 rounded-lg h-32 sm:h-48 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group mb-8"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

                    {/* Stat Item 3: Pending Complaints */}
                    <StatItem
                        label="Pending Complaints"
                        count={pendingCount}
                        description="Total number of complaints Lodged this semester."
                        icon={<FileText size={28} className="text-orange-400" />}
                    />

                </div>

                {/* Carousel Indicator Dot - Optional / can hide on desktop if not needed */}
                <div className="flex justify-center py-6 md:hidden">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
            </div>

            {/* 5. Render the Modal */}
            <ComplaintModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleComplaintSubmit}
            />

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[60]">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-xl text-center transform transition-all scale-100">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Complaint Submitted!</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Your complaint has been successfully lodged.
                        </p>
                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                window.location.reload(); // Refresh to update stats
                            }}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
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