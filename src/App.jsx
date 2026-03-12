
import './App.css'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-tl from-[#000000] to-[#1B2A41]'>
      <Navbar />
      <AppRoutes />
    </div>
    
  )
}

export default App
