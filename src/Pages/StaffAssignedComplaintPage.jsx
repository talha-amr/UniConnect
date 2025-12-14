import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import SlideNavbar from '../components/SlideNavbar';
import StaffAssignedComplaint from '../components/StaffAssignedComplaint';

const StaffAssignedComplaintPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await api.get('/complaints/assigned');
                setComplaints(res.data);
            } catch (error) {
                console.error("Failed to fetch assigned complaints", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <SlideNavbar>
            <StaffAssignedComplaint complaints={complaints} loading={loading} />
        </SlideNavbar>
    );
};

export default StaffAssignedComplaintPage;
