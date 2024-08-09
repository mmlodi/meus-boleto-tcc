import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error('Error while saving user: name cannot be empty.'));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    [],
  );
};

const rows = [
  { id: 1, nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 2, nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 3, nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 4, nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 5, nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
];

const columns = [
  {
    field: 'nomeTransacao',
    headerName: 'Nome da Transacao',
    width: 150,
  },
  {
    field: 'valorTransacao',
    headerName: 'Tipo',
  },

];


export default function TabelaResumo() {
  const mutateRow = useFakeMutation();

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  return (  
    <div style={{width:550}}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        rowHeight={30}
        hideFooter={true}
        hideFooterPagination={true}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
          
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}



