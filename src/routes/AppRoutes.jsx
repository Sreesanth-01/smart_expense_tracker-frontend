import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Expenses from "../pages/expenses";
import ProtectedRoute from "./ProtectedRoute";
import AI_Insights from "../pages/AI_Insights";
import Summary from "../pages/Summary";


const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>

            <Route path="/dashboard" element={<ProtectedRoute>
                                                <Dashboard />
                                            </ProtectedRoute>} />
                                            
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/aiinsights" element={<AI_Insights />} />
            <Route path="/summary" element={<Summary />} />
            
        </Routes>


    )
}

export default AppRoutes;