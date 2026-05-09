import React from 'react';
import {Container, Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export const HomePage: React.FC = () =>{


    return(
        <Container>
            <Link to="/register">
                Register
            </Link>
        </Container>
    )
}