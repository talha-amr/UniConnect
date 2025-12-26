const axios = require('axios');

async function check() {
    try {
        console.log("Debug Script Starting...");
        const port = process.env.PORT || 5000;

        // Login as admin
        console.log("Logging in...");
        const loginRes = await axios.post(`http://localhost:${port}/api/auth/login`, {
            email: 'admin@uniconnect.com',
            password: '123456'
        });

        const token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log("Logged in.");

        console.log("\n--- Checking Users API ---");
        const usersRes = await axios.get(`http://localhost:${port}/api/users`, config);
        if (usersRes.data.length > 0) {
            const u = usersRes.data[0];
            console.log(`User ID: ${u.id}, CreatedDate Type: ${typeof u.createdDate}, Value: ${u.createdDate}`);
        }

        console.log("\n--- Checking Complaints API ---");
        const complaintsRes = await axios.get(`http://localhost:${port}/api/complaints`, config);

        if (complaintsRes.data.length > 0) {
            const c = complaintsRes.data[0];
            console.log(`Complaint Title: ${c.Title}`);
            console.log(`Complaint Status: ${c.Status}`);
            console.log("Category Object Keys:", c.Category ? Object.keys(c.Category) : 'null');
            if (c.Category && c.Category.CategoryName) {
                console.log(`CategoryName Value: ${JSON.stringify(c.Category.CategoryName)}`);
            } else {
                console.log("Category.CategoryName is missing!");
                if (c.Category && c.Category.CategoryNames) {
                    console.log("Found Category.CategoryNames (Plural)!");
                }
            }
        }
    } catch (e) {
        console.error("Error:", e.message);
        if (e.response) console.error("Response:", e.response.status, e.response.data);
    }
}

check();
