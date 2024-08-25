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
    // const [currentMonthRows, setCurrentMonthRows] = useState ([
    //     { id: 1, mes: 5, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 2, mes: 5, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 3, mes: 5, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 4, mes: 5, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 5, mes: 5, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 6, mes: 6, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 7, mes: 6, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 8, mes: 6, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 9, mes: 6, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 10, mes: 6, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 11, mes: 7, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 12, mes: 7, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 13, mes: 7, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 14, mes: 7, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 15, mes: 7, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 16, mes: 8, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 17, mes: 8, ano: 2024,nomeTransacao: 'Gasolina', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 18, mes: 8, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 19, mes: 8, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    //     { id: 20, mes: 8, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 }
    // ]);

    const [currentMonthRows, setCurrentMonthRows] = useState (
        [
            {
                id: 1,
                transactionName: "Refeicao",
                category: null,
                monthlyData: {
                    id: 1,
                    month: 1,
                    year: 2020
                },
                description: "Almoço no restaurante",
                user: {
                    id: 1,
                    userName: "john_doe",
                    createdAt: "2024-08-18T00:00:00.000+00:00",
                    email: "john.doe@example.com"
                },
                createdAt: "2024-05-01T12:00:00.000+00:00",
                changedAt: "2024-05-01T12:00:00.000+00:00",
                transactionValue: null,
                transactionBudget: null
            },
            {
                id: 2,
                transactionName: "Gasolina",
                category: {
                    id: 1,
                    categoryName: "Mercado",
                    tipoCategoria: "BOLETO"
                },
                monthlyData: {
                    id: 1,
                    month: 1,
                    year: 2020
                },
                description: "soma de todos os abastecimentos no mes",
                user: {
                    id: 1,
                    userName: "john_doe",
                    createdAt: "2024-08-18T00:00:00.000+00:00",
                    email: "john.doe@example.com"
                },
                createdAt: "2024-05-01T12:00:00.000+00:00",
                changedAt: "2024-05-01T12:00:00.000+00:00",
                transactionValue: null,
                transactionBudget: null
            },
            {
                id: 3,
                transactionName: "Mercado",
                category: {
                    id: 2,
                    categoryName: "Alimentação",
                    tipoCategoria: "DESPESA"
                },
                monthlyData: {
                    id: 2,
                    month: 2,
                    year: 2020
                },
                description: "Compras do mês no supermercado",
                user: {
                    id: 1,
                    userName: "john_doe",
                    createdAt: "2024-08-18T00:00:00.000+00:00",
                    email: "john.doe@example.com"
                },
                createdAt: "2024-06-01T10:00:00.000+00:00",
                changedAt: "2024-06-01T10:00:00.000+00:00",
                transactionValue: 450.75,
                transactionBudget: 500.00
            },
            {
                id: 4,
                transactionName: "Cinema",
                category: {
                    id: 3,
                    categoryName: "Lazer",
                    tipoCategoria: "DESPESA"
                },
                monthlyData: {
                    id: 3,
                    month: 3,
                    year: 2020
                },
                description: "Sessão de cinema com amigos",
                user: {
                    id: 1,
                    userName: "john_doe",
                    createdAt: "2024-08-18T00:00:00.000+00:00",
                    email: "john.doe@example.com"
                },
                createdAt: "2024-07-01T14:00:00.000+00:00",
                changedAt: "2024-07-01T14:00:00.000+00:00",
                transactionValue: 120.00,
                transactionBudget: 150.00
            },
            {
                id: 5,
                transactionName: "Academia",
                category: {
                    id: 4,
                    categoryName: "Saúde",
                    tipoCategoria: "DESPESA"
                },
                monthlyData: {
                    id: 4,
                    month: 4,
                    year: 2020
                },
                description: "Mensalidade da academia",
                user: {
                    id: 1,
                    userName: "john_doe",
                    createdAt: "2024-08-18T00:00:00.000+00:00",
                    email: "john.doe@example.com"
                },
                createdAt: "2024-08-01T07:00:00.000+00:00",
                changedAt: "2024-08-01T07:00:00.000+00:00",
                transactionValue: 90.00,
                transactionBudget: 100.00
            },
            {
                id: 6,
                transactionName: "Livros",
                category: {
                    id: 5,
                    categoryName: "Educação",
                    tipoCategoria: "INVESTIMENTO"
                },
                monthlyData: {
                    id: 5,
                    month: 5,
                    year: 2020
                },
                description: "Compra de livros para o curso",
                user: {
                    id: 1,
                    userName: "john_doe",
                    createdAt: "2024-08-18T00:00:00.000+00:00",
                    email: "john.doe@example.com"
                },
                createdAt: "2024-09-01T09:30:00.000+00:00",
                changedAt: "2024-09-01T09:30:00.000+00:00",
                transactionValue: null,
                transactionBudget: null
            }
        ]
    );


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
                    transactionValue: updatedFields.transactionValue, 
                    transactionBudget: updatedFields.transactionBudget 
                  } 
                : row
        );
    
        setCurrentMonthRows(updatedRows);
    };

    //TODO CUIDAR COM O ANO NO FILTRO NAS LINHAS ABAIXO NÂO ESTOU FILTRANDO PELO ANO
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
                    { currentMonthRows.length > 0 && <MainTable rows={currentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() - 1)} onUpdateValue={handleUpdateValue}/>}
                    { currentMonthRows.length > 0 && <TabelaResumo  updatedRows={currentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() - 1)}/>}
                </div>
                <div>
                    <h3>Mês escolhido</h3>
                    { currentMonthRows.length > 0 && <MainTable rows={currentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth())} onUpdateValue={handleUpdateValue}/>}
                    { currentMonthRows.length > 0 &&<TabelaResumo updatedRows={currentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth())}/>}
                </div>
                <div>
                    <h3>Mês Futuro</h3>
                    { currentMonthRows.length > 0 &&<MainTable rows={currentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() + 1 )} onUpdateValue={handleUpdateValue}/>}
                    { currentMonthRows.length > 0 &&<TabelaResumo updatedRows={currentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() + 1 )}/>}
                </div>
            </div>
        </React.Fragment>
                        
    );

};

export default HomePage;