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
      console.log("Axios Full Response:", res); // <--- LOOK AT THIS IN CONSOLE
      console.log("Your API Data:", res.data.data);
      setExpenses(res.data.data.content);
    } catch (err) {
      console.error("Failed to fetch expenses", err.message);
    }
  }

  const handleAddExpense = async(e) =>{
    e.preventDefault();

    if(!amount || !category){
      return true;
    }
    try {
      await addExpense({amount,category,description});
      setAmount("");
      setCategory("");
      setDescription("");
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async(id) =>{
    e.preventDefault();
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className='p-6 max-w-3xl mx-auto flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-6 '>Expenses</h1>
      <form onSubmit={handleAddExpense} className='flex gap-4 mb-6'>
        <Input label="Amount" name="amount"type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}></Input> 
        <Input label="Category" name="category"  value={category} onChange={(e)=>setCategory(e.target.value)}></Input> 
        <Input label="Description" name="description"  value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
        <button type='submit' className='text-white bg-gray-600 px-4 rounded'>Add</button>
      </form>

      <ul>
        {expenses.map((exp)=>(
          <li key={exp.id}>
            <div>
              <p> ${exp.amount} - {exp.category} </p>
              <p> {exp.description} </p>
            </div>
            <button onClick={()=>handleDelete(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Expenses
