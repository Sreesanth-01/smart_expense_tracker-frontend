import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Navbar = () => {
  const {logout} = useContext(AuthContext);
  return (
    <nav className='flex w-full gap-4 p-4 bg-[#0C1821] text-[#CCC9DC]'>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar
