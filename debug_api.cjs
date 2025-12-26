const axios = require('axios');

async function debugValues() {
    try {
        console.log("Logging in...");
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@uniconnect.com',
            password: '123456'
        });
        const token = loginRes.data.token;
        console.log("Token obtained.");

        console.log("Fetching complaints...");
        const compRes = await axios.get('http://localhost:5000/api/complaints', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Response Data (First Item):");
        console.log(JSON.stringify(compRes.data[0], null, 2));

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

debugValues();
