import * as React from 'react';
import {formatToCurrency} from '../../utils/utils';
import './index.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


export default function TabelaResumo({updatedRows}) {

  
  function sumTransactionValues(rows) {
    console.log("RESUMO ", rows);
  
    // Initialize all totals to 0
    let totalCreditoValue = 0;
    let totalCreditoBudget = 0;
    let totalBoletoValue = 0;
    let totalBoletoBudget = 0;
  
    // Loop through each row and sum based on the "tipoCategoria"
    rows.forEach(row => {
      if (row && row.category && row.category.tipoCategoria) {
        // Check if "tipoCategoria" is "CREDITO"
        if (row.category.tipoCategoria === 'CREDITO') {
          if (row.transactionValue !== null) {
            totalCreditoValue += row.transactionValue;
          }
          if (row.transactionBudget !== null) {
            totalCreditoBudget += row.transactionBudget;
          }
        }
        
        // Check if "tipoCategoria" is "BOLETO"
        if (row.category.tipoCategoria === 'BOLETO') {
          if (row.transactionValue !== null) {
            totalBoletoValue += row.transactionValue;
          }
          if (row.transactionBudget !== null) {
            totalBoletoBudget += row.transactionBudget;
          }
        }
      }
    });
  
    // Return all the totals
    return {
      totalCreditoValue,
      totalCreditoBudget,
      totalBoletoValue,
      totalBoletoBudget
    };
  }

  const result = sumTransactionValues(updatedRows);

  const getBudgetClass = (value) => {
    return value > 0 ? 'over-budget' : 'under-budget';
  };
 

  // Calculating "LIQUIDO" values
  const liquidoGanho = result.totalCreditoValue - result.totalCreditoBudget;
  const liquidoGasto = result.totalBoletoValue - result.totalBoletoBudget;

  return (
    <TableContainer
      className="summaryTableContainer"
      component={Paper}
      sx={{
        width: '100%',
        minWidth: 0,
        overflowX: 'auto',
      }}
    >
      <Table aria-label="transaction table" size="small" sx={{ minWidth: 340 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">
              <Typography variant="button">REAL</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button">ORÇADO</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button">LIQUIDO</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* GANHO Row */}
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography variant="button">GANHO</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2">{formatToCurrency(result.totalCreditoValue)}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2">{formatToCurrency(result.totalCreditoBudget)}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2">{formatToCurrency(liquidoGanho)}</Typography>
            </TableCell>
          </TableRow>

          {/* GASTO Row */}
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography variant="button">GASTO</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2">{formatToCurrency(result.totalBoletoValue)}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2">{formatToCurrency(result.totalBoletoBudget)}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body2">{formatToCurrency(liquidoGasto)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}



