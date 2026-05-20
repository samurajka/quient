import React, {useState, useCallback} from 'react';

export const useChatInput = () => {
    const [message, setMessage] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    },[]);

    const clearMessage = useCallback(() => {
        setMessage('')
    },[])

    return { message, setMessage, handleChange, clearMessage}
}