import React, { createContext, useContext, useState, useCallback } from 'react';
import { type ChatMessage, type ChatContextType } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const addMessage = useCallback((message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    },
    []
    )

    const clearMessages = useCallback(() => {
        setMessages([]);
    },
    []
    )

    return (
        <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if(!context){
        throw new Error('useChat must be used within ChatProvider');
    }
    return context;
}