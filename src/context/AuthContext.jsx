import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated,setIsAuthenticated] = useState(!!localStorage.getItem("token"));


    const login = (token) =>{
        localStorage.setItem("token",token);
        setIsAuthenticated(true);
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        <Navigate to="/login" />
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
