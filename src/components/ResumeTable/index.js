import * as React from 'react';
import {formatToCurrency} from '../../utils/utils';


export default function TabelaResumo({updatedRows}) {

  
  function sumTransactionValues(rows) {
    //console.log(rows);
    const totalValorTransacao = rows.reduce((sum, row) => {
      if (row && row.valorTransacao !== null) {
        return sum + row.valorTransacao;
      }
      return sum;
    }, 0);

    const totalValorOrcamento = rows.reduce((sum, row) => {
      if (row && row.valorOrcamento !== null) {
        return sum + row.valorOrcamento;
      }
      return sum;
    }, 0);
  
    return {
      totalValorTransacao,
      totalValorOrcamento
    };
  }

  const result = sumTransactionValues(updatedRows);

  return (  
    <div>
      Ganho Renda Ativa:  {formatToCurrency(result.totalValorTransacao)} <br/>
      Ganho Renda Passiva: {formatToCurrency(result.totalValorOrcamento)} <br/>
      Gasto: 1600 <br/>
      Sobra: 2570 <br/>
    </div>
  );
}



