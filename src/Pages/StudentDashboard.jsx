import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import SlideNavbar from '../components/SlideNavbar';
import StudentDashboard from '../components/StudentDashboard';

const StudentDashboardPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [complaintsRes, userRes] = await Promise.all([
                    api.get('/complaints/my'),
                    api.get('/auth/me')
                ]);
                setComplaints(complaintsRes.data);
                setUser(userRes.data);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <SlideNavbar>
            <StudentDashboard complaints={complaints} user={user} />
        </SlideNavbar>
    );
};

export default StudentDashboardPage;
