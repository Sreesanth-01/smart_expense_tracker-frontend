import api from "./axios"

export const getExpenses = async(page,size) =>{
    return api.get(`/expenses?page=${page}&size=${size}`);
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

