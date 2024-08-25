import * as React from 'react';
import {formatToCurrency} from '../../utils/utils';


export default function TabelaResumo({updatedRows}) {

  
  function sumTransactionValues(rows) {
    //console.log(rows);
    const totalTransactionValue = rows.reduce((sum, row) => {
      if (row && row.transactionValue !== null) {
        return sum + row.transactionValue;
      }
      return sum;
    }, 0);

    const totalTransactionBudget = rows.reduce((sum, row) => {
      if (row && row.transactionBudget !== null) {
        return sum + row.transactionBudget;
      }
      return sum;
    }, 0);
  
    return {
      totalTransactionValue,
      totalTransactionBudget
    };
  }

  const result = sumTransactionValues(updatedRows);

  return (  
    <div>
      Total gasto:  {formatToCurrency(result.totalTransactionValue)} <br/>
      Total orçado: {formatToCurrency(result.totalTransactionBudget)} <br/>
    </div>
  );
}



