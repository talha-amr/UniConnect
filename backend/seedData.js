const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const { connectDB, sequelize } = require('./config/db');
const { Admin, Staff, Student, Category, CategoryName, Complaint, StaffAssignment } = require('./models');

const seedData = async () => {
    try {
        await connectDB();

        // --- CLEANUP ---
        console.log('Cleaning up old data...');
        // Disable foreign key checks to allow truncation
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

        await Complaint.destroy({ truncate: true, cascade: true });
        await Student.destroy({ truncate: true, cascade: true });
        await Staff.destroy({ truncate: true, cascade: true });
        await Admin.destroy({ truncate: true, cascade: true });
        // Optional: Keep Categories or reset them. Let's reset to ensure IDs are clean.
        await CategoryName.destroy({ truncate: true, cascade: true });
        await Category.destroy({ truncate: true, cascade: true });

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
        console.log('Database cleared.');

        // --- PASSWORD ---
        const PASSWORD = 'password123';

        // --- CATEGORIES (Functional Units for Complaints & Staff) ---
        console.log('Seeding Categories...');
        const functionalCategories = ['Infrastructure', 'Maintenance', 'IT Support', 'Electrical', 'Plumbing', 'Transport', 'Academics', 'Administration', 'Security', 'Sanitation'];

        for (const catName of functionalCategories) {
            const cat = await Category.create({});
            await CategoryName.create({
                Category_ID: cat.Category_ID,
                Category_name: catName
            });
        }
        console.log('Categories seeded.');

        // --- PUCIT DATA ---
        console.log('Seeding PUCIT Data...');

        // Admin
        const pucitAdmin = await Admin.create({
            Name: 'PUCIT Admin',
            Email: 'admin@pucit.edu.pk',
            Password: PASSWORD
        });

        // Staff (Assigned to Functional Categories)
        const pucitStaffData = [
            { name: 'Sir Amjad', email: 'amjad@pucit.edu.pk', dept: 'IT Support' },
            { name: 'Mr. Rafique', email: 'rafique@pucit.edu.pk', dept: 'Infrastructure' },
            { name: 'Mr. Latif', email: 'latif@pucit.edu.pk', dept: 'Electrical' }
        ];
        for (const s of pucitStaffData) {
            await Staff.create({
                Name: s.name,
                Email: s.email,
                Password: PASSWORD,
                Department: s.dept
            });
        }

        // Students (Belong to Academic Departments - just strings)
        const pucitStudentData = [
            { name: 'Ayesha Khan', email: 'ayesha@pucit.edu.pk', dept: 'Computer Science' },
            { name: 'Bilal Ahmed', email: 'bilal@pucit.edu.pk', dept: 'Software Engineering' },
            { name: 'Zain Ali', email: 'zain@pucit.edu.pk', dept: 'IT' }
        ];

        for (const s of pucitStudentData) {
            await Student.create({
                Name: s.name,
                Email: s.email,
                Password: PASSWORD,
                Department: s.dept
            });
        }

        // --- LUMS DATA ---
        console.log('Seeding LUMS Data...');

        // Admin
        const lumsAdmin = await Admin.create({
            Name: 'LUMS Admin',
            Email: 'admin@lums.edu.pk',
            Password: PASSWORD
        });

        // Staff
        const lumsStaffData = [
            { name: 'Dr. Fareed', email: 'fareed@lums.edu.pk', dept: 'Academics' },
            { name: 'Mr. John', email: 'john@lums.edu.pk', dept: 'Maintenance' },
            { name: 'Mr. Smith', email: 'smith@lums.edu.pk', dept: 'Security' }
        ];
        for (const s of lumsStaffData) {
            await Staff.create({
                Name: s.name,
                Email: s.email,
                Password: PASSWORD,
                Department: s.dept
            });
        }

        // Students
        const lumsStudentData = [
            { name: 'Fatima Noor', email: 'fatima@lums.edu.pk', dept: 'Computer Science' },
            { name: 'Ahmed Raza', email: 'ahmed@lums.edu.pk', dept: 'Business' },
            { name: 'Hassan Ali', email: 'hassan@lums.edu.pk', dept: 'Economics' }
        ];
        for (const s of lumsStudentData) {
            await Student.create({
                Name: s.name,
                Email: s.email,
                Password: PASSWORD,
                Department: s.dept
            });
        }

        // --- SAMPLE COMPLAINTS ---
        console.log('Seeding Sample Complaints...');

        // Fetch valid Category IDs and Student IDs
        const itCat = await CategoryName.findOne({ where: { Category_name: 'IT Support' } });
        const maintCat = await CategoryName.findOne({ where: { Category_name: 'Maintenance' } });

        const ayesha = await Student.findOne({ where: { Email: 'ayesha@pucit.edu.pk' } });
        const fatima = await Student.findOne({ where: { Email: 'fatima@lums.edu.pk' } });

        if (itCat && ayesha) {
            await Complaint.create({
                Title: 'Slow Internet in CS Lab',
                Description: 'The internet connection drops frequently in the CS Lab 2.',
                Category_ID: itCat.Category_ID,
                Student_ID: ayesha.Student_ID,
                Is_anonymous: false
            });
            console.log('PUCIT Complaint Seeded: Slow Internet (IT Support)');
        }

        if (maintCat && fatima) {
            await Complaint.create({
                Title: 'Broken AC in Library',
                Description: 'The air conditioner in the main hall is not cooling.',
                Category_ID: maintCat.Category_ID,
                Student_ID: fatima.Student_ID,
                Is_anonymous: true
            });
            console.log('LUMS Complaint Seeded: Broken AC (Maintenance)');
        }

        console.log('Data Seeding Completed Successfully.');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
