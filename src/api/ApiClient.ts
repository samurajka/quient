import axios, {type AxiosInstance} from 'axios'
import { type User, type AuthResponse} from '../types'

const API_URL = "https://srv.quary.cz/api";

class ApiClient {
    private client: AxiosInstance;

    constructor(){
        this.client = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.request.use((config)=>{
            const token = localStorage.getItem('token');
            const publicEndpoints = ['/auth/register', '/auth/login', '/auth/logout'];
            if(token && !publicEndpoints.some(endpoint => config.url?.includes(endpoint))){
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    async register(login: string, password: string): Promise<AuthResponse>{
        const response = await this.client.post<AuthResponse>('/auth/register', {
            login,
            password,
        });
        return response.data;
    }

    async login(login: string, password: string): Promise<AuthResponse>{
        const response = await this.client.post<AuthResponse>('/auth/login',{
            login,
            password
        });
        return response.data;
    }

    async logout(token: string): Promise<AuthResponse>{
        const response = await this.client.post<AuthResponse>('/auth/logout',{token});
        return response.data;
    }
}

export const apiClient = new ApiClient();