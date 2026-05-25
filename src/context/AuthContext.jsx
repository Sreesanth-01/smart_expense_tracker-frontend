import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [userEmail, setUserEmail] = useState("");

   useEffect(() => {

    const checkTokenExpiry = () => {

        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (!token) {
            logout();
            return;
        }

        try {

            const decoded = jwtDecode(token);

            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {

                logout();

            } else {

                setIsAuthenticated(true);

                if (email) {
                    setUserEmail(email);
                }
            }

        } catch (err) {

            logout();
        }
    };

    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 1000*60);

    return () => clearInterval(interval);

}, []);


    const login = (token,email) =>{
        localStorage.setItem("token",token);
        localStorage.setItem("email",email);
        // console.log(email);
        setIsAuthenticated(true);
        setUserEmail(email);
    }

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsAuthenticated(false);
        setUserEmail("");
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,userEmail}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
