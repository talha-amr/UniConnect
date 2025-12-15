const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CategoryName = sequelize.define('CategoryName', {
    Category_Name_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Category_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'Category_ID'
        }
    },
    Category_name: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'Category_Name',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: false
});

module.exports = CategoryName;
