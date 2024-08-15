import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {formatToCurrency} from '../../utils/utils';


const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error('Erro ai salvar item:'));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    [],
  );
};



const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nomeTransacao',
    headerName: 'Category',
    width: 150,
    //editable: true,
  },
  // {
  //   field: 'tipoTransacao',
  //   headerName: 'Tipo',
  //   //width: 150,
  //   editable: true,
  // },
  {
    field: 'valorTransacao',
    headerName: 'Total Gasto',
    type: 'number',
    editable: true,
    valueFormatter: (value) =>  {
      return formatToCurrency(value);
    }
      
  },
  {
    field: 'valorOrcamento',
    headerName: 'Orcado',
    type : 'number',
    editable: true,
    valueFormatter: (value) =>  {
      return formatToCurrency(value);
    }
    //valueGetter: (value, row) => `${row.valorTransacao || ''} ${row.valorOrcamento || ''}`,
  }
];

export default function MainTable({rows, onUpdateValue}) {

  //const [rowsDataGrid, setRowsDataGrid] = React.useState(rows)

  const  mutateRow = useFakeMutation();

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      try {
        // Make the HTTP request to save in the backend
        const response = await mutateRow(newRow);
  
        // Update the parent component state
        onUpdateValue(response);
  
        setSnackbar({ children: 'Alterações salvas', severity: 'success' });
        return response;
      } catch (error) {
        handleProcessRowUpdateError(error);
        throw error; // rethrow the error to keep it bubbling up
      }
    },
    [mutateRow, onUpdateValue],
  );



  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  return (  
    <div >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        autoWidth={true}
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



