import React from 'react';
import DataGridDemo from '../../components/MainTable';
import { Container } from '@mui/material';


const HomePage = () => {
    return (
        <Container>
            <div>
                <h1>MeusBoleto</h1>

                <DataGridDemo/>
            </div>

        </Container>
    );

};

export default HomePage;