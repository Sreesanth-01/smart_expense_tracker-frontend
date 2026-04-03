import React, { useEffect, useState } from 'react'
import { addExpense, deleteExpense, getExpenses, getExpensesByCategory, getExpensesByDate, updateExpense } from '../api/expenseApi';
import Input from '../components/common/Input';

const Expenses = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [expenses,setExpenses] = useState([]);
  const [amount,setAmount] = useState(0.0);
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState("");
  const [date,setDate] = useState("");

  const [page,setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages,setTotalPages] = useState(0);

  const [showFilters,setShowFilters] = useState(false);

  const [selectedCategory,setSelectedCategory] = useState("");
  const [sortField,setSortField] = useState("date");
  const [sortDirection,setSortDirection] = useState("Desc");

  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");

  const [updateId, setUpdateId] = useState(null);

  useEffect(()=>{
    fetchExpenses();
  },[page])

  const fetchExpenses = async() =>{
    try {
      setIsLoading(true);
      const res = await getExpenses(page,size,sortField,sortDirection);
      
      const data = res.data.data.content

      setExpenses(data);
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
          description,
          date
        }


        await updateExpense(updateId,updatedExpense);
        console.log("Update successful",{amount,category,description,date});

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
        console.log("adding expense:",{amount,category,description,date});
        await addExpense({amount,category,description,date});
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
      setDate(null);
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
    setDate(expense.date ?? date);
    setUpdateId(expense.id);
  }

  const applyFilters = async() =>{
    try {
      if(selectedCategory){
        const res = await getExpensesByCategory(selectedCategory,page,size);
        setExpenses(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        return;
      }
      else if(startDate && endDate){
        const res = await getExpensesByDate(startDate,endDate,page,size);
        setExpenses(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        return;
      }
      fetchExpenses();
    } catch (err) {
      console.error("Failed to apply filters");
    }
    finally{
      setShowFilters(false);
    }
  }
  
  return (
   <div className='w-full max-w-6xl mx-auto px-4 py-8 text-[#CCC9DC] min-h-screen'>
  <h1 className='text-3xl font-bold mb-8 text-center border-b border-[#324A5F] pb-4'>Expenses</h1>

  {/* Form Section */}
  <div className='bg-[#1B2A41]/50 p-6 rounded-2xl border border-[#324A5F] mb-8 shadow-xl'>
    <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end'>
      <div className="flex flex-col"><Input label="Amount" name="amount" type='number' value={amount} onChange={(e)=>setAmount(e.target.value)} /></div>
      <div className="flex flex-col"><Input label="Category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)} /></div>
      <div className="flex flex-col"><Input label="Description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} /></div>
      <div className="flex flex-col"><Input label="Date" name="date" value={date || ""} type='date' onChange={(e)=>setDate(e.target.value)} /></div>
      
      <button 
        type='submit' 
        className={`w-full h-[42px] rounded-lg transition-all duration-200 text-white font-bold mb-[2px] ${
          isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-[#324A5F] hover:bg-[#46607a] active:scale-95"
        }`} 
        disabled={isSubmitting}
      >
        {updateId ? "Update" : "Add Expense"}
      </button>
    </form>
  </div>

  {/* Filter Toggle */}
  <div className="flex justify-center mb-6">
    <button 
      onClick={()=>setShowFilters(!showFilters)} 
      className='flex items-center gap-2 bg-[#324A5F] hover:bg-[#46607a] text-white font-semibold px-6 py-2 rounded-full transition-all shadow-md active:scale-95'
    >
      <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
      <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
    </button>
  </div>

  {/* Filter Box */}
  {showFilters && (
    <div className='border border-[#324A5F] shadow-2xl p-6 rounded-2xl mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-br from-[#1B2A41] to-[#0a0f18] animate-in fade-in zoom-in duration-200'>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Sort By</label>
        <select value={sortField} onChange={(e)=> setSortField(e.target.value)} className='bg-[#0a0f18] border border-[#324A5F] text-[#CCC9DC] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#324A5F] outline-none'>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Direction</label>
        <select value={sortDirection} onChange={(e)=> setSortDirection(e.target.value)} className='bg-[#0a0f18] border border-[#324A5F] text-[#CCC9DC] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#324A5F] outline-none'>
          <option value="Asc">Ascending</option>
          <option value="Desc">Descending</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Category</label>
        <Input name="selectedCategory" value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} placeholder="Search category..." />
      </div>

      <div className="flex flex-col gap-2"><label className="text-xs text-gray-400 uppercase tracking-wider">Start Date</label><Input name="startDate" value={startDate} onChange={(e)=>setStartDate(e.target.value)} type='date' /></div>
      <div className="flex flex-col gap-2"><label className="text-xs text-gray-400 uppercase tracking-wider">End Date</label><Input name="endDate" value={endDate} onChange={(e)=>setEndDate(e.target.value)} type='date' /></div>

      <button onClick={applyFilters} className='h-[42px] mt-auto border-2 border-[#324A5F] rounded-lg bg-[#324A5F] hover:bg-[#46607a] text-white font-bold transition-all active:scale-95'>
        Apply Filters
      </button>
    </div>
  )}

  {/* Status Messages */}
  <div className="text-center mb-4">
    {isLoading && <p className='text-sm text-blue-400 animate-pulse'>Loading expenses...</p>}
    {errorMessage && <p className='text-sm text-red-500 bg-red-500/10 py-2 rounded-lg border border-red-500/20'>{errorMessage}</p>}
  </div>

  {/* Expenses List */}
  <div className="w-full overflow-hidden">
    <ul className='space-y-4'>
      {expenses.map((exp)=>(
        <li key={exp.id} className='bg-[#1B2A41]/30 border border-[#324A5F] rounded-xl p-4 sm:p-5 hover:bg-[#1B2A41]/50 transition-colors shadow-sm'>
          <div className='grid grid-cols-2 sm:grid-cols-6 gap-4 items-center'>
            
            <div className="col-span-1">
               <p className='text-xs text-gray-500 uppercase block sm:hidden'>Date</p>
               <p className='text-sm text-purple-400 font-mono'>{exp.date}</p>
            </div>

            <div className="col-span-1 text-right sm:text-left">
               <p className='text-xs text-gray-500 uppercase block sm:hidden'>Amount</p>
               <p className='font-bold text-lg text-white'>${exp.amount}</p>
            </div>

            <div className="col-span-1">
               <p className='text-xs text-gray-500 uppercase block sm:hidden'>Category</p>
               <span className='bg-[#324A5F]/40 px-2 py-1 rounded text-xs font-semibold text-blue-200 border border-[#324A5F]'>{exp.category}</span>
            </div>

            <div className="col-span-1 sm:col-span-1 truncate">
               <p className='text-xs text-gray-500 uppercase block sm:hidden'>Description</p>
               <p className='text-sm text-gray-400 italic'>"{exp.description || 'No desc'}"</p>
            </div>
           
            <div className='col-span-2 sm:col-span-2 flex justify-end gap-4 mt-2 sm:mt-0 border-t sm:border-t-0 border-[#324A5F] pt-3 sm:pt-0'>
              <button className='text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors' onClick={()=>handleEdit(exp)}>
                Edit
              </button>
              <button className='text-red-500 hover:text-red-400 font-medium text-sm flex items-center gap-1 transition-colors' onClick={()=>handleDelete(exp.id)}>
                Delete
              </button>
            </div>

          </div>
        </li>
      ))}
    </ul>
  </div>

  {/* Pagination */}
  <div className='flex justify-center items-center gap-6 mt-10'>
    <button 
      disabled={page===0} 
      onClick={()=>setPage(prev=>prev-1)} 
      className='px-6 py-2 border border-[#324A5F] rounded-lg bg-[#1B2A41] hover:bg-[#324A5F] disabled:opacity-30 disabled:cursor-not-allowed transition-all'
    >
      Previous
    </button>
    <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">Page {page + 1} of {totalPages || 1}</span>
    <button 
      disabled={page+1>=totalPages}  
      onClick={()=>setPage(prev=>prev+1)} 
      className='px-6 py-2 border border-[#324A5F] rounded-lg bg-[#1B2A41] hover:bg-[#324A5F] disabled:opacity-30 disabled:cursor-not-allowed transition-all'
    >
      Next
    </button>
  </div>
</div>
  )
}

export default Expenses
