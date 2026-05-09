import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useForm } from '../hooks/useForm';

interface AuthFormProps {
    onSubmit: (login: string, password: string, nick?: string) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
    isRegister?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLoading = false, error, isRegister = false}) => {
    const {values, errors, handleChange, resetForm} = useForm({
        login: '',
        password: '',
        confirmPassword: '',
        nick: '',
    });

    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if(!values.login || ! values.password){
            setLocalError('Username and password are required');
            return;
        }

        if(isRegister && values.password != values.confirmPassword){
            setLocalError('Passwords dont match');
            return;
        }

        try{
            await onSubmit(
                values.login,
                values.password,
                values.nick || undefined,
            );
            resetForm();
        }catch(err){

        }
    };

    return(
        <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px'}}>
            {(error || localError) && <Alert severity='error'>{error || localError}</Alert>}

            <TextField
                label='Login'
                name='login'
                value={values.login}
                onChange={handleChange}
                disabled={isLoading}
                fullWidth
                required
            />

            <TextField
                label='Password'
                name='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                disabled={isLoading}
                fullWidth
                required
            />

            {isRegister && (
                <>
                    <TextField
                    label='Confirm password'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    fullWidth
                    required
                    />

                    <TextField
                        label='Display nickname'
                        name='nick'
                        value={values.nick}
                        onChange={handleChange}
                        disabled={isLoading}
                        fullWidth
                    />
                </>
            )}

            <Button type='submit' variant='contained' fullWidth disabled={isLoading}>
                {isRegister ? 'Register' : 'Login'}
            </Button>
        </Box>
    );
};