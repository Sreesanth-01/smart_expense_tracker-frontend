
import './App.css'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <div className='flex flex-col items-center justify-center'>
      <Navbar />
      <AppRoutes />
    </div>
    
  )
}

export default App
