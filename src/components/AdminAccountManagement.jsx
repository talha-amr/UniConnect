import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminAccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await api.delete(`/users/${id}?type=${type}`);
        // Refresh list
        fetchUsers();
        // Or filter locally: setAccounts(prev => prev.filter(acc => acc.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}


      {/* Main Content */}
      <div className="my-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">User Management</h1>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`${account.bgColor} border-2 ${account.borderColor} rounded-2xl p-6`}
            >
              {/* Avatar Circle */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-700">{account.initial}</span>
                </div>
              </div>

              {/* Account Info */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">{account.type}</h3>
                <p className="text-lg font-bold text-gray-900 truncate">{account.name}</p>
                <p className="text-xs text-gray-500 truncate">{account.email}</p>
              </div>

              {/* Delete Button */}
              <div className="mb-4">
                <button
                  onClick={() => handleDeleteAccount(account.id, account.type)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </button>
              </div>

              {/* Created Date */}
              <p className="text-sm text-gray-600 mb-2">
                Account Created on {new Date(account.createdDate).toLocaleDateString()}
              </p>

              {/* Status Message */}
              {account.status === 'active' ? (
                <p className="text-sm text-gray-500 italic">This account is active.</p>
              ) : (
                <p className="text-sm text-gray-500 italic">{account.message}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AdminAccountManagement;