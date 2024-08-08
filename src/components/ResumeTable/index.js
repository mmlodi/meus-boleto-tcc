import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nomeTransacao',
    headerName: 'nomeTransacao',
    //width: 150,
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

const rows = [
  { id: 1, nomeTransacao: 'Snow', tipoTransacao: 'Jon', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 2, nomeTransacao: 'Lannister', tipoTransacao: 'Cersei', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 3, nomeTransacao: 'Lannister', tipoTransacao: 'Jaime', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 4, nomeTransacao: 'Stark', tipoTransacao: 'Arya', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 5, nomeTransacao: 'Targaryen', tipoTransacao: 'Daenerys', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 6, nomeTransacao: 'Melisandre', tipoTransacao: null, valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 7, nomeTransacao: 'Clifford', tipoTransacao: 'Ferrara', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 8, nomeTransacao: 'Frances', tipoTransacao: 'Rossini', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 9, nomeTransacao: 'Roxie', tipoTransacao: 'Harvey', valorTransacao: 332.50, valorOrcamento: 350.60 },
];

export default function DataGridResume() {
  return (
    <Box sx={{  width: '70%', justifyContent:'right' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}