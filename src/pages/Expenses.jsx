import React, { useEffect, useState } from 'react'
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../api/expenseApi';
import Input from '../components/common/Input';

const Expenses = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [expenses,setExpenses] = useState([]);
  const [amount,setAmount] = useState(0.0);
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState("");

  const [page,setPage] = useState(0);
  const [size] = useState(3);
  const [totalPages,setTotalPages] = useState(0);

  const [updateId, setUpdateId] = useState(null);

  useEffect(()=>{
    fetchExpenses();
  },[page])

  const fetchExpenses = async() =>{
    try {
      setIsLoading(true);
      const res = await getExpenses(page,size);
      
      // console.log("Axios Full Response:", res);
      // console.log("Your API Data:", res.data.data);
      setExpenses(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch expenses", err.message);
      setErrorMessage("Unable to fetch expenses. Please try again later.");
    }
    finally{
      setIsLoading(false);
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      setIsSubmitting(true);
      if(updateId){
        const updatedExpense = {
          id:updateId,
            amount,
          category,
          description
        }


        await updateExpense(updateId,updatedExpense);
        console.log("Update successful",{amount,category,description});

        setExpenses((prevExpenses) =>
          prevExpenses.map((exp) =>
            Number(exp.id) === Number(updateId) ? { ...exp, ...updatedExpense } : exp)
          );

        // fetchExpenses();
      }
      else{
        if(!amount || !category){
          return;
        }
        console.log("adding expense:",{amount,category,description});
        await addExpense({amount,category,description});
        fetchExpenses();
      }
    }
    catch(err){
      console.error(err);
      setErrorMessage("Something went wrong.")
    }
    finally{
      setIsSubmitting(false);
      setAmount(0.0);
      setCategory("");
      setDescription("");
      setUpdateId(null);

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

  const handleEdit = (expense) =>{
    setAmount(expense.amount ?? 0.0);
    setCategory(expense.category ?? "");
    setDescription(expense.description ?? "");
    setUpdateId(expense.id);
  }
  
  return (
    <div className='p-6 max-w-3xl mx-auto flex flex-col items-center justify-center '>
      <h1 className='text-2xl font-bold mb-6 '>Expenses</h1>
      <form onSubmit={handleSubmit} className='flex gap-4 mb-6'>
        <Input label="Amount" name="amount" type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}></Input> 
        <Input label="Category" name="category"  value={category} onChange={(e)=>setCategory(e.target.value)}></Input> 
        <Input label="Description" name="description"  value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
        <button type='submit' className={`text-white px-4 rounded ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600"}`} disabled={isSubmitting}>{updateId ? "Edit" : "Add"}</button>
      </form>

      {isLoading && <p className='text-sm text-gray-500'>Loading expenses...</p>}
      {errorMessage && <p className='text-sm text-red-800'>{errorMessage}</p>}
      <ul className='space-y-5'>
        {expenses.map((exp)=>(
          <li key={exp.id} className='flex justify-between border rounded p-5 gap-10'>
            <div>
              <p className='font-semibold'> ${exp.amount} - {exp.category} </p>
              <p className='text-sm text-gray-500'> {exp.description} </p>
            </div>
            <button className='text-blue-600' onClick={()=>handleEdit(exp)}>Edit</button>
            <button className='text-red-600' onClick={()=>handleDelete(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className='flex space-5 gap-5 mt-4'>
        <button disabled={page===0} onClick={()=>setPage(prev=>prev-1)} className='px-3 py-1 border rounded bg-gray disabled:opacity-50'>Previous</button>
        <button disabled={page+1>=totalPages}  onClick={()=>setPage(prev=>prev+1)} className='px-3 py-1 border rounded bg-gray disabled:opacity-50'>Next</button>
      </div>
      
    </div>
  )
}

export default Expenses
