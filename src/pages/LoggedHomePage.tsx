import {Container, Box, Typography, Button} from '@mui/material';
import { useAuth } from '../context/AuthContext'
import { useWebSocket } from '../hooks/useWebSocket';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoggedHomePage : React.FC = () => {
    const navigate = useNavigate();
    const {user,token, logout} = useAuth()
    const {connect} = useWebSocket()
    const [error, setError] = useState<string | null>(null);

    connect();

    const handleLogout = async () => {
        try{
            setError(null);
            const tok = token;
            await logout(tok || "");
            navigate('/login');
        }catch(err: any){
            setError(err?.response?.data?.error || 'Logout failed');
        }
    }

    return(
        <Container>
            <Typography sx={{ mt: 3}}>
                Hello, { user?.nick || user?.login }
            </Typography>
            <Button onClick={() => {navigate('/chat')}}>View Chat</Button>
            <Button onClick={() => {handleLogout();}}>Logout</Button>
        </Container>
    )
}