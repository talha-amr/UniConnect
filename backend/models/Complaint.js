const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Complaint = sequelize.define('Complaint', {
    Complaint_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: {
        type: DataTypes.STRING(255)
    },
    Status: {
        type: DataTypes.STRING(50),
        defaultValue: 'Pending'
    },
    Student_ID: {
        type: DataTypes.INTEGER
        // Association will handle FK constraint
    },
    Description: {
        type: DataTypes.TEXT
    },
    Category_ID: {
        type: DataTypes.INTEGER
        // Association will handle FK constraint
    },
    Is_anonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Complaint',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at'
});

module.exports = Complaint;
