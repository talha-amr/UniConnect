import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import LandingPage from './Pages/LandingPage';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import StaffDashboard from './Pages/StaffDashboard';
import AdminComplaintPage from './Pages/AdminComplaint';
import AdminAccounts from './Pages/AdminAccounts';
import StudentComplaintPage from './Pages/StudentComplaintPage';
import StudentSettingsPage from './Pages/StudentSettingsPage';
import StaffAssignedComplaintPage from './Pages/StaffAssignedComplaintPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminDash" element={<AdminDashboard />} />
        <Route path="/adminAccounts" element={<AdminAccounts />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student-complaints" element={<StudentComplaintPage />} />
        <Route path="/settings" element={<StudentSettingsPage />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/assigned-complaints" element={<StaffAssignedComplaintPage />} />
        <Route path="/adminComplaint" element={<AdminComplaintPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;