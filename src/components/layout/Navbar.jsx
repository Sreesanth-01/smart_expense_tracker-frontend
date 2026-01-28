import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex gap-4 p-4 bg-gray-800 text-white'>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar
