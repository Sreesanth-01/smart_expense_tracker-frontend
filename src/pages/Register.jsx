import React, { useState } from 'react'
import Input from '../components/common/Input';

const Register = () => {
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(form);
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit}
        className='w-full max-w-sm p-6 border rounded-lg shadow-md flex flex-col gap-6'>
        <h1 className='text-2xl font-bold text-center'>Register</h1>

        <Input label="Name" name='name' type='text' value={form.name} onChange={handleChange} placeholder="Name" />

        <Input label="Email" name='email' type='email' value={form.email} onChange={handleChange} placeholder="you@example.com" />

        <Input label="Password" name='password' type='password' value={form.password} onChange={handleChange} placeholder="••••••••" />

        <button type='submit' className='bg-green-600 text-white py-2 rounded-md hover:bg-green-700'>Register</button>

      </form>
    </div>
  )
}

export default Register
