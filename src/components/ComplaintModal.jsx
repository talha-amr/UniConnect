import React, { useState } from 'react';
import { X, CheckSquare, Square } from 'lucide-react';
import api from '../api/axios'; // Ensure API import

const ComplaintModal = ({ isOpen, onClose, onSubmit }) => {
    // Form State matching your 'Complaint' table schema
    const [formData, setFormData] = useState({
        title: '',
        categoryId: '',
        description: '',
        isAnonymous: false
    });

    const [categories, setCategories] = useState([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/complaints/categories');
                // Backend returns { id: 1, name: 'IT' } or similiar
                setCategories(res.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        if (isOpen) fetchCategories();
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleAnonymous = () => {
        setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // This object matches your Schema structure for the API call
        const complaintPayload = {
            Title: formData.title,
            Description: formData.description,
            Category_ID: parseInt(formData.categoryId),
            Is_anonymous: formData.isAnonymous ? 1 : 0, // Converting boolean to TINYINT/BOOL logic if needed
            Status: 'Pending', // Default as per schema
            // Student_ID: user.id (You would typically inject the logged-in ID here)
        };

        onSubmit(complaintPayload);
        onClose(); // Close modal after submit
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#FFFDF7]">
                    <h2 className="text-xl font-semibold text-gray-900">Lodge a Complaint</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Title Input */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Complaint Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="e.g., Projector not working in Lab 4"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
                        />
                    </div>

                    {/* Category Select (Maps to Category_ID) */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="categoryId"
                            required
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none bg-white"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            required
                            rows="4"
                            placeholder="Describe the issue in detail..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none resize-none transition-all"
                        ></textarea>
                    </div>

                    {/* Anonymous Toggle */}
                    <div
                        onClick={toggleAnonymous}
                        className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className={`text-${formData.isAnonymous ? 'orange-500' : 'gray-400'}`}>
                            {formData.isAnonymous ? <CheckSquare size={20} /> : <Square size={20} />}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Submit Anonymously</p>
                            <p className="text-xs text-gray-500">Your name will be hidden from staff members.</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 shadow-sm transition-colors"
                        >
                            Submit Complaint
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ComplaintModal;