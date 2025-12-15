const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Category = sequelize.define('Category', {
    Category_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: 'Category',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: false
});

module.exports = Category;
