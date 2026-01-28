import React, { useState } from 'react'
import Input from '../components/common/Input';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!email || !password){
      alert("All fields are required");
      return;
    }
    console.log({email,password});
  }
  return (
    <div className='min-h-screen flex items-center justify center'>
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
