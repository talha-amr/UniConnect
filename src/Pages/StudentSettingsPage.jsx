import React, { useEffect, useState } from 'react';
import SlideNavbar from '../components/SlideNavbar';
import StudentSettings from '../components/StudentSettings';
import api from '../api/axios';

const StudentSettingsPage = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ total: 0, solved: 0, pending: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Determine role first
                // Assuming role is stored or we can check via /auth/me result if consistent, 
                // but fetching /auth/me first is safer.
                const userRes = await api.get('/auth/me');
                const userData = userRes.data;
                setUser(userData);

                // Fetch stats based on role
                let complaintsRes;
                if (userData.role === 'staff' || localStorage.getItem('role') === 'staff') {
                    complaintsRes = await api.get('/complaints/assigned');
                } else {
                    complaintsRes = await api.get('/complaints/my');
                }

                const complaints = complaintsRes.data;
                const total = complaints.length;

                // Common status logic
                const solved = complaints.filter(c => c.Status === 'Resolved' || c.Status === 'Solved').length;
                const pending = complaints.filter(c => c.Status === 'Pending').length;

                setStats({ total, solved, pending });

            } catch (error) {
                console.error("Failed to fetch settings data", error);
            }
        };

        fetchData();
    }, []);

    // Logout handler passed down from here or used context in a real app
    // But StudentSettings handles UI, logic can be here or there.
    // Let's pass the logic to the component usually, assuming it receives a function.
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <SlideNavbar>
            <StudentSettings user={user} stats={stats} onLogout={handleLogout} />
        </SlideNavbar>
    );
};

export default StudentSettingsPage;
