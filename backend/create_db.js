const mysql = require('mysql2/promise');
require('dotenv').config();

const createDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database ${process.env.DB_NAME} created or already exists.`);
        process.exit();
    } catch (error) {
        console.error('Error creating database:', error);
        process.exit(1);
    }
};

createDB();
