import React, { useState } from 'react'
import Input from '../components/common/Input';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log({email,password});
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <Input label="Email" type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="you@example.com" />

        <Input label="Password" type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="••••••••" />

        <button type='submit'>Login</button>

      </form>
    </div>
  )
}

export default Login
