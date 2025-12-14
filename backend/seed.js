const { sequelize, Student, Staff, Admin, Complaint, Category, CategoryName } = require('./models');
require('dotenv').config();
const bcrypt = require('bcryptjs'); // Assuming bcryptjs is installed as per package.json

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync and clear existing data (force: true clears everything)
        await sequelize.sync({ force: true });
        console.log('Database synced & cleared...');

        // Helper to hash password removed as hooks handle it
        const passwordPlain = '123456';

        // Create Admin
        await Admin.create({
            Name: 'Admin User',
            Email: 'admin@uniconnect.com',
            Password: passwordPlain
        });

        // Create Staff
        const staff1 = await Staff.create({
            Name: 'Staff IT',
            Email: 'staff.it@uniconnect.com',
            Password: passwordPlain,
            Department: 'IT'
        });

        const staff2 = await Staff.create({
            Name: 'Staff Maintenance',
            Email: 'staff.maint@uniconnect.com',
            Password: passwordPlain,
            Department: 'Maintenance'
        });

        // Create Students
        const student1 = await Student.create({
            Name: 'John Student',
            Email: 'john@student.com',
            Password: passwordPlain,
            Department: 'CS'
        });

        const student2 = await Student.create({
            Name: 'Alice Student',
            Email: 'alice@student.com',
            Password: passwordPlain,
            Department: 'EE'
        });

        console.log('Users created...');

        // Create Categories and CategoryNames
        const categories = ['Academic', 'Infrastructure', 'Hostel', 'Transport', 'Administration', 'IT', 'Maintenance'];
        const categoryMap = {}; // Name -> ID

        for (const catName of categories) {
            const cat = await Category.create({});
            await CategoryName.create({
                Category_ID: cat.Category_ID,
                Category_name: catName
            });
            categoryMap[catName] = cat.Category_ID;
            console.log(`Created Category: ${catName}`);
        }

        // Create Complaints
        await Complaint.create({
            title: 'WiFi Issues in Hostel A',
            description: 'The wifi connection is dropping every 5 minutes.',
            status: 'Pending',
            is_anonymous: false,
            Student_ID: student1.Student_ID,
            Category_ID: categoryMap['IT']
        });

        await Complaint.create({
            title: 'Broken Chair in Lab 3',
            description: 'Seat back is broken.',
            status: 'Resolved',
            is_anonymous: true,
            Student_ID: student2.Student_ID,
            Category_ID: categoryMap['Maintenance']
        });

        // Add a resolved complaint for John to verify "Complaints Solved" stat
        await Complaint.create({
            title: 'Projector not working',
            description: 'Room 101 projector is dim.',
            status: 'Resolved',
            is_anonymous: false,
            Student_ID: student1.Student_ID,
            Category_ID: categoryMap['IT']
        });

        console.log('Complaints seeded...');
        console.log('Seeding Complete! Login with john@student.com / 123456');
        process.exit();

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
