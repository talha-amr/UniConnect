const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const Staff = sequelize.define('Staff', {
    Staff_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Department: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'Staff',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    hooks: {
        beforeCreate: async (user) => {
            if (user.Password) {
                const salt = await bcrypt.genSalt(10);
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('Password')) {
                const salt = await bcrypt.genSalt(10);
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        }
    }
});

Staff.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

module.exports = Staff;
