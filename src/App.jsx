
import './App.css'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-[#0C1821] via-[#13293D] to-[#1B4965]'>
      <Navbar />
      <AppRoutes />
    </div>
    
  )
}

export default App
