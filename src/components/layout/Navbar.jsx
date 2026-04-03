import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import logo from '../../assets/logo.png'


const Navbar = () => {
  const {isAuthenticated, logout} = useContext(AuthContext);
  const [mobileToggle,setMobileToggle] = useState(false);

  return (
    <nav className='sticky top-0 z-50 w-full bg-[#0C1821] text-[#CCC9DC] border-b border-[#1B2A41] shadow-md'>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='flex justify-between h-16 items-center'>
      
      {/* 1. Logo & Brand Section */}
      <div className='flex items-center gap-3 flex-shrink-0'>
        <img src={logo} alt='Logo' className='w-10 h-10 object-contain' />
        <div className='leading-tight xs:block'>
          <div className='font-bold text-white tracking-wider'>SMART</div>
          <div className='text-[10px] uppercase text-gray-400'>Expense Tracker</div>
        </div>
      </div>

      {/* 2. Desktop Navigation (Hidden on Mobile/Tablet) */}
      <div className='hidden lg:flex items-center gap-8'>
        {isAuthenticated && (
          <div className='flex gap-6 text-sm font-medium'>
            <Link to="/dashboard" className='transition-colors hover:text-white'>Dashboard</Link>
            <Link to="/expenses" className='transition-colors hover:text-white'>Expenses</Link>
            <Link to="/aiinsights" className='transition-colors hover:text-white'>AI Insights</Link>
            <Link to="/summary" className='transition-colors hover:text-white'>Summary</Link>
          </div>
        )}
      </div>

      {/* 3. Auth Section */}
      <div className='flex items-center gap-4'>
        {!isAuthenticated ? (
          <div className='flex items-center gap-4 text-sm font-medium'>
            <Link to="/login" className='hover:text-white transition-colors'>Login</Link>
            <Link to="/register" className='bg-[#324A5F] px-4 py-2 rounded-lg text-white hover:bg-[#46607a] transition-all shadow-sm'>
              Register
            </Link>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            {/* Mobile Menu Icon (Visible only on small screens) */}
            <div className='lg:hidden flex items-center'>
              <button onClick={()=>setMobileToggle(!mobileToggle)} className='p-2 rounded-md hover:bg-[#1B2A41] text-gray-400 transition-all'>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
            
            <button 
              onClick={logout} 
              className='text-sm border border-[#324A5F] px-4 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/50 transition-all font-medium'
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </div>
  </div>

  {/* 4. Mobile Menu (Optional: Requires a 'isOpen' state to show/hide) */}
  {/* If you add a state: {isOpen && ( ... )} */}
  {mobileToggle && 
    <div className='lg:hidden bg-[#0C1821] border-t border-[#1B2A41] px-4 py-3 space-y-3'>
        <Link to="/dashboard" className='block text-base hover:text-white'  onClick={()=>setMobileToggle(false)}>Dashboard</Link>
        <Link to="/expenses" className='block text-base hover:text-white' onClick={()=>setMobileToggle(false)}>Expenses</Link>
        <Link to="/aiinsights" className='block text-base hover:text-white' onClick={()=>setMobileToggle(false)}>AI Insights</Link>
        <Link to="/summary" className='block text-base hover:text-white' onClick={()=>setMobileToggle(false)}>Summary</Link>
    </div>
  } 
</nav>
  )
}

export default Navbar
