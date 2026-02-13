import React, { useEffect, useState } from 'react'
import { addExpense, deleteExpense, getExpenses } from '../api/expenseApi';
import Input from '../components/common/Input';

const Expenses = () => {
  const [expenses,setExpenses] = useState([]);
  const [amount,setAmount] = useState(0.0);
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState("");

  useEffect(()=>{
    fetchExpenses();
  },[])

  const fetchExpenses = async() =>{
    try {
      const res = await getExpenses();
      // console.log("Axios Full Response:", res);
      // console.log("Your API Data:", res.data.data);
      setExpenses(res.data.data.content);
    } catch (err) {
      console.error("Failed to fetch expenses", err.message);
    }
  }

  const handleAddExpense = async(e) =>{
    e.preventDefault();

    if(!amount || !category){
      return;
    }
    try {
      console.log("adding expense:",{amount,category,description});
      await addExpense({amount,category,description});
      setAmount("");
      setCategory("");
      setDescription("");
      fetchExpenses();
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleDelete = async(id) =>{
    try {
      await deleteExpense(id);
      console.log("deleted expense id:",id);
      fetchExpenses();
    } catch (err) {
      console.error(err.message);
    }
  }
  
  return (
    <div className='p-6 max-w-3xl mx-auto flex flex-col items-center justify-center '>
      <h1 className='text-2xl font-bold mb-6 '>Expenses</h1>
      <form onSubmit={handleAddExpense} className='flex gap-4 mb-6'>
        <Input label="Amount" name="amount" type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}></Input> 
        <Input label="Category" name="category"  value={category} onChange={(e)=>setCategory(e.target.value)}></Input> 
        <Input label="Description" name="description"  value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
        <button type='submit' className='text-white bg-gray-600 px-4 rounded'>Add</button>
      </form>

      <ul className='space-y-5'>
        {expenses.map((exp)=>(
          <li key={exp.id} className='flex justify-between border rounded p-5 gap-10'>
            <div>
              <p className='font-semibold'> ${exp.amount} - {exp.category} </p>
              <p className='text-sm text-gray-500'> {exp.description} </p>
            </div>
            <button className='text-red-600' onClick={()=>handleDelete(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Expenses
