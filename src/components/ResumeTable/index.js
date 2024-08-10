import * as React from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';


const rows = [
  { id: 1, nomeTransacao: 'Total', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 2, nomeTransacao: 'Debito', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 3, nomeTransacao: 'Liquido', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
];

const columns = [
  {
    field: 'nomeTransacao',
    headerName: 'Nome da Transacao',
    width: 150,
  },
  {
    field: 'valorTransacao', 
    type: 'number', 
    headerName: 'Valor' 
  },
  {
    field: 'valorOrcamento', 
    type: 'number', 
    headerName: 'Orcado' 
  }

];


export default function TabelaResumo() {

  const [snackbar, setSnackbar] = React.useState(null);

  return (  
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        rowHeight={30}
        hideFooter={true}
        hideFooterPagination={true}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={6000}
          
        >
        </Snackbar>
      )}
    </div>
  );
}



