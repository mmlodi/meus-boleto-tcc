import React, { useState } from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';




const MonthNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastDate, setLastDate] = useState( new Date(currentDate.getFullYear(),currentDate.getMonth()-1 ));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display:'flex',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  }));

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handlePrevious = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });

    setLastDate(prevDate => {
      const lastDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return lastDate;
    })
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
    
    setLastDate( prevDate => {
      const lastDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return lastDate;
    })
  };

  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const lastMonth = months[lastDate.getMonth()];
  const lastYear = lastDate.getFullYear();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" margin="20px">
      <Grid container spacing={3}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8} >
          <Item style={{justifyContent:"space-between"}} justifyContent="space-between"> 
            <Button onClick={handlePrevious}>
              &lt;
            </Button>
            <Typography style={{ margin: '0 20px',display:'flex',justifyContent:'space-between', width:'30vh'}}>
              <h4>{currentMonth} {currentYear}</h4>
              <h4>|</h4>
              <h4>{lastMonth} {lastYear}</h4>
            </Typography>
            <Button onClick={handleNext}>
              &gt;
            </Button>
          </Item>
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>
     
    </Box>
  );
};

export default MonthNavigator;
