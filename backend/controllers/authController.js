const jwt = require('jsonwebtoken');
const { Student, Staff, Admin } = require('../models');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

/*
    @desc Register a new user (Student, Staff, or Admin)
    @route POST /api/auth/register
    @access Public
*/
const registerUser = async (req, res) => {
    const { name, email, password, role, department } = req.body;
    let Model;

    if (role === 'admin') Model = Admin;
    else if (role === 'staff') Model = Staff;
    else Model = Student; // Default to Student

    try {
        // Check if user exists in the specific table
        // Note: Ideally check all tables to ensure unique email across system if required
        const userExists = await Model.findOne({ where: { Email: email } });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userData = {
            Name: name,
            Email: email,
            Password: password
        };

        if (role !== 'admin') {
            userData.Department = department;
        }

        const user = await Model.create(userData);

        if (user) {
            const id = user.Student_ID || user.Staff_ID || user.Admin_ID;
            res.status(201).json({
                _id: id,
                name: user.Name,
                email: user.Email,
                role: role || 'student',
                token: generateToken(id, role || 'student'),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
    @desc Auth user & get token
    @route POST /api/auth/login
    @access Public
*/
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user;
        let role;

        // Try to find user in all tables
        // Priority: Admin -> Staff -> Student (or could be explicit if role passed)

        // Check Admin
        user = await Admin.findOne({ where: { Email: email } });
        if (user) role = 'admin';

        // Check Staff
        if (!user) {
            user = await Staff.findOne({ where: { Email: email } });
            if (user) role = 'staff';
        }

        // Check Student
        if (!user) {
            user = await Student.findOne({ where: { Email: email } });
            if (user) role = 'student';
        }

        if (user && (await user.matchPassword(password))) {
            const id = user.Student_ID || user.Staff_ID || user.Admin_ID;
            res.json({
                _id: id,
                name: user.Name,
                email: user.Email,
                role: role,
                token: generateToken(id, role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
    @desc Get current logged in user
    @route GET /api/auth/me
    @access Private
*/
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = { registerUser, loginUser, getMe };
