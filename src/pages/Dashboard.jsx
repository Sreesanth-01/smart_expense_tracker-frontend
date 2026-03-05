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
    <div>
      <div>
        <p>Total Amount : {totalAmount}</p>
        <p>Total Transactions : {totalCount}</p>
      </div>

        <div>
          <ul>
            {Object.entries(categoryTotals).map(([category,amount])=>(
              <li key={category}>
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
