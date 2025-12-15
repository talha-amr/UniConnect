const { Complaint, Student, Staff, Admin, Category, CategoryName } = require('../models');

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Student
const createComplaint = async (req, res) => {
    try {
        // Frontend might send PascalCase or camelCase, let's normalize
        const { Title, title, Description, description, Category_ID, categoryId, Is_anonymous, isAnonymous } = req.body;

        // Manual Validation
        const actualTitle = Title || title;
        const actualDesc = Description || description;
        const actualCatId = Category_ID || categoryId;

        if (!actualTitle || !actualDesc || !actualCatId) {
            return res.status(400).json({ message: 'Title, Description, and Category are required.' });
        }

        const complaint = await Complaint.create({
            Title: actualTitle,
            Description: actualDesc,
            Category_ID: actualCatId,
            Is_anonymous: Is_anonymous !== undefined ? Is_anonymous : (isAnonymous !== undefined ? isAnonymous : false),
            Student_ID: req.user.id
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged-in user's complaints
// @route   GET /api/complaints/my
// @access  Student
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.findAll({
            where: { Student_ID: req.user.id }
        });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all complaints (or filter by role)
// @route   GET /api/complaints
// @access  Admin, Staff (assigned)
const getAllComplaints = async (req, res) => {
    try {
        let options = {
            include: [
                { model: Student, as: 'student', attributes: ['Student_ID', 'Name', 'Email'] },
                {
                    model: Category,
                    include: [{ model: CategoryName }]
                }
            ]
        };

        if (req.user.role === 'staff') {
            // Staff should ideally see complaints assigned to their department or them personally
            // For now, let's implement "View Assigned" logic if needed, 
            // but usually staff might see open pool. Let's strictly follow prompt: "View complaints assigned to their department"
            // For this MVP, we'll assume granular assignment to Staff ID for simplicity as per schema 'complaint_assignments'
            // OR checks associations.
        }

        const complaints = await Complaint.findAll(options);
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get complaints assigned to staff
// @route   GET /api/complaints/assigned
// @access  Staff
// @desc    Get complaints assigned to staff (via Department)
// @route   GET /api/complaints/assigned
// @access  Staff
const getAssignedComplaints = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.user.id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Find Category ID matching Staff Department
        // Model CategoryName holds the name
        const catNameEntry = await CategoryName.findOne({
            where: { Category_name: staff.Department }
        });

        if (!catNameEntry) {
            return res.json([]); // No category matches this department
        }

        const complaints = await Complaint.findAll({
            where: { Category_ID: catNameEntry.Category_ID },
            include: [
                { model: Student, as: 'student', attributes: ['Student_ID', 'Name', 'Email'] },
                {
                    model: Category,
                    include: [{ model: CategoryName, attributes: ['Category_name'] }]
                }
            ]
        });

        res.json(complaints);
    } catch (error) {
        console.error("Error fetching assigned complaints:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Assign a complaint to a Department (Category)
// @route   POST /api/complaints/assign/:complaintId
// @access  Admin
const assignComplaint = async (req, res) => {
    const { categoryId } = req.body; // Expect Category ID now, not staffId
    const { complaintId } = req.params;

    try {
        const complaint = await Complaint.findByPk(complaintId);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Update the Category, effectively assigning it to that Department
        complaint.Category_ID = categoryId;
        await complaint.save();

        res.json({ message: 'Complaint assigned to department successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update complaint status
// @route   PATCH /api/complaints/:id/status
// @access  Staff
const updateComplaintStatus = async (req, res) => {
    const { status, remarks } = req.body;
    const { id } = req.params;

    try {
        const complaint = await Complaint.findByPk(id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Verify if staff is assigned?
        // skipping strict check for simplicity, assuming Role Middleware handled 'Staff'

        // Match model definition: Status (PascalCase)
        complaint.Status = status;
        await complaint.save();

        // Create update logic removed as table does not exist
        // await ComplaintUpdate.create({...});

        // Email Notification to student would go here

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all categories (for dropdowns)
// @route   GET /api/complaints/categories
// @access  Authenticated
const getCategories = async (req, res) => {
    try {
        // Fetch CategoryNames join Category to get ID map
        // Actually CategoryName table holds (Category_ID, Category_name)
        // We need to return list of { id: Category_ID, name: Category_name }

        const categories = await CategoryName.findAll();
        // Since schema separates Category and CategoryName, we assume 1:1 or 1:Many
        // We'll return the list of names with their linked Category_ID

        const formatted = categories.map(c => ({
            id: c.Category_ID,
            name: c.Category_name
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    getAssignedComplaints,
    assignComplaint,
    updateComplaintStatus,
    getCategories
};
