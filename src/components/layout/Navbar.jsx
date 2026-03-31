import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Navbar = () => {
  const {isAuthenticated, logout} = useContext(AuthContext);

  return (
    <nav className='flex w-full gap-4 p-4 bg-[#0C1821] text-[#CCC9DC]'>
      {isAuthenticated ? (
        <div className='flex gap-4'>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/expenses">Expenses</Link>
          <button onClick={logout}>Logout</button>
        </div>
      ):
      (
      
      <div className='flex gap-4 ml-auto'>
        <Link to="/login">Login</Link>
      
        <Link to="/register">Register</Link>
      </div>
      )}
    </nav>
  )
}

export default Navbar
