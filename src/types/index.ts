export interface User {
    id: number;
    login: string;
    nick?: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: Omit<User, 'password'>;
}

export interface ApiError {
    error: string;
}

export interface AuthContextType {
    user: Omit<User, 'password'> | null;
    token: string | null;
    isLoading: boolean;
    register: (login:string, password:string) => Promise<void>;
    login: (login:string, password:string) => Promise<void>;
    logout: (token:string) => Promise<void>;
}

export interface ChatMessage {
    sender: string;
    content: string;
    timestamp: number;
    color: string | null;
}

export interface ChatContextType {
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    clearMessages: () => void;
}