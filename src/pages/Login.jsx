import React, { useContext, useState } from 'react'
import Input from '../components/common/Input';
import { loginUser } from '../api/authApi';
import AuthContext from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!email || !password){
      alert("All fields are required");
      return;
    }
    console.log({email,password});

    try {
      const res = await loginUser({email,password});
      
      login(res.data.token);

      navigate("/dashboard");
      

      console.log("token",res.data.token);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Invalid credentials");
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center text-[#CCC9DC]'>
      <form onSubmit={handleSubmit}
        className='w-full max-w-sm p-6 border rounded-lg shadow-md flex flex-col gap-6'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>

        <Input label="Email" type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="you@example.com" />

        <Input label="Password" type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="••••••••" />

        <button type='submit' className='border-2 border-[#324A5F] rounded bg-[#324A5F] hover:bg-[#1b2a41] hover:cursor-pointer font-semibold'>Login</button>

      </form>
    </div>
  )
}

export default Login