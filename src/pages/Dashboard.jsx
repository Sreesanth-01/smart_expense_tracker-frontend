import React, { useEffect, useState } from 'react'
import { getCategoryWiseSummary, getDailySummary, getExpenses, getMonthlySummary, getYearlySummary } from '../api/expenseApi';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import SpendingLineChart from '../components/charts/SpendingLineChart';

const Dashboard = () => {
  const[expenses,setExpenses] = useState([]);

  const [monthlyTotal,setMonthlyTotal] = useState(0.0);
  const [monthlyTransactions,setMonthlyTransactions] = useState(0);
  const [average,setAverage] = useState(0.0);

  const [yearlyTotal,setYearlyTotal] = useState(0.0);
  const [yearlyTransactions,setYearlyTransactions] = useState(0);
  const [monthAverage,setMonthAverage] = useState(0.0);

  const [categoryData,setCategoryData] = useState({});
  const [dailySpendings,setDailySpendings] = useState([]);

  useEffect(()=>{
    fetchExpenses();
    loadMonthlySummary();
    loadYearlySummary();
    loadCategorySummary();
    loadDailySummary();
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

  const loadDailySummary = async() =>{
    try {
      const res = await getDailySummary();
      setDailySpendings(res.data);
      console.log(res.data);

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#CCC9DC] bg-[#1A1B26] min-h-screen">
  
  {/* 1. Header */}
  <header className="mb-10">
    <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left">Dashboard</h1>
  </header>

  {/* 2. Top Stats Row (Corrected spacing) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div className="p-5 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg">
      <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Expenses</h2>
      <p className="text-2xl font-bold mt-2 text-red-400">${totalAmount}</p>
    </div>
    <div className="p-5 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg">
      <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Transactions</h2>
      <p className="text-2xl font-bold mt-2 text-blue-400">{totalCount}</p>
    </div>
    <div className="p-5 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg">
      <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Monthly Total</h2>
      <p className="text-2xl font-bold mt-2 text-emerald-400">${monthlyTotal}</p>
    </div>
    <div className="p-5 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg">
      <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Daily Average</h2>
      <p className="text-2xl font-bold mt-2 text-purple-400">${average}</p>
    </div>
  </div>

  {/* 3. Charts Section (Fixed Overlap) */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    {/* Pie Chart Card */}
    <div className="p-6 bg-[#24283b] border border-[#414868] rounded-2xl shadow-xl overflow-hidden">
      <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
      <div className="h-[350px] w-full relative">
         <CategoryPieChart data={categoryData} />
      </div>
    </div>

    {/* Line Chart Card - Increased height to prevent X-Axis overlap */}
    <div className="p-6 bg-[#24283b] border border-[#414868] rounded-2xl shadow-xl overflow-hidden">
      <h3 className="text-lg font-semibold mb-6">Daily Spending Trend</h3>
      <div className="h-[350px] w-full relative">
        <SpendingLineChart data={dailySpendings} />
      </div>
    </div>
  </div>

  {/* 4. Bottom Breakdown & Summaries */}
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
    
    {/* Category List */}
    <div className="xl:col-span-1 p-6 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-[#414868]">Category Breakdown</h2>
      <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <li key={category} className="flex justify-between items-center group">
            <span className="text-gray-300 capitalize group-hover:text-white transition-colors">{category}</span>
            <span className="font-mono font-semibold text-red-400">-${amount}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Summaries Grid */}
    <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-8 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 text-indigo-300">Monthly Summary</h2>
          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Transactions</span>
              <span className="font-bold text-lg">{monthlyTransactions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Average</span>
              <span className="font-bold text-lg text-emerald-400">${average}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-[#24283b] border border-[#414868] rounded-2xl shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6 text-amber-300">Yearly Summary</h2>
          <div className="space-y-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Yearly</span>
              <span className="font-bold text-2xl text-indigo-400">${yearlyTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Yearly Trans.</span>
              <span className="font-bold text-lg">{yearlyTransactions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Average</span>
              <span className="font-bold text-lg">${monthAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Dashboard
