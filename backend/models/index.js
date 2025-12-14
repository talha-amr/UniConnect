const { sequelize } = require('../config/db');
const Student = require('./Student');
const Staff = require('./Staff');
const Admin = require('./Admin');
const Category = require('./Category');
const CategoryName = require('./CategoryName');
const Complaint = require('./Complaint');
const StaffAssignment = require('./StaffAssignment');

// Associations

// Student has many Complaints
Student.hasMany(Complaint, { foreignKey: 'Student_ID', as: 'complaints' });
Complaint.belongsTo(Student, { foreignKey: 'Student_ID', as: 'student' });

// Category has many Complaints
Category.hasMany(Complaint, { foreignKey: 'Category_ID' });
Complaint.belongsTo(Category, { foreignKey: 'Category_ID' });

// Category has many CategoryNames
Category.hasMany(CategoryName, { foreignKey: 'Category_ID' });
CategoryName.belongsTo(Category, { foreignKey: 'Category_ID' });

// Staff Assignments (Many-to-Many: Staff <-> Complaint)
Staff.belongsToMany(Complaint, { through: StaffAssignment, foreignKey: 'Staff_ID' });
Complaint.belongsToMany(Staff, { through: StaffAssignment, foreignKey: 'Complaint_ID' });

module.exports = {
    sequelize,
    Student,
    Staff,
    Admin,
    Category,
    CategoryName,
    Complaint,
    StaffAssignment
};
