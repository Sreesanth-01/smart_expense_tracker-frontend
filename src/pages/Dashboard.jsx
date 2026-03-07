import React, { useEffect, useState } from 'react'
import { getCategoryWiseSummary, getExpenses, getMonthlySummary, getYearlySummary } from '../api/expenseApi';
import CategoryPieChart from '../components/charts/CategoryPieChart';

const Dashboard = () => {
  const[expenses,setExpenses] = useState([]);

  const [monthlyTotal,setMonthlyTotal] = useState(0.0);
  const [monthlyTransactions,setMonthlyTransactions] = useState(0);
  const [average,setAverage] = useState(0.0);

  const [yearlyTotal,setYearlyTotal] = useState(0.0);
  const [yearlyTransactions,setYearlyTransactions] = useState(0);
  const [monthAverage,setMonthAverage] = useState(0.0);

  const [categoryData,setCategoryData] = useState({});

  useEffect(()=>{
    fetchExpenses();
    loadMonthlySummary();
    loadYearlySummary();
    loadCategorySummary();
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

  const loadMonthlySummary = async() =>{
    try {
      const res = await getMonthlySummary(3,2026);
      const {totalAmount,totalTransactions,dailyAverage} = res.data;
      setMonthlyTotal(totalAmount);
      setMonthlyTransactions(totalTransactions);
      const rounded = dailyAverage.toFixed(2);
      const num = parseFloat(rounded);
      setAverage(num);

    } catch (err) {
      console.error(err);
    }    
  }

  const loadYearlySummary = async() =>{
    try {
      const res = await getYearlySummary(2026);
      const {totalAmount,totalTransactions,monthlyAverage} = res.data;
      setYearlyTotal(totalAmount);
      setYearlyTransactions(totalTransactions);
      const rounded = monthlyAverage.toFixed(2);
      const num = parseFloat(rounded);
      setMonthAverage(num);

    } catch (error) {
      
    }
  }

  const loadCategorySummary = async() =>{
    try {
      const res = await getCategoryWiseSummary();
      setCategoryData(res.data);
      console.log(res.data);

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
      <div className='p-5'>
        <CategoryPieChart data={categoryData}></CategoryPieChart>
      </div>
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
          
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <h1 className='text-lg font-semibold mb-4 py-5'>Monthly Summary</h1>
              <div className='p-4 border rounded shadow'>
                <h2 className='text-gray-500'>Monthly Expense</h2>
                <p className='text-xl font-bold'>${monthlyTotal}</p>
              </div>
              <div className='p-4 border rounded shadow'>
                <h2 className='text-gray-500'>Total Monthly Transactions</h2>
                <p className='text-xl font-bold'>{monthlyTransactions}</p>
              </div>
              <div className='p-4 border rounded shadow'>
                <h2 className='text-gray-500'>Daily Average</h2>
                <p className='text-xl font-bold'>${average}</p>
              </div>
            </div>
            <div>
              <h1 className='text-lg font-semibold mb-4 py-5'>Yearly Summary</h1>
              <div className='p-4 border rounded shadow'>
                <h2 className='text-gray-500'>Yearly Expense</h2>
                <p className='text-xl font-bold'>${yearlyTotal}</p>
              </div>
              <div className='p-4 border rounded shadow'>
                <h2 className='text-gray-500'>Total Yearly Transactions</h2>
                <p className='text-xl font-bold'>{yearlyTransactions}</p>
              </div>
              <div className='p-4 border rounded shadow'>
                <h2 className='text-gray-500'>Monthly Average</h2>
                <p className='text-xl font-bold'>${monthAverage}</p>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Dashboard
