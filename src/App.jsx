
import './App.css'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-[#0C1821] via-[#13293D] to-[#1B4965]'>
      <Navbar />
      <AppRoutes />
      <ToastContainer position='top-right' autoClose={3000} theme='dark'></ToastContainer>
    </div>
    
  )
}

export default App
