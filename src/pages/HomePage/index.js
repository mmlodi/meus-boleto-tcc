import React from 'react';
import { styled } from '@mui/material/styles';
import './index.css';
import Paper from '@mui/material/Paper';
import DataGridMain from '../../components/MainTable';
import MonthNavigator from '../../components/MonthNavigator';
import ServerSidePersistence from '../../components/MainTable_V2';
import { Card } from '@mui/material';
import TabelaResumo from '../../components/ResumeTable';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const HomePage = () => {
    return (
        <React.Fragment>
            <h1>Resumo Financeiro</h1>
            <div >
                <Card>
                    <div>
                        <MonthNavigator/>
                    </div>
                    <div style={{margin:'10px'}}>
                        <TabelaResumo/>
                    </div>
                </Card>
            </div>
            <div className='mainDiv'>
                <div>
                    <h3>Mês passado</h3>
                    <ServerSidePersistence/>
                </div>
                <div>
                    <h3>Mês atual</h3>
                    <ServerSidePersistence/>
                </div>
            </div>
        </React.Fragment>
                        
    );

};

export default HomePage;