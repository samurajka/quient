import type React from 'react';
import {useChat} from '../context/ChatContext';
import { useEffect, useRef } from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';

export const ChatPage: React.FC = () => {
    const { messages } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    };

    useEffect(() => {
        scrollToBottom();
    }, 
    [messages]
    );

    return (
        <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ felx: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 2, py: 2}}>
                {messages.map((message, index) => (
                    <Paper key={index} sx={{ p:2, borderLeft: `4px solid ${message.color}`, backgroundColor: '#f5f5f5'}}>
                        <Typography variant='subtitle2' sx={{ fontWeight: 'bold', color: message.color}}>
                            {message.sender}
                        </Typography>
                        <Typography variant='body2' sx={{ mt: 0.5}}>
                            {message.content}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999', mt: 1, display: 'block'}}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </Typography>
                    </Paper>
                ))}    
                <div ref={messagesEndRef} />
            </Box>
        </Container>
    );
}