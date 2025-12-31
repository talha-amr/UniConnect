import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student'); // student, staff, admin
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    agreeToTerms: false
  });

  const [staffCategories, setStaffCategories] = useState([]);

  const academicDepartments = [
    'Computer Science', 'Software Engineering', 'IT', 'Data Science',
    'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
    'Business Administration', 'Economics', 'Accounting',
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English Literature', 'History', 'Psychology', 'Law', 'Other'
  ];

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/complaints/categories');
        setStaffCategories(response.data.map(c => c.name));
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // Prepare data based on user type
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      userType: userType
    };

    // Add department for staff and student
    if (userType !== 'admin') {
      userData.department = formData.department;
    }

    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.userType,
        ...(userData.department && { department: userData.department })
      });

      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admindash');
      } else if (role === 'staff') {
        navigate('/staff');
      } else {
        navigate('/student');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      // You might want to set an error state here to display to the user
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-[6rem] md:pt-[8vw] pb-[2vw]">
      <div className="my-container w-full">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#1A2641] mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Sign up to get started with UniConnect
            </p>
          </div>

          {/* User Type Selection */}
          <div className="bg-[#F5F1E8] rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#1A2641] mb-4 text-center">
              Select Account Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setUserType('student')}
                className={`py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${userType === 'student'
                  ? 'bg-[#E09B04] text-white shadow-lg'
                  : 'bg-white text-[#1A2641] border-2 border-gray-200 hover:border-[#E09B04]'
                  }`}
              >
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Student
                </div>
              </button>

              <button
                onClick={() => setUserType('staff')}
                className={`py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${userType === 'staff'
                  ? 'bg-[#E09B04] text-white shadow-lg'
                  : 'bg-white text-[#1A2641] border-2 border-gray-200 hover:border-[#E09B04]'
                  }`}
              >
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Staff
                </div>
              </button>

              <button
                onClick={() => setUserType('admin')}
                className={`py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${userType === 'admin'
                  ? 'bg-[#E09B04] text-white shadow-lg'
                  : 'bg-white text-[#1A2641] border-2 border-gray-200 hover:border-[#E09B04]'
                  }`}
              >
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </div>
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#1A2641] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E09B04] focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1A2641] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E09B04] focus:outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Department Field (for Staff and Student only) */}
              {userType !== 'admin' && (
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-[#1A2641] mb-2">
                    {userType === 'staff' ? 'Functional Department (Assigned Tasks)' : 'Academic Department'}
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E09B04] focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select your department</option>
                    {userType === 'student' ? (
                      academicDepartments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))
                    ) : (
                      staffCategories.map((catName) => (
                        <option key={catName} value={catName}>
                          {catName}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#1A2641] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E09B04] focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1A2641] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E09B04] focus:outline-none transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1 text-[#E09B04] border-gray-300 rounded focus:ring-[#E09B04]"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <button className="text-[#E09B04] hover:text-[#C88903] font-semibold">
                      Terms & Conditions
                    </button>{' '}
                    and{' '}
                    <button className="text-[#E09B04] hover:text-[#C88903] font-semibold">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-[#E09B04] hover:bg-[#C88903] text-white font-bold py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-[#E09B04] hover:text-[#C88903] font-bold">
                  Login
                </a>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to UniConnect's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-slideIn">
            <div className="bg-red-500 p-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Failed</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => setError('')}
                className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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

export default Register;