import React, {useState} from 'react';
import {Container, Box, Typography} from '@mui/material';
import {useNavigate, Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import { AuthForm } from '../components/AuthForm';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, isLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (login: string, password: string, nick?: string) => {
        try{
            setError(null);
            await register(login, password);
            navigate('/');
        }catch (err: any){
            setError(err?.response?.data?.error || 'Registration failed');
        }
    };

    return(
        <Container>
            <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h4' component='h1' gutterBottom sx={{ mb: 3}}>
                    Register
                </Typography>

                <AuthForm onSubmit={handleRegister} isLoading={isLoading} error={error} isRegister={true} />

                <Typography sx={{ mt: 3}}>
                    Already have an account?{' '}
                    <Link to="/">
                        Login here
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}