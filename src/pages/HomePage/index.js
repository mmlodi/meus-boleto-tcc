import React ,{useEffect, useState}from 'react';
import { styled } from '@mui/material/styles';
import './index.css';
import Paper from '@mui/material/Paper';
import MonthNavigator from '../../components/MonthNavigator';
import MainTable from '../../components/MainTable';
import { Card } from '@mui/material';
import TabelaResumo from '../../components/ResumeTable';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const currentMonthRows = [
    { id: 1, mes:5, ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 2, mes:5, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 3, mes:5, ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 4, mes:5, ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 5, mes:5, ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 6, mes: 6 ,ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 7, mes: 6 ,ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 8, mes: 6 ,ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 9, mes: 6 ,ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 10, mes: 6 ,ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 11, mes: 7 ,ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 12, mes: 7 ,ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 13, mes: 7 ,ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 14, mes: 7 ,ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 15, mes: 7 ,ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 16, mes: 8,ano: 2024,nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 17, mes: 8 ,ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 18, mes: 8 ,ano: 2024,nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 19, mes: 8 ,ano: 2024,nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
    { id: 20, mes: 8 ,ano: 2024,nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 }
];





const HomePage = () => {

    const [selectedMonth, setSelectedMonth] = useState( new Date());
    const [rowToUpdated , setRowToUpdate] = useState(null);
    const [data , setData] = useState([]);

    useEffect(() =>{
        filterToMonthFields(currentMonthRows);
    },[selectedMonth])



    const filterToMonthFields =  (rows) => {
        const currentMonth = selectedMonth.getMonth();
        const updatedData = [
            {
                name: 'current',
                data: rows.filter(item => (item.mes === currentMonth))
            },
            {
                name: 'last',
                data: rows.filter(item => (item.mes === (currentMonth - 1)))
            },
            {
                name: 'next',
                data: rows.filter(item => (item.mes === (currentMonth + 1)))
            }
        ];
        console.log(updatedData);
        setData(updatedData);
    };

    function handleMonthSelect (month){
        setSelectedMonth(month);
        //console.log('Selected month:', selectedMonth);
    };

    function handleUpdateValue (value){
        updateRow(value.id, value);
    }

    const updateRow = (id, updatedFields) => {
        const updatedRows = currentMonthRows.map(row =>
            row.id === id ? { ...row, ...updatedFields } : row
        );
        setData(updatedRows);
    };
    // function generateRandomValue(min = 100, max = 1000) {
    //     return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    // }

    // const updateTransactionRows = (rows) => {
    //     return rows.map(row => ({
    //         ...row,
    //         valorTransacao: generateRandomValue(),
    //         valorOrcamento: generateRandomValue()
    //     }));
    // };

    // const updatedCurrentMonthRows = updateTransactionRows(data[0].data);
    // const updatedLastMonthRows = updateTransactionRows(data[1].data);
    // const updatedNextMonthRows = updateTransactionRows(data[2].data);

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
                    { data.length > 0 && <MainTable rows={data[1].data} onUpdateValue={handleUpdateValue}/>}
                    { data.length > 0 && <TabelaResumo  updatedRows={[]}/>}
                </div>
                <div>
                    <h3>Mês atual</h3>
                    { data.length > 0 && <MainTable rows={data[0].data} onUpdateValue={handleUpdateValue}/>}
                    { data.length > 0 &&<TabelaResumo updatedRows={[]}/>}
                </div>
                <div>
                    <h3>Mês Futuro</h3>
                    { data.length > 0 &&<MainTable rows={data[2].data} onUpdateValue={handleUpdateValue}/>}
                    { data.length > 0 &&<TabelaResumo updatedRows={[]}/>}
                </div>
            </div>
        </React.Fragment>
                        
    );

};

export default HomePage;