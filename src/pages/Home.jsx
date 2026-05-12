import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const   Home = () => {
  const {userEmail} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1821] via-[#13293D] to-[#1B4965] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {userEmail}
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Track your spending, analyze your financial habits, and gain complete
            control over your money with our modern Smart Expense Tracker.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={()=>navigate("/expenses")} className="bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer transition px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 w-full max-w-lg flex justify-center">
          <div className="relative w-full max-w-md">

            <div className="absolute -top-8 -left-8 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="relative  rounded-3xl p-10 shadow-2xl">
              <div className="space-y-6">

                <div className="bg-[#1E293B]/70 rounded-2xl p-5 border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                    Smart Expense Tracking
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Organize your expenses efficiently and stay aware of where your money goes.
                  </p>
                </div>

                <div className="bg-[#1E293B]/70 rounded-2xl p-5 border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    Responsive & Modern
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Enjoy a seamless experience across desktop, tablet, and mobile devices.
                  </p>
                </div>

                <div className="bg-[#1E293B]/70 rounded-2xl p-5 border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">
                    Secure & Reliable
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your data stays protected with secure authentication and reliable backend APIs.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Smart Expense Tracker?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Designed to help you monitor expenses, discover spending patterns,
            and improve financial discipline effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className=" border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Interactive Analytics</h3>
            <p className="text-gray-300">
              Visualize your daily and monthly spending using modern charts and summaries.
            </p>
          </div>

          <div className=" border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Responsive</h3>
            <p className="text-gray-300">
              Smooth experience across desktop, tablet, and mobile devices.
            </p>
          </div>

          <div className=" border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:scale-105 transition duration-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
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
