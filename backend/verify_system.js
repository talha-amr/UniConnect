const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test Data
const STUDENT_CRED = { email: 'john@student.com', password: '123456' };
const ADMIN_CRED = { email: 'admin@uniconnect.com', password: '123456' };
const STAFF_CRED = { email: 'staff.it@uniconnect.com', password: '123456' };

const ComplaintData = {
    title: 'Functional Test via Script',
    description: 'Testing DB and Staff Assignment',
    categoryId: 1
};

async function runVerification() {
    try {
        console.log('--- STARTING SYSTEM VERIFICATION ---');

        // 1. Login as Student
        console.log('1. Logging in as Student...');
        const studentRes = await axios.post(`${API_URL}/auth/login`, STUDENT_CRED);
        const studentToken = studentRes.data.token;
        console.log('   Student Logged in. Token received.');

        // 2. Create Complaint
        console.log('2. Creating Complaint...');
        const complaintRes = await axios.post(`${API_URL}/complaints`, ComplaintData, {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        const complaintId = complaintRes.data.Complaint_ID || complaintRes.data.id;
        console.log(`   Complaint Created. ID: ${complaintId}`);

        // 3. Login as Admin
        console.log('3. Logging in as Admin...');
        const adminRes = await axios.post(`${API_URL}/auth/login`, ADMIN_CRED);
        const adminToken = adminRes.data.token;
        console.log('   Admin Logged in.');

        // 4. Fetch Categories to get ID
        console.log('4. Fetching Department Categories...');
        const catRes = await axios.get(`${API_URL}/complaints/categories`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        // Find Category for 'IT' (matches our test staff department)
        // We'll trust the seeding ensures 'IT' exists or we use the staff credential department
        // Assuming test staff 'staff.it' belongs to 'IT' or mapped department.
        // Let's verify specifically "IT" or similar.
        const targetDept = 'Infrastructure'; // Based on seed or previous tests? 
        // Wait, earlier manual browser test showed 'Infrastructure' (ID 2). 'IT' failed.
        // Let's dynamically find a category ID that maps to the Staff's Department.
        // We need to fetch the staff to know their department first?
        const usersRes = await axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${adminToken}` } });
        const staffUser = usersRes.data.find(u => u.email === STAFF_CRED.email);
        const staffDept = staffUser.department || staffUser.Department || 'Infrastructure'; // Fallback if property casing varies

        const targetCategory = catRes.data.find(c => c.name === staffDept);
        // Note: Earlier logs showed "Infrastructure" was ID 2. 
        // If staff is mapped to 'IT', but category is 'Infrastructure', we have a mismatch.
        // Let's assume for this test we assign to WHATEVER department the staff is in.

        if (!targetCategory) {
            console.log("Categories found:", JSON.stringify(catRes.data));
            throw new Error(`Category matching staff department '${staffDept}' not found`);
        }

        const targetCatId = targetCategory.id;
        console.log(`   Found Category '${targetCategory.name}' ID: ${targetCatId}`);

        // 5. Assign Complaint to Department (Category)
        console.log(`5. Assigning Complaint ${complaintId} to Department ${targetCategory.name}...`);
        await axios.post(`${API_URL}/complaints/assign/${complaintId}`,
            { categoryId: targetCatId },
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        console.log('   Assignment API call successful.');

        // 6. Login as Staff
        console.log('6. Logging in as Staff...');
        const staffRes = await axios.post(`${API_URL}/auth/login`, STAFF_CRED);
        const staffToken = staffRes.data.token;
        console.log('   Staff Logged in.');

        // 7. Check Assigned Complaints
        console.log('7. Checking Assigned Complaints...');
        const assignedRes = await axios.get(`${API_URL}/complaints/assigned`, {
            headers: { Authorization: `Bearer ${staffToken}` }
        });

        const found = assignedRes.data.find(c => c.Complaint_ID === complaintId);
        if (found) {
            console.log('   ✅ SUCCESS: Complaint found in Staff Assignment list!');
            console.log('   Data:', JSON.stringify(found, null, 2));

            // 8. Staff Updates Status to 'In Progress'
            console.log("8. Updating Status to 'In Progress'...");
            const updateRes = await axios.patch(`${API_URL}/complaints/${complaintId}/status`,
                { status: 'In Progress', remarks: 'Started working' },
                { headers: { Authorization: `Bearer ${staffToken}` } }
            );
            console.log("   Status Updated:", updateRes.data.Status);
            if (updateRes.data.Status !== 'In Progress') throw new Error("Status update failed");

            // 9. Negative Test: Invalid Complaint Support
            console.log("9. Testing Invalid Complaint Submission (Missing Title)...");
            try {
                await axios.post(`${API_URL}/complaints`, { description: 'No title' }, {
                    headers: { Authorization: `Bearer ${studentToken}` }
                });
                console.error("   ❌ FAILURE: Invalid complaint was NOT rejected.");
            } catch (err) {
                console.log("   ✅ SUCCESS: Invalid complaint rejected with status:", err.response?.status);
            }

        } else {
            console.error('   ❌ FAILURE: Complaint NOT found in Staff Assignment list.');
            console.log('   List:', JSON.stringify(assignedRes.data, null, 2));
        }

    } catch (error) {
        console.error('❌ VERIFICATION FAILED');
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

runVerification();
