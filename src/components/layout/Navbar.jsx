import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Navbar = () => {
  const {logout} = useContext(AuthContext);
  return (
    <nav className='flex gap-4 p-4 bg-gray-800 text-white'>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar
