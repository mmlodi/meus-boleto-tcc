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
// const rows = [
//   {
//     id: 1,
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 4,
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 5,
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];
const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nomeTransacao',
    headerName: 'Nome da Transacao',
    width: 150,
    editable: true,
  },
  {
    field: 'tipoTransacao',
    headerName: 'Tipo',
    //width: 150,
    editable: true,
  },
  {
    field: 'valorTransacao',
    headerName: 'Total Gasto',
    type: 'number',
    //width: 110,
    editable: true,
  },
  {
    field: 'valorOrcamento',
    headerName: 'Orçado',
    description: 'This column has a value getter and is not sortable.',
    type : 'number',
    sortable: false,
    //width: 160,
    valueGetter: (value, row) => `${row.valorTransacao || ''} ${row.valorOrcamento || ''}`,
  },
];
// const columns = [
//   { field: 'name', 
//     headerName: 'Name', 
//     editable: true },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     editable: true,
//     align: 'left',
//     headerAlign: 'left',
//   },
//   {
//     field: 'dateCreated',
//     headerName: 'Date Created',
//     type: 'date',
//     editable: true,
//   },
//   {
//     field: 'lastLogin',
//     headerName: 'Last Login',
//     type: 'dateTime',
//     width: 150,
//     editable: true,
//   },
// ];


export default function ServerSidePersistence() {
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



