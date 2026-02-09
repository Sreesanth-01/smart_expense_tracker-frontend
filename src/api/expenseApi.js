import api from "./axios"

export const getExpenses = () =>{
    api.get("/expenses");
}

export const addExpense = async(data) =>{
    api.post("/expenses",data);
}

export const deleteExpense = async(id) =>{
    api.delete(`/expenses/${id}`);
}

