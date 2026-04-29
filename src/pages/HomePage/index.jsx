import React ,{useEffect, useState}from 'react';
import './index.css';
import MonthNavigator from '../../components/MonthNavigator';
import MainTable from '../../components/MainTable';
import { Card } from '@mui/material';
import TabelaResumo from '../../components/ResumeTable';
import { api } from '../../Service/backendAPI';
import useAuth from '../../hooks/useAuth';
const HomePage = () => {

    const [selectedMonth, setSelectedMonth] = useState( new Date());
    const [currentMonthRows, setCurrentMonthRows] = useState([]);
    const [newCurrentMonthRows, setNewCurrentMonthRows] = useState(currentMonthRows);
    const [ categories , setCategories ] = useState([]);
    const {user} = useAuth();


    useEffect( ()=> {
        getCategories();
        getTransation();
    },[])

    useEffect(()=>{
        console.log(selectedMonth);
        const date = new Date(selectedMonth);
        handleMonthSelect(date);
    },[currentMonthRows])

    const getCategories = async () => {
        try {
            const result = await api.get('categories/user/'+user.id);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setCategories(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const getTransation = async () => {
        try {
            const result = await api.get('transactions/user/'+user.id);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setCurrentMonthRows(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const upsertNewValue = async (body) => {
        const bodyToSend = {
                category: body.category,
                monthlyData: body.monthlyData,
                user: { id : user.id}, 
                transactionValue: body.transactionValue,
                transactionBudget: body.transactionBudget
            }
        try {
            const result = await api.post('transactions',bodyToSend);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            getTransation();
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    function handleMonthSelect (date){
        setSelectedMonth(date);    
        console.log(date)   
        const newRows = filterByMonthsAndZeroIfNotDefined(currentMonthRows, date, categories);
        setNewCurrentMonthRows(newRows);
    };

    function adjustMonth(date, months) {
        const newDate = new Date(date);
        const dayOfMonth = newDate.getDate();
    
        newDate.setMonth(newDate.getMonth() + months);
    
        // If the day of the month is now in a different month, set it to the last day of the previous month.
        if (newDate.getDate() < dayOfMonth) {
            newDate.setDate(0);
        }
    
        return newDate;
    }

    const filterByMonthsAndZeroIfNotDefined = (rows, date, categories) => {
        const currentDate = new Date(date);
        const currentYear = currentDate.getFullYear();
    
        const lastDate = adjustMonth(currentDate, -1);
    
        const nextDate = adjustMonth(currentDate, 1);
    
        const monthsToCheck = [
            { month: currentDate.getMonth() , year: currentYear },
            { month: lastDate.getMonth() , year: lastDate.getFullYear() },
            { month: nextDate.getMonth() , year: nextDate.getFullYear() }
        ];
        
        console.log(rows);
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
                        id: `${category.id}${month}${year}`,  // Generate a temporary unique ID
                        transactionName: category.categoryName,
                        category: category,
                        monthlyData: {
                            id: null,  // No specific id for monthlyData
                            month: month,
                            year: year
                        },
                        description: "No transactions for this period",
                        user: { id : 1 },  // Or default user if applicable
                        //createdAt: null,
                        //changedAt: null,
                        transactionValue: 0,
                        transactionBudget: 0
                    };
                }
            });
        });
    
        return newRows;
    };

    async function handleUpdateValue (value){
        console.log(value);
        updateRow(value);
        upsertNewValue(value);
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
            const newRow = updatedFields;
            const updatedRows = [...currentMonthRows, newRow];
            setCurrentMonthRows(updatedRows)
        }
        
        //const newRows = filterByMonthsAndZeroIfNotDefined(currentMonthRows, selectedMonth, categories);
        //setNewCurrentMonthRows(newRows);

    };


    //TODO CUIDAR COM O ANO NO FILTRO NAS LINHAS ABAIXO NÂO ESTOU FILTRANDO PELO ANO
    return (
        <div className="homePage">
            <h1>Bem vindo, {user.username}</h1>
            <h2>Resumo Financeiro</h2>
            <div className="monthNavigatorWrapper">
                <Card>
                    <div>
                        <MonthNavigator onMonthChange={handleMonthSelect} />
                    </div>
                </Card>
            </div>
            <div className='mainDiv'>
                <div className="monthPanel">
                    <h3>Mês passado</h3>
                    { newCurrentMonthRows.length > 0 && <MainTable rows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() - 1)} onUpdateValue={handleUpdateValue}/>}
                    { newCurrentMonthRows.length > 0 && <TabelaResumo  updatedRows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() - 1)}/>}
                </div>
                <div className="monthPanel">
                    <h3>Mês escolhido</h3>
                    { newCurrentMonthRows.length > 0 && <MainTable rows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth())} onUpdateValue={handleUpdateValue}/>}
                    { newCurrentMonthRows.length > 0 &&<TabelaResumo updatedRows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth())}/>}
                </div>
                <div className="monthPanel">
                    <h3>Mês Futuro</h3>
                    { newCurrentMonthRows.length > 0 &&<MainTable rows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() + 1 )} onUpdateValue={handleUpdateValue}/>}
                    { newCurrentMonthRows.length > 0 &&<TabelaResumo updatedRows={newCurrentMonthRows.filter(item => item.monthlyData.month === selectedMonth.getMonth() + 1 )}/>}
                </div>
            </div>
        </div>
                        
    );

};

export default HomePage;
