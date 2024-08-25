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
    const [currentMonthRows, setCurrentMonthRows] = useState (
        [
            {
                id: 1,
                transactionName: "Mercado",
                category: {
                    id:7,
                    categoryName: "Mercado",
                    tipoCategoria: "BOLETO"
                },
                monthlyData: {
                    id: 1,
                    month: 7,
                    year: 2024
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
                id: 19,
                transactionName: "Mercado",
                category: {
                    id: 7,
                    categoryName: "Mercado",
                    tipoCategoria: "BOLETO"
                },
                monthlyData: {
                    id: 1,
                    month: 6,
                    year: 2024
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
                id: 8,
                transactionName: "Alimentação",
                category: {
                    id: 6,
                    categoryName: "Alimentação",
                    tipoCategoria: "BOLETO"
                },
                monthlyData: {
                    id: 2,
                    month: 8,
                    year: 2024
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
                transactionName: "Lazer",
                category: {
                    id: 5,
                    categoryName: "Lazer",
                    tipoCategoria: "DESPESA"
                },
                monthlyData: {
                    id: 4,
                    month: 5,
                    year: 2024
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
                    categoryName: "Academia",
                    tipoCategoria: "DESPESA"
                },
                monthlyData: {
                    id: 4,
                    month: 6,
                    year: 2024
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
                    id: 1,
                    categoryName: "Livros",
                    tipoCategoria: "INVESTIMENTO"
                },
                monthlyData: {
                    id: 5,
                    month: 6,
                    year: 2024
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
    const [newCurrentMonthRows, setNewCurrentMonthRows] = useState(currentMonthRows);
    const categories = [
        { id: 1, categoryName: "Livros", tipoCategoria: "EXPENSE" },
        { id: 2, categoryName: "Uber", tipoCategoria: "EXPENSE" },
        { id: 3, categoryName: "Gasolina", tipoCategoria: "EXPENSE" },
        { id: 4, categoryName: "Academia", tipoCategoria: "EXPENSE" },
        { id: 5, categoryName: "Lazer", tipoCategoria: "EXPENSE" },
        { id: 6, categoryName: "Alimentação", tipoCategoria: "EXPENSE" },
        { id: 7, categoryName: "Mercado", tipoCategoria: "EXPENSE" }
    ];

    function handleMonthSelect (date){
        setSelectedMonth(date);       
        const newRows = filterByMonthsAndZeroIfNotDefined(currentMonthRows, date, categories);
        setNewCurrentMonthRows(newRows);
    };

    const filterByMonthsAndZeroIfNotDefined = (rows, date, categories) => {
        const currentDate = new Date(date);
        const currentYear = currentDate.getFullYear();
    
        const lastDate = new Date(currentDate);
        lastDate.setMonth(currentDate.getMonth() - 1);
    
        const nextDate = new Date(currentDate);
        nextDate.setMonth(currentDate.getMonth() + 1);
    
        const monthsToCheck = [
            { month: currentDate.getMonth() , year: currentYear },
            { month: lastDate.getMonth() , year: lastDate.getFullYear() },
            { month: nextDate.getMonth() , year: nextDate.getFullYear() }
        ];
    
        const newRows = monthsToCheck.flatMap(({ month, year }) => {
            return categories.map(category => {
                const existingRow = rows.find(row => 
                    row.monthlyData.month === month && 
                    row.monthlyData.year === year && 
                    row.category && row.category.id === category.id
                );
                if (existingRow) {
                    return existingRow;
                } else {
                    // Create a new entry with zero values and a temporary unique ID
                    return {
                        id: `${category.id}-${month}-${year}`,  // Generate a temporary unique ID
                        transactionName: category.categoryName,
                        category: category,
                        monthlyData: {
                            id: null,  // No specific id for monthlyData
                            month: month,
                            year: year
                        },
                        description: "No transactions for this period",
                        user: null,  // Or default user if applicable
                        createdAt: null,
                        changedAt: null,
                        transactionValue: 0,
                        transactionBudget: 0
                    };
                }
            });
        });
    
        return newRows;
    };

    async function handleUpdateValue (value){
        updateRow(value);
    }

    const updateRow = (updatedFields) => {
        console.log("ID:", updatedFields.id, "Updated Fields:", updatedFields);
    
        // Check if the row with the given ID exists
        const index = currentMonthRows.findIndex(row => row.id === updatedFields.id);

        if (index !== -1) {
            // Update the existing row
            const updatedRows = currentMonthRows.map(row =>
                row.id === updatedFields.id 
                    ? { 
                        ...row, 
                        transactionValue: updatedFields.transactionValue, 
                        transactionBudget: updatedFields.transactionBudget 
                      } 
                    : row
            );
            setCurrentMonthRows(updatedRows)
        } else {
            // If the ID doesn't exist, add the new row
            const newRow = {
                id: updatedFields.id,
                transactionValue: updatedFields.transactionValue,
                transactionBudget: updatedFields.transactionBudget,
                // Add other necessary fields with default values if needed
            };
            const updatedRows = [...currentMonthRows, newRow];
            setCurrentMonthRows(updatedRows)
        }

        const newRows = filterByMonthsAndZeroIfNotDefined(currentMonthRows, selectedMonth, categories);
        setNewCurrentMonthRows(newRows);

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
                    { newCurrentMonthRows.length > 0 && <MainTable rows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() - 1)} onUpdateValue={handleUpdateValue}/>}
                    { newCurrentMonthRows.length > 0 && <TabelaResumo  updatedRows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() - 1)}/>}
                </div>
                <div>
                    <h3>Mês escolhido</h3>
                    { newCurrentMonthRows.length > 0 && <MainTable rows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth())} onUpdateValue={handleUpdateValue}/>}
                    { newCurrentMonthRows.length > 0 &&<TabelaResumo updatedRows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth())}/>}
                </div>
                <div>
                    <h3>Mês Futuro</h3>
                    { newCurrentMonthRows.length > 0 &&<MainTable rows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() + 1 )} onUpdateValue={handleUpdateValue}/>}
                    { newCurrentMonthRows.length > 0 &&<TabelaResumo updatedRows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() + 1 )}/>}
                </div>
            </div>
        </React.Fragment>
                        
    );

};

export default HomePage;