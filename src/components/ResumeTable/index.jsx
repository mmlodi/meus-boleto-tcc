import * as React from 'react';
import { formatToCurrency } from '../../utils/utils';
import './index.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TabelaResumo({ updatedRows }) {
  const { t } = useTranslation();

  function sumTransactionValues(rows) {

    let totalCreditoValue = 0;
    let totalCreditoBudget = 0;
    let totalBoletoValue = 0;
    let totalBoletoBudget = 0;

    rows.forEach(row => {
      if (row && row.category && row.category.tipoCategoria) {
        if (row.category.tipoCategoria === 'CREDITO') {
          if (row.transactionValue !== null) {
            totalCreditoValue += row.transactionValue;
          }
          if (row.transactionBudget !== null) {
            totalCreditoBudget += row.transactionBudget;
          }
        }

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

    return {
      totalCreditoValue,
      totalCreditoBudget,
      totalBoletoValue,
      totalBoletoBudget
    };
  }

  const result = sumTransactionValues(updatedRows);

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
              <Typography variant="button">{t('summaryTable.real')}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button">{t('summaryTable.budget')}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button">{t('summaryTable.net')}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography variant="button">{t('summaryTable.income')}</Typography>
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

          <TableRow>
            <TableCell component="th" scope="row">
              <Typography variant="button">{t('summaryTable.expense')}</Typography>
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
