import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import ProtectedRoute from "./ProtectedRoute";
import AI_Insights from "../pages/AI_Insights";
import Home from "../pages/Home";


const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>

            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                                            
            <Route path="/expenses" element={<ProtectedRoute> <Expenses /> </ProtectedRoute>} />
            <Route path="/aiinsights" element={<ProtectedRoute> <AI_Insights /> </ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            
        </Routes>


    )
}

export default AppRoutes;