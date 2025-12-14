import React, { useEffect, useState } from 'react';
import { Search, Plus, X, MoreHorizontal } from 'lucide-react';
import api from '../api/axios';
import ComplaintModal from './ComplaintModal'; // 1. Import the modal

const StudentComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch complaints on load
    const fetchComplaints = async () => {
        try {
            const res = await api.get('/complaints/my');
            setComplaints(res.data);
            setFilteredComplaints(res.data);
        } catch (error) {
            console.error('Failed to fetch complaints', error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // Filter logic
    useEffect(() => {
        const results = complaints.filter(complaint =>
            (complaint.Title && complaint.Title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (complaint.category && complaint.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (complaint.Status && complaint.Status.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredComplaints(results);
    }, [searchTerm, complaints]);

    const handleLodgeComplaint = async (formData) => {
        try {
            await api.post('/complaints', formData);
            alert("Complaint Submitted Successfully!");
            fetchComplaints();
        } catch (error) {
            console.error("Failed to submit complaint", error);
            alert("Failed to submit complaint. Please try again.");
        }
    };

    const totalComplaints = complaints.length;

    return (
        <div className="min-h-screen bg-[#FFFDF7] p-8 font-sans text-gray-800">

            {/* 1. Top Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium text-gray-900">My Complaints</h1>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:shadow-md transition-shadow text-sm font-medium"
                >
                    <div className="border border-black rounded-full p-0.5">
                        <Plus size={14} className="text-black" />
                    </div>
                    Lodge a complaint
                </button>
            </div>

            {/* 2. Stats and Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-4 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        Complaints ( {totalComplaints} )
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">
                        View list of Complaints Below
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search by Title, Status etc."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-orange-300"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            {/* 3. Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm min-h-[600px] flex flex-col">

                {/* Filter Section (Inside Card) - REMOVED DUMMY TAGS */}
                <div className="p-5 border-b border-gray-100 flex flex-wrap items-center gap-4 min-h-[60px]">
                    <span className="text-sm font-medium text-gray-700">All Complaints</span>
                    {/* You can add dynamic filter chips here later if needed */}
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 p-5 border-b border-gray-100 text-sm font-bold text-gray-900">
                    <div className="col-span-1">Complaint No.</div>
                    <div className="col-span-1">Date of Complaint</div>
                    <div className="col-span-1">Category</div>
                    <div className="col-span-1">Title</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>

                {/* Table Body */}
                <div className="flex-grow relative overflow-auto">
                    {filteredComplaints.length > 0 ? (
                        filteredComplaints.map((complaint) => (
                            <div key={complaint.Complaint_ID} className="grid grid-cols-6 gap-4 p-5 border-b border-gray-100 text-sm items-center hover:bg-gray-50 transition-colors">
                                <div className="col-span-1 text-gray-900 font-medium">#{complaint.Complaint_ID}</div>
                                <div className="col-span-1 text-gray-500">
                                    {complaint.Created_at ? new Date(complaint.Created_at).toLocaleDateString() : 'N/A'}
                                </div>
                                <div className="col-span-1 text-gray-500">{complaint.category || complaint.Category_ID}</div>
                                <div className="col-span-1 text-gray-900 truncate" title={complaint.Title}>{complaint.Title}</div>
                                <div className="col-span-1 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${complaint.Status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                        complaint.Status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {complaint.Status}
                                    </span>
                                </div>
                                <div className="col-span-1 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">No complaints found.</div>
                    )}
                </div>

                {/* Pagination Dot */}
                <div className="p-6 flex justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>

            </div>

            {/* 5. Render the Modal Component */}
            <ComplaintModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleLodgeComplaint}
            />
        </div>
    );
};

export default StudentComplaints;