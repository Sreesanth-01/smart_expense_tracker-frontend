import React from 'react'

const Input = ({label,type="text",value,onChange,placeholder}) => {
  return (
    <div>
        <label className='text-sm font-medium'>{label}</label>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
                className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
    </div>
  )
}

export default Input
