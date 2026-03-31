import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [userEmail, setUserEmail] = useState("");

    // useEffect(() =>{
    //     const email = localStorage.getItem("email");
    // })


    const login = (token,email) =>{
        localStorage.setItem("token",token);
        localStorage.setItem("email",email);
        console.log(email);
        setIsAuthenticated(true);
        setUserEmail(email);
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserEmail("");
        <Navigate to="/pages/login" />
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,userEmail}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
