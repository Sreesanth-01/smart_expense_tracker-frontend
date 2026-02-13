import api from "./axios"

export const getExpenses = async() =>{
    return api.get("/expenses");
}

export const addExpense = async(data) =>(
    await api.post("/expenses",data)
)

export const deleteExpense = async(id) =>(
    api.delete(`/expenses/${id}`)
)

