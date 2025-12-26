import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, UserPlus, X } from 'lucide-react';
import api from '../api/axios';

const AdminComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [complaintsRes, categoriesRes] = await Promise.all([
        api.get('/complaints'), // Admin fetches all
        api.get('/complaints/categories') // Fetch departments/categories
      ]);
      setComplaints(complaintsRes.data);
      setStaffList(categoriesRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignClick = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setShowAssignModal(true);
  };

  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowViewModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedStaffId) return alert("Select a department");
    try {
      await api.post(`/complaints/assign/${selectedComplaintId}`, { categoryId: selectedStaffId });
      alert("Assigned to department successfully");
      setShowAssignModal(false);
      fetchData();
    } catch (error) {
      console.error("Assign failed", error);
      alert("Failed to assign");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">All Complaints</h2>
          <div className="flex gap-2">
            {/* Search and Filter placeholders */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {complaints.map((c) => (
                <tr key={c.Complaint_ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4">#{c.Complaint_ID}</td>
                  <td className="px-6 py-4">{c.student ? c.student.Name : 'N/A'}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{c.Title}</td>
                  <td className="px-6 py-4">
                    {c.Category?.CategoryNames?.[0]?.Category_name || <span className="text-gray-400 italic">Unassigned</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${c.Status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {c.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button
                      onClick={() => handleAssignClick(c.Complaint_ID)}
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      title="Assign to Staff"
                    >
                      <UserPlus size={16} /> {c.Category ? 'Re-assign' : 'Assign'}
                    </button>
                    <button
                      onClick={() => handleViewClick(c)}
                      className="text-gray-400 hover:text-gray-600"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Assign Department</h3>
            <p className="text-sm text-gray-500 mb-4">Select the responsible department.</p>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
            >
              <option value="">Select Department...</option>
              {staffList.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAssignModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
              <button onClick={handleAssignSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Assign</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Complaint Details</h3>
                <span className="text-sm text-gray-500">#{selectedComplaint.Complaint_ID}</span>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Student Name</label>
                <p className="text-gray-900 font-medium">{selectedComplaint.student?.Name || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Student Email</label>
                <p className="text-gray-900">{selectedComplaint.student?.Email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Department</label>
                <p className="text-gray-900">{selectedComplaint.Category?.CategoryNames?.[0]?.Category_name || 'Unassigned'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <span className={`px-2 py-1 rounded text-xs ${selectedComplaint.Status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {selectedComplaint.Status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date Logged</label>
                <p className="text-gray-900">{new Date(selectedComplaint.Created_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-gray-900">{new Date(selectedComplaint.Updated_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <p className="text-lg font-semibold text-gray-900 mb-2">{selectedComplaint.Title}</p>

              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Description</label>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedComplaint.Description}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminComplaint;