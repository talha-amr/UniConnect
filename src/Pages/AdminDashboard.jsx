import React from 'react'
import AdminDash from '../components/AdminDash'
import Navbar from '../components/Navbar'
import NavbarAdmin from '../components/NavbarAdmin'

const AdminDashboard = () => {
  return (
    <div>
        <NavbarAdmin/>
      <AdminDash/>
    </div>
  )
}

export default AdminDashboard
