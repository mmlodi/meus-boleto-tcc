import React ,{useEffect, useState}from 'react';
import { styled } from '@mui/material/styles';
import './index.css';
import Paper from '@mui/material/Paper';
import MonthNavigator from '../../components/MonthNavigator';
import MainTable from '../../components/MainTable';
import { Card } from '@mui/material';
import TabelaResumo from '../../components/ResumeTable';

const HomePage = () => {

    const [selectedMonth, setSelectedMonth] = useState( new Date());
    const [currentMonthRows, setCurrentMonthRows] = useState ([
        { id: 1, mes: 5, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 2, mes: 5, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 3, mes: 5, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 4, mes: 5, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 5, mes: 5, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 6, mes: 6, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 7, mes: 6, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 8, mes: 6, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 9, mes: 6, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 10, mes: 6, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 11, mes: 7, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 12, mes: 7, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 13, mes: 7, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 14, mes: 7, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 15, mes: 7, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 16, mes: 8, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 17, mes: 8, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 18, mes: 8, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 19, mes: 8, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
        { id: 20, mes: 8, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 }
    ]);

    function handleMonthSelect (month){
        setSelectedMonth(month);
    };

    async function handleUpdateValue (value){
        updateRow(value);
    }

    const updateRow = (updatedFields) => {
        console.log("ID:", updatedFields.id, "Updated Fields:", updatedFields);
    
        const updatedRows = currentMonthRows.map(row =>
            row.id === updatedFields.id 
                ? { 
                    ...row, 
                    valorTransacao: updatedFields.valorTransacao, 
                    valorOrcamento: updatedFields.valorOrcamento 
                  } 
                : row
        );
    
        setCurrentMonthRows(updatedRows);
    };

    return (
        <React.Fragment>
            <h1>Resumo Financeiro</h1>
            <div >
                <Card>
                    <div>
                        <MonthNavigator onMonthChange={handleMonthSelect} />
                    </div>
                </Card>
            </div>
            <div className='mainDiv'>
                <div>
                    <h3>Mês passado</h3>
                    { currentMonthRows.length > 0 && <MainTable rows={currentMonthRows.filter(item => item.mes === selectedMonth.getMonth() - 1)} onUpdateValue={handleUpdateValue}/>}
                    { currentMonthRows.length > 0 && <TabelaResumo  updatedRows={currentMonthRows.filter(item => item.mes === selectedMonth.getMonth() - 1)}/>}
                </div>
                <div>
                    <h3>Mês escolhido</h3>
                    { currentMonthRows.length > 0 && <MainTable rows={currentMonthRows.filter(item => item.mes === selectedMonth.getMonth())} onUpdateValue={handleUpdateValue}/>}
                    { currentMonthRows.length > 0 &&<TabelaResumo updatedRows={currentMonthRows.filter(item => item.mes === selectedMonth.getMonth())}/>}
                </div>
                <div>
                    <h3>Mês Futuro</h3>
                    { currentMonthRows.length > 0 &&<MainTable rows={currentMonthRows.filter(item => item.mes === selectedMonth.getMonth() + 1 )} onUpdateValue={handleUpdateValue}/>}
                    { currentMonthRows.length > 0 &&<TabelaResumo updatedRows={currentMonthRows.filter(item => item.mes === selectedMonth.getMonth() + 1 )}/>}
                </div>
            </div>
        </React.Fragment>
                        
    );

};

export default HomePage;