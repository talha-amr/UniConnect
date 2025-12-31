import React, { useState } from 'react';
import { Search, X, MoreHorizontal, Eye } from 'lucide-react';

import api from '../api/axios';

const StaffAssignedComplaint = ({ complaints, loading, onRefresh }) => {

    // Safety check just in case
    const safeComplaints = complaints || [];
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [newStatus, setNewStatus] = useState('Pending');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleActionClick = (complaint) => {
        setSelectedComplaint(complaint);
        setNewStatus(complaint.Status);
    };

    const handleUpdateSubmit = async () => {
        if (!selectedComplaint) return;
        setIsSubmitting(true);
        try {
            await api.patch(`/complaints/${selectedComplaint.Complaint_ID}/status`, { status: newStatus });
            setSelectedComplaint(null);
            setShowSuccessModal(true); // Show success modal

            // Refresh Data Immediately
            if (onRefresh) onRefresh();

        } catch (error) {
            console.error("Update failed", error);
            alert("Update Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF7] font-sans text-gray-800">

            {/* 1. Top White Header Strip */}
            <div className="bg-white py-5 border-b border-gray-100 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">Assigned Complaints</h1>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto pb-12 pt-8 px-4 sm:px-8">

                {/* 2. Page Title & Search Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
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

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <div className="min-w-[900px]">
                            {/* Table Header */}
                            <div className="flex items-center px-8 py-5 border-b border-gray-100 text-sm font-bold text-gray-900 bg-white">
                                <div className="flex-[1.5]">Complaint No.</div>
                                <div className="flex-[1.5]">Date</div>
                                <div className="flex-[2]">Student</div>
                                <div className="flex-[3]">Title</div>
                                <div className="flex-[1.5] text-center">Status</div>
                                <div className="flex-[1] text-right">Action</div>
                            </div>

                            {/* Table Body */}
                            <div className="flex-grow relative bg-white">
                                {loading ? (
                                    <div className="p-8 text-center text-gray-500">Loading...</div>
                                ) : safeComplaints.length > 0 ? (
                                    safeComplaints
                                        .sort((a, b) => {
                                            if (a.Status === 'Resolved' && b.Status !== 'Resolved') return 1;
                                            if (a.Status !== 'Resolved' && b.Status === 'Resolved') return -1;
                                            return new Date(b.Created_at) - new Date(a.Created_at);
                                        })
                                        .map((complaint, index) => (
                                            <div key={complaint.Complaint_ID} className="flex items-center px-8 py-5 border-b border-gray-50 text-sm hover:bg-gray-50 transition-colors">
                                                <div className="flex-[1.5] font-medium text-gray-900">
                                                    #{index + 1}
                                                </div>
                                                <div className="flex-[1.5] text-gray-500">
                                                    {complaint.Created_at ? new Date(complaint.Created_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                                <div className="flex-[2] text-gray-700 font-medium truncate pr-4">
                                                    {complaint.Is_anonymous ? <span className="text-gray-500 italic">Anonymous</span> : (complaint.student ? complaint.student.Name : 'Unknown')}
                                                </div>
                                                <div
                                                    className="flex-[3] text-gray-500 truncate pr-4 cursor-pointer hover:text-blue-600"
                                                    title={complaint.Title}
                                                    onClick={() => handleActionClick(complaint)}
                                                >
                                                    {complaint.Title}
                                                </div>
                                                <div className="flex-[1.5] flex justify-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${complaint.Status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                        complaint.Status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {complaint.Status}
                                                    </span>
                                                </div>
                                                <div className="flex-[1] flex justify-end">
                                                    <button
                                                        onClick={() => handleActionClick(complaint)}
                                                        className="text-gray-400 hover:text-orange-500 transition-colors"
                                                        title="View & Update"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-gray-300">
                                        <p>No assigned complaints found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile View (Cards) */}
                    <div className="md:hidden p-4 flex flex-col gap-4">
                        {loading ? (
                            <div className="text-center text-gray-500">Loading...</div>
                        ) : safeComplaints.length > 0 ? (
                            safeComplaints
                                .sort((a, b) => {
                                    if (a.Status === 'Resolved' && b.Status !== 'Resolved') return 1;
                                    if (a.Status !== 'Resolved' && b.Status === 'Resolved') return -1;
                                    return new Date(b.Created_at) - new Date(a.Created_at);
                                })
                                .map((complaint, index) => (
                                    <div key={complaint.Complaint_ID} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-gray-500">#{index + 1}</span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${complaint.Status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                complaint.Status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {complaint.Status}
                                            </span>
                                        </div>
                                        <h3
                                            className="font-bold text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                                            onClick={() => handleActionClick(complaint)}
                                        >
                                            {complaint.Title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {complaint.Is_anonymous ? 'Anonymous' : (complaint.student ? complaint.student.Name : 'Unknown')} • {complaint.Created_at ? new Date(complaint.Created_at).toLocaleDateString() : 'N/A'}
                                        </p>
                                        <button
                                            onClick={() => handleActionClick(complaint)}
                                            className="w-full mt-2 py-2 text-center text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 text-sm font-medium"
                                        >
                                            View & Update
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <div className="text-center text-gray-400">No complaints.</div>
                        )}
                    </div>

                    {/* Pagination Dot */}
                    <div className="p-6 flex justify-center bg-white rounded-b-xl">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>

                </div>

                {/* Status Update Modal */}
                {selectedComplaint && (
                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h3 className="text-lg font-bold">Complaint Details</h3>
                                <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-semibold">Title</label>
                                    <p className="text-gray-900 font-medium">{selectedComplaint.Title}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase font-semibold">Student</label>
                                        <p className="text-gray-900">
                                            {selectedComplaint.Is_anonymous ? 'Anonymous' : (selectedComplaint.student ? selectedComplaint.student.Name : 'Unknown')}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase font-semibold">Date</label>
                                        <p className="text-gray-900">{selectedComplaint.Created_at ? new Date(selectedComplaint.Created_at).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-semibold">Description</label>
                                    <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm whitespace-pre-wrap mt-1">
                                        {selectedComplaint.Description || 'No description provided.'}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-bold text-base mb-3">Update Status</h4>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                                    <select
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        disabled={isSubmitting}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setSelectedComplaint(null)}
                                        className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateSubmit}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update Status'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                {showSuccessModal && (
                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[60] p-4">
                        <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl text-center transform transition-all scale-100">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Status Updated!</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                The complaint status has been updated successfully.
                            </p>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffAssignedComplaint;