import React, {useState} from 'react';
import {Container, Box, Typography} from '@mui/material';
import {useNavigate, Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import { AuthForm } from '../components/AuthForm';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (loginpar: string, password: string) => {
        try{
            setError(null);
            await login(loginpar,password)
            navigate('/home');
        }catch (err: any){
            setError(err?.response?.data?.error || 'Registration failed');
        }
    };

    return(
        <Container>
            <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h4' component='h1' gutterBottom sx={{ mb: 3}}>
                    Login
                </Typography>

                <AuthForm onSubmit={handleLogin} isLoading={isLoading} error={error} isRegister={false} />

                <Typography sx={{ mt: 3}}>
                    Dont have an account?{' '}
                    <Link to="/register">
                        Register here
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}