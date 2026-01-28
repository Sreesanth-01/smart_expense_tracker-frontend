import React from 'react'

const Input = ({label,name,type="text",value,onChange,placeholder}) => {
  return (
    <div>
        <label className='text-sm font-medium'>{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
                className='w-full border rounded-md px-3 py-2 focus:outline-none'  />
    </div>
  )
}

export default Input
