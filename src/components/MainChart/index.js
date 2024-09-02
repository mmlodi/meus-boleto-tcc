import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { MenuItem, Stack, TextField } from '@mui/material';
import { Category } from '@mui/icons-material';

const uData = [40000, 45000, 500, 5500, 6000, 6100, 233];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const yData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const tData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = {data: [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'],
  scaleType: 'band', 
  d: 'axis1' 
}
const getSeries = ({ hasNegativeValue, stackOffset }) => [
  {
    label: 'A',
    data: [125, 450, 492, 625],
    stack: 'total',
    stackOffset,
  },
  {
    label: 'B',
    data: [50, hasNegativeValue ? -150 : 150, 203, 620],
    stack: 'total',
  },
  {
    label: 'C',
    data: [134, 215, 342, 402].map((y) => (hasNegativeValue ? -y : y)),
    stack: 'total',
  },
  {
    label: 'D',
    data: [315, 421, 289, 321].map((y) => (hasNegativeValue ? -y : y)),
    stack: 'total',
  },
];

export default function GlobalBarChart({Xvalues, Yvalues}) {
  const [selectedYear, setSelectedYear] = React.useState('2024');
  const [salamaleico, setSalamaleiro] = React.useState([])
  const [colorY, setColorY] = React.useState('None');
  const array = [];

  React.useEffect(()=>{

    const result = Xvalues.reduce((acc, curr) => {
      const categoryName = curr.category.categoryName;
      const month = curr.monthlyData.month;
      const transactionValue = curr.transactionValue;
  
      // Find or create the category entry
      let category = acc.find(item => item.categoryName === categoryName);
      if (!category) {
          category = {
              id: `series-${categoryName}`,
              categoryName,
              label: categoryName,
              data : Array(12).fill(0),
              stack: 'total',
          };
          acc.push(category);
      }
  
      // Update the transaction value for the specific month (note: month-1 for zero-based index)
      category.data[month - 1] += transactionValue;
  
      return acc;
    }, []);
    // Yvalues.forEach(category => {
    //   const groupedData = {
    //     data: [],
    //     label: category.categoryName,
    //     id: category.id,
    //     stack: 'total'
    //   };
  
    //   const filteredTransaction = Xvalues
    //     .filter(transaction => transaction.category.id === category.id)
    //     //.map(transaction => transaction.transactionValue);
    //     .map(transaction =>({
    //       value: transaction.transactionValue,
    //       budget: transaction.transactionBudget,
    //       month: transaction.monthlyData.month,
    //       year: transaction.monthlyData.year
    //     })); // Extract transactionValue
  
    //   groupedData.data = filteredTransaction;
    //   array.push(groupedData);
    // });
    setSalamaleiro(result);
  },[])



  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
      {/* <Stack direction="row" spacing={1}>
        <TextField
          select
          sx={{ minWidth: 150 }}
          label="Ano"
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
        >
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2025">2025</MenuItem>
        </TextField>
      </Stack> */}
      <BarChart
        height={400}
        width={700}
        series={salamaleico}
        //xAxis={[{ data: xLabels, scaleType: 'band' }]}
        xAxis={[
          {
            scaleType: 'band',
            data: xLabels.data,
            //valueFormatter: (value) => value,
            // colorMap:
            //   (colorX === 'ordinal' && {
            //     type: 'ordinal',
            //     colors: [
            //       '#ccebc5',
            //       '#a8ddb5',
            //       '#7bccc4',
            //       '#4eb3d3',
            //       '#2b8cbe',
            //       '#08589e',
            //     ],
            //   }) ||
            //   (colorX === 'continuous' && {
            //     type: 'continuous',
            //     min: 0,
            //     max: 10000,
            //     color: ['green', 'orange'],
            //   }) ||
            //   (colorX === 'piecewise' && {
            //     type: 'piecewise',
            //     thresholds: [0, 50000],
            //     colors: ['blue', 'red', 'blue'],
            //   }) ||
            //   undefined,
          },
        ]}
        yAxis={[
          {
            colorMap:
              (colorY === 'continuous' && {
                type: 'continuous',
                min: 0,
                max: 50000,
                color: ['red', 'green'],
              }) ||
              (colorY === 'piecewise' && {
                type: 'piecewise',
                thresholds: [0],
                colors: ['red', 'green'],
              }) ||
              undefined,
          },
        ]}
      />
    </Stack>

  );
}
