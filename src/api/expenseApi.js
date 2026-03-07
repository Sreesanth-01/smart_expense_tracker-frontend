import api from "./axios"

export const getExpenses = async(page,size,sortField='amount',sortDirection='asc') =>{
    return api.get(`/expenses?page=${page}&size=${size}&sort=${sortField},${sortDirection}`);
}

export const getExpensesByCategory = async(category,page,size) =>{
    return api.get(`/expenses/category/${category}?page=${page}&size=${size}`);
}

export const getExpensesByDate = async(startDate,endDate,page,size) =>{
    return api.get(`/expenses/date-range?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
}

export const getMonthlySummary = async(month,year) =>{
    return api.get(`/expenses/summary/monthly?month=${month}&year=${year}`);
}

export const getYearlySummary = async(year) =>{
    return api.get(`/expenses/summary/yearly?year=${year}`);
}


export const addExpense = async(data) =>(
    await api.post("/expenses",data)
)

export const deleteExpense = async(id) =>(
    api.delete(`/expenses/${id}`)
)

export const updateExpense = async(id,data) =>{
    api.put(`/expenses/${id}`,data)
}

