import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Navbar = () => {
  const {isAuthenticated, userEmail, logout} = useContext(AuthContext);

  return (
    <nav className='flex w-full justify-between p-4 bg-[#0C1821] text-[#CCC9DC]'>
      <div>
        {isAuthenticated && (
            <div className=' flex gap-4'>
              <Link to="/dashboard" className='hover:text-white-500'>Dashboard</Link>
              <Link to="/expenses" className='hover:text-white-500'>Expenses</Link>
            </div>
          
        )}
      </div>
      
      <div className='flex gap-4 items-center'>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className='hover:text-white-500'>Login</Link>
            <Link to="/register" className='hover:text-white-500'>Register</Link>
          </>
        ) : (
          <>
            <span>Hi, {userEmail}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      
    </nav>
  )
}

export default Navbar
