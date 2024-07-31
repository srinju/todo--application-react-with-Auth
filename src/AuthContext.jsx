import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [token,setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const login = async (username , password , navigate) => {
        try {
            const response = await axios.post("http://localhost:3000/login" , {username,password});
            const {token} = response.data; //destructures the token from the response 
            localStorage.setItem('token',token); //saves the token in local storage
            setToken(token); //updates the state with the new token
            navigate('/home');
        } catch(error) {
            console.error('login failed' , error);
        }
    };

    const signup = async (username , password , navigate) => {
        try{
            const response = await axios.post("http://localhost:3000/signup" , {username,password});
            const {token} = response.data;
            localStorage.setItem('token',token);
            setToken(token);
            navigate('/home');
        } catch(error) {
            console.error('signup failed' , error);
        }
    };

    const logout = (navigate) => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{token , login , signup , logout}}>
                {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
};

