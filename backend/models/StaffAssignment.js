const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StaffAssignment = sequelize.define('StaffAssignment', {
    Assignment_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Complaint_ID: {
        type: DataTypes.INTEGER
    },
    Staff_ID: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Staff_Assignment',
    timestamps: true,
    createdAt: 'assigned_at',
    updatedAt: false
});

module.exports = StaffAssignment;
