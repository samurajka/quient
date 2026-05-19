import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import { apiClient } from "../api/ApiClient";
import { type User, type AuthContextType} from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if(storedToken && storedUser){
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    },
    []
    );

    const register = useCallback(async (login: string, password: string) => {
        setIsLoading(true);
        try{
            const response = await apiClient.register(login,password);
            setToken(response.token);
            setUser(response.user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }catch(error){
            console.error('Registration failed:', error);
            throw error
        }finally{
            setIsLoading(false);
        }
    },
    []
    );

    const login = useCallback(async (login: string, password: string) => {
        setIsLoading(true);
        try{
            const response = await apiClient.login(login,password);
            setToken(response.token)
            setUser(response.user)
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }catch(error){
            console.error('Login failed', error)
            throw error
        }finally{
            setIsLoading(false);
        }
    },
    []
    )

    const logout = useCallback(async (token: string) => {
        try{
            const response = await apiClient.logout(token);
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }catch(error){
            console.error("", error);
        }
    },
    []
    )

    return(
        <AuthContext.Provider value={{ user, token, isLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}