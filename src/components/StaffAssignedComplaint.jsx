import React, { useState } from 'react';
import { Search, X, MoreHorizontal, Eye } from 'lucide-react';

import api from '../api/axios';

const StaffAssignedComplaint = ({ complaints, loading }) => {

    // Safety check just in case
    const safeComplaints = complaints || [];
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [newStatus, setNewStatus] = useState('Pending');

    const handleActionClick = (complaint) => {
        setSelectedComplaint(complaint);
        setNewStatus(complaint.Status);
    };

    const handleUpdateSubmit = async () => {
        if (!selectedComplaint) return;
        try {
            await api.patch(`/complaints/${selectedComplaint.Complaint_ID}/status`, { status: newStatus });
            alert("Status Updated Successfully");
            setSelectedComplaint(null);
            window.location.reload(); // Simple refresh to see changes
        } catch (error) {
            console.error("Update failed", error);
            alert("Update Failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF7] font-sans text-gray-800">

            {/* 1. Top White Header Strip */}
            <div className="bg-white py-5 border-b border-gray-100 ">
                <div className="max-w-7xl mx-auto px-8">
                    <h1 className="text-3xl font-medium text-gray-900">Assigned Complaints</h1>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto  pb-12 pt-8">

                {/* 2. Page Title & Search Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Complaints Assigned
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Manage complaints assigned to your department
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-96 bg-white rounded-lg border border-gray-200">
                        <input
                            type="text"
                            placeholder="Search Here"
                            className="w-full bg-transparent border-none pl-10 pr-4 py-2.5 text-sm focus:ring-0 text-gray-600 placeholder-gray-400"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                {/* 3. Main Table Card */}
                <div className="bg-white rounded-xl border border-gray-200 min-h-[600px] flex flex-col">

                    {/* Filter Section */}
                    <div className="px-8 py-6 border-b border-gray-200 flex flex-wrap items-center gap-3 bg-white rounded-t-xl">
                        <span className="text-sm font-medium text-gray-700">Filter Your Search</span>

                        {/* Tag: Date Range */}
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-xs text-gray-700 border border-gray-200">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Jan 12 - Mar 11
                            <button className="hover:text-red-500 ml-1 transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Table Header - Better distributed columns */}
                    <div className="flex items-center px-8 py-5 border-b border-gray-100 text-sm font-bold text-gray-900 bg-white">
                        <div className="flex-[1.5]">Complaint No.</div>
                        <div className="flex-[1.5]">Date</div>
                        <div className="flex-[2]">Student</div>
                        <div className="flex-[3]">Title</div>
                        <div className="flex-[1.5] text-center">Status</div>
                        <div className="flex-[1] text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex-grow relative overflow-auto bg-white">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading...</div>
                        ) : safeComplaints.length > 0 ? (
                            safeComplaints.map((complaint) => (
                                <div key={complaint.Complaint_ID} className="flex items-center px-8 py-5 border-b border-gray-50 text-sm hover:bg-gray-50 transition-colors">

                                    {/* ID */}
                                    <div className="flex-[1.5] font-medium text-gray-900">
                                        #{complaint.Complaint_ID}
                                    </div>

                                    {/* Date */}
                                    <div className="flex-[1.5] text-gray-500">
                                        {complaint.Created_at ? new Date(complaint.Created_at).toLocaleDateString() : 'N/A'}
                                    </div>

                                    {/* Student Name */}
                                    <div className="flex-[2] text-gray-700 font-medium truncate pr-4">
                                        {complaint.student ? complaint.student.Name : 'Unknown'}
                                    </div>

                                    {/* Title */}
                                    <div className="flex-[3] text-gray-500 truncate pr-4" title={complaint.Title}>
                                        {complaint.Title}
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex-[1.5] flex justify-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${complaint.Status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                            complaint.Status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {complaint.Status}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex-[1] flex justify-end">
                                        <button
                                            onClick={() => handleActionClick(complaint)}
                                            className="text-gray-400 hover:text-orange-500 transition-colors"
                                            title="Update Status"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-300 pb-20">
                                <p>No assigned complaints found.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Dot */}
                    <div className="p-6 flex justify-center bg-white rounded-b-xl">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>

                </div>

                {/* Status Update Modal */}
                {selectedComplaint && (
                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Update Status</h3>
                                <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mb-2">Complaint: <span className="font-medium text-gray-800">{selectedComplaint.Title}</span></p>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button onClick={() => setSelectedComplaint(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
                                <button onClick={handleUpdateSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffAssignedComplaint;