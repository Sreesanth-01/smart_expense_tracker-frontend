import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import logo from '../../assets/logo.png'


const Navbar = () => {
  const {isAuthenticated, userEmail, logout} = useContext(AuthContext);

  return (
    <nav className='flex  w-full justify-between p-3 bg-[#0C1821] text-[#CCC9DC]'>
      <div className='flex items-center w-fit'>
        <img src={logo} alt='Logo' className='w-1/8'></img>
        <div>
          <div>
            <span>SMART</span>
          </div>
          <div>
            Expense Tracker
          </div>
        </div>
      </div>  
      <div className='flex items-center align-center gap-4'>
        {isAuthenticated && (
            <div className=' flex gap-4'>
              <Link to="/dashboard" className='hover:text-white-500'>Dashboard</Link>
              <Link to="/expenses" className='hover:text-white-500'>Expenses</Link>
              <Link to="/aiinsights" className='hover:text-white-500'>Ai insights</Link>
              <Link to="/summary" className='hover:text-white-500'>Summary</Link>
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
            {/* <span>Hi, {userEmail}</span> */}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      
    </nav>
  )
}

export default Navbar
