import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
// import rightpic from '/rightpic.png';

const Home = () => {
  const { userEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight break-words">
            Welcome,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent break-words">
              {userEmail}
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Track your spending, analyze your financial habits, and gain complete
            control over your money with our modern Smart Expense Tracker.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/expenses")}
              className="bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer transition px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 w-full sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center w-full">
          <img
            src="/rightpic.png"
            alt="Finance Illustration"
            className="w-56 sm:w-72 md:w-96 lg:max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Choose Flux Expense Tracker?
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Designed to help you monitor expenses, discover spending patterns,
            and improve financial discipline effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">📊</div>

            <h3 className="text-xl font-semibold mb-2">
              Interactive Analytics
            </h3>

            <p className="text-gray-300">
              Visualize your daily and monthly spending using modern charts and summaries.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">⚡</div>

            <h3 className="text-xl font-semibold mb-2">
              Fast & Responsive
            </h3>

            <p className="text-gray-300">
              Smooth experience across desktop, tablet, and mobile devices.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">🔒</div>

            <h3 className="text-xl font-semibold mb-2">
              Secure Access
            </h3>

            <p className="text-gray-300">
              Your data is protected with JWT authentication and secure APIs.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home