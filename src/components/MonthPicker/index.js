import React, { useState } from 'react';
import './index.css';

const MonthPicker = ({ startYear, endYear, onMonthSelect }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleMonthClick = (year, month) => {
    setSelectedMonth(`${year}-${month}`);
    if (onMonthSelect) {
      onMonthSelect(`${year}-${month}`);
    }
  };

  const renderMonths = (year) => {
    return (
      <div className="months" key={year}>
        <div className="year">{year}</div>
        {months.map((month, index) => (
          <span
            key={index}
            className={selectedMonth === `${year}-${month}` ? 'active' : ''}
            onClick={() => handleMonthClick(year, month)}
          >
            {month}
          </span>
        ))}
      </div>
    );
  };

  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }

  return (
    <div className="month-picker">
      {years.map(year => renderMonths(year))}
    </div>
  );
};

export default MonthPicker;
