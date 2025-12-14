import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div>
      <Navbar theme='login'/>
      <Login/>
    </div>
  )
}

export default LoginPage
