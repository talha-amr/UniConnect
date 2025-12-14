const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
    try {
        console.log('--- Starting System Verification ---');

        // 1. Register a new user (randomized to avoid duplicates if re-run)
        const randomId = Math.floor(Math.random() * 10000);
        const newUser = {
            name: `Test User ${randomId}`,
            email: `test${randomId}@student.com`,
            password: 'password123',
            role: 'student'
        };

        console.log(`\n1. Registering User: ${newUser.email}...`);
        const registerRes = await axios.post(`${API_URL}/auth/register`, newUser);
        console.log('✅ Registration Successful:', registerRes.status);
        const token = registerRes.data.token;

        // 2. Login (just to verify flow, though register returns token)
        console.log(`\n2. Logging in...`);
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: newUser.email,
            password: newUser.password
        });
        console.log('✅ Login Successful:', loginRes.status);

        // 3. Create Complaint
        console.log(`\n3. Creating Complaint...`);
        const complaintData = {
            title: 'Test Complaint',
            description: 'This is a test complaint from the verification script.',
            category: 'IT',
            is_anonymous: false
        };

        const complaintRes = await axios.post(`${API_URL}/complaints`, complaintData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Complaint Created ID:', complaintRes.data.id);

        // 4. Get My Complaints
        console.log(`\n4. Fetching My Complaints...`);
        const myComplaintsRes = await axios.get(`${API_URL}/complaints/my`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Fetched ${myComplaintsRes.data.length} complaint(s).`);
        console.log('   - Last Complaint Title:', myComplaintsRes.data[myComplaintsRes.data.length - 1].title);

        console.log('\n--- Verification Complete: ALL TESTS PASSED ---');

    } catch (error) {
        console.error('\n❌ Verification Failed:', error.response ? error.response.data : error.message);
    }
};

runTests();
