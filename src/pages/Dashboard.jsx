import React, { useEffect, useState } from 'react'
import { getExpenses } from '../api/expenseApi';

const Dashboard = () => {
  const[expenses,setExpenses] = useState([]);

  useEffect(()=>{
    fetchExpenses();
  },[])

  const fetchExpenses = async() =>{
    try{
      const res = await getExpenses(0,100);
      setExpenses(res.data.data.content);
    }
    catch(err){
      console.error(err);
    }
  }

  const totalAmount = expenses.reduce((sum,exp)=> sum+Number(exp.amount),0);

  const totalCount = expenses.length;

  const categoryTotals = expenses.reduce((acc,exp)=>{
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    console.log(acc);
    return acc;
  },{});

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
      <div className='flex gap-6 mb-8'>
        <div className='p-4 border rounded shadow'>
          <h2 className='text-gray-500'>Total Expenses</h2>
          <p className='text-xl font-bold '>${totalAmount}</p>
        </div>
        <div className='p-4 border rounded shadow'>
          <h2 className='text-gray-500'>Total Transactions</h2>
          <p className='text-xl font-bold'>{totalCount}</p>
        </div>
      </div>

        <div>
          <h2 className='text-lg font-semibold mb-4'>Category Breakdown</h2>
          <ul>
            {Object.entries(categoryTotals).map(([category,amount])=>(
              <li key={category} className='flex justify-between border-b py-2'>
                <span>{category}</span>
                <span> -${amount}</span>
              </li>
            ))}
          </ul>
          </div>
    </div>
  )
}

export default Dashboard
