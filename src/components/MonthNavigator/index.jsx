import React, { useEffect, useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import './index.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const MonthNavigator = ({ onMonthChange }) => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    onMonthChange(currentDate);
  }, [currentDate]);

  const handlePrevious = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const months = [
    t('months.january'), t('months.february'), t('months.march'), t('months.april'), t('months.may'), t('months.june'),
    t('months.july'), t('months.august'), t('months.september'), t('months.october'), t('months.november'), t('months.december')
  ];

  const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

  const lastMonth = months[lastDate.getMonth()];
  const lastYear = lastDate.getFullYear();

  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const nextMonth = months[nextDate.getMonth()];
  const nextYear = nextDate.getFullYear();

  const mainCarroussel = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" margin="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Item style={{ justifyContent: "space-between" }}>
            <Button onClick={handlePrevious}>
              &lt;
            </Button>
            <div style={mainCarroussel}>
              <h2>{lastMonth} {lastYear}</h2>
              <div style={{ backgroundColor: 'grey', border: 'solid 1px', borderRadius: '10px', padding: '0 10px' }}>
                <h2>{currentMonth} {currentYear}</h2>
              </div>
              <h2>{nextMonth} {nextYear}</h2>
            </div>
            <Button onClick={handleNext}>
              &gt;
            </Button>
          </Item>
        </Grid>
      </Grid>

    </Box>
  );
};

export default MonthNavigator;
