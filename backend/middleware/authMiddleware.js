const jwt = require('jsonwebtoken');
const { Student, Staff, Admin } = require('../models');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            let user;
            if (decoded.role === 'admin') {
                user = await Admin.findByPk(decoded.id);
            } else if (decoded.role === 'staff') {
                user = await Staff.findByPk(decoded.id);
            } else {
                user = await Student.findByPk(decoded.id);
            }

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Standardize user object on req
            req.user = {
                id: decoded.id,
                role: decoded.role,
                ...user.toJSON()
            };

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
