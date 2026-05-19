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

            <Route path="/dashboard" element={<ProtectedRoute>
                                                <Dashboard />
                                            </ProtectedRoute>} />
                                            
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/aiinsights" element={<AI_Insights />} />
            <Route path="/home" element={<Home />} />
            
        </Routes>


    )
}

export default AppRoutes;