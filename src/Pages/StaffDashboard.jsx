import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import SlideNavbar from '../components/SlideNavbar';
import StaffDashboardComp from '../components/StaffDashboardComp';

const StaffDashboard = () => {
    const [assignedComplaints, setAssignedComplaints] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [complaintsRes, userRes] = await Promise.all([
                    api.get('/complaints/assigned'),
                    api.get('/auth/me')
                ]);
                setAssignedComplaints(complaintsRes.data);
                setUser(userRes.data);
            } catch (error) {
                console.error('Failed to fetch staff data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <SlideNavbar>
            <StaffDashboardComp user={user} complaints={assignedComplaints} />
        </SlideNavbar>
    );
};

export default StaffDashboard;
