import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import SlideNavbar from '../components/SlideNavbar';
import StaffAssignedComplaint from '../components/StaffAssignedComplaint';

const StaffAssignedComplaintPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await api.get('/complaints/assigned');
            setComplaints(res.data);
        } catch (error) {
            console.error("Failed to fetch assigned complaints", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return (
        <SlideNavbar>
            <StaffAssignedComplaint
                complaints={complaints}
                loading={loading}
                onRefresh={fetchComplaints}
            />
        </SlideNavbar>
    );
};

export default StaffAssignedComplaintPage;
