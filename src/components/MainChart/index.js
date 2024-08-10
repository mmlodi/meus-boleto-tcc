import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [40000, 45000, 50000, 55000, 60000, 61000, 62000,];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const yData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const tData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export default function StackedBarChart() {
  return (
    <BarChart
      series={[
        { data: pData, label: 'Investimento Bradesco', id: 'pvId', stack: 'total' },
        { data: uData, label: 'Poupanca', id: 'uvId', stack: 'total' },
        { data: yData, label: 'VGBL', id: 'yvId', stack: 'total' },
        { data: tData, label: 'Conta corrente', id: 'tvId', stack: 'total' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
