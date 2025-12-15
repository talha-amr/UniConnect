const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    getAssignedComplaints,
    assignComplaint,
    updateComplaintStatus,
    getCategories
} = require('../controllers/complaintController');

// All routes here are protected
router.use(protect);

// Student
router.post('/', authorize('student'), createComplaint);
router.get('/my', authorize('student'), getMyComplaints);

// Staff
router.get('/assigned', authorize('staff'), getAssignedComplaints);
router.patch('/:id/status', authorize('staff'), updateComplaintStatus);

// Admin
router.get('/', authorize('admin'), getAllComplaints);
router.post('/assign/:complaintId', authorize('admin'), assignComplaint);
router.get('/categories', getCategories);

// Shared/Public-ish (within auth)
router.get('/:id', async (req, res) => {
    // Basic get single implementation inline or in controller
    const { Complaint } = require('../models');
    try {
        const complaint = await Complaint.findByPk(req.params.id);
        if (!complaint) return res.status(404).json({ message: 'Not found' });
        res.json(complaint);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
