import React, { useContext, useState } from 'react'
import Input from '../components/common/Input';
import { loginUser } from '../api/authApi';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const {login} = useContext(AuthContext);

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

      console.log("token",res.data.token);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Invalid credentials");
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit}
        className='w-full max-w-sm p-6 border rounded-lg shadow-md flex flex-col gap-6'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>

        <Input label="Email" type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="you@example.com" />

        <Input label="Password" type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="••••••••" />

        <button type='submit' className='bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'>Login</button>

      </form>
    </div>
  )
}

export default Login
