import {Container, Box, Typography} from '@mui/material';
import { useAuth } from '../context/AuthContext'

export const LoggedHomePage : React.FC = () => {
    const {user} = useAuth()

    return(
        <Container>
            <Typography sx={{ mt: 3}}>
                Hello, { user?.nick || user?.login }
            </Typography>
        </Container>
    )
}