import React, { useState } from 'react'
import Input from '../components/common/Input';
import { registerUser } from '../api/authApi';


const Register = () => {
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!form.name || !form.email || !form.password){
      alert("All fields are required");
      return;
    }
    console.log(form);

    try {
      const res = await registerUser(form);
      console.log("Registered: ",res.data);
      
    } catch (err) {
      console.error(err.response ?.data || err.message);
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center text-[#CCC9DC]'>
      <form onSubmit={handleSubmit}
        className='w-full max-w-sm p-6 border rounded-lg shadow-md flex flex-col gap-6'>
        <h1 className='text-2xl font-bold text-center'>Register</h1>

        <Input label="Name" name='name' type='text' value={form.name} onChange={handleChange} placeholder="Name" />

        <Input label="Email" name='email' type='email' value={form.email} onChange={handleChange} placeholder="you@example.com" />

        <Input label="Password" name='password' type='password' value={form.password} onChange={handleChange} placeholder="••••••••" />

        <button type='submit' className='border-2 border-[#324A5F] rounded bg-[#324A5F] hover:bg-[#1b2a41] hover:cursor-pointer font-semibold'>Register</button>

      </form>
    </div>
  )
}

export default Register
