import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Expenses from "../pages/expenses";
import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>

            <Route path="/dashboard" element={<ProtectedRoute>
                                                <Dashboard />
                                            </ProtectedRoute>} />
                                            
            <Route path="/expenses" element={<Expenses />} />
        </Routes>
    )
}

export default AppRoutes;