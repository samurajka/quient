import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useChatInput } from '../hooks/useChatInput';

interface ChatInputFieldProps {
    onSendMessage: (message: string) => void;
}

export const ChatInputField: React.FC<ChatInputFieldProps> = ({onSendMessage}) => {
    const {message, handleChange, clearMessage} = useChatInput();

    const handleSend = () => {
        if(message.trim()) {
            onSendMessage(message);
            clearMessage();
        }
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, maxWidth: '400px'}}>
            <TextField
                label='chat'
                name='chat'
                value={message}
                onChange={handleChange}
                onKeyUp={(e) => e.key === 'Enter' && handleSend()}
            >
            </TextField>
            <Button onClick={handleSend}>
                Send
            </Button>
        </Box>
    )
}