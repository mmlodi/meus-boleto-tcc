import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton,TextField } from '@mui/material';



const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nomeTransacao',
    headerName: 'Nome da Transacao',
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

const initialRows = [
  { id: 1, nomeTransacao: 'Refeicao', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 2, nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 3, nomeTransacao: 'Mercado', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 4, nomeTransacao: 'Lazer', tipoTransacao: 'Gasto', valorTransacao: 332.50, valorOrcamento: 350.60 },
  { id: 5, nomeTransacao: 'Investimento', tipoTransacao: 'Investimento', valorTransacao: 332.50, valorOrcamento: 350.60 },
];

export default function DataGridMain() {

  const [rows, setRows] = useState(initialRows);
  const [editIdx, setEditIdx] = useState(null);
  const [editField, setEditField] = useState('');

  const handleEditClick = (idx, field) => {
    setEditIdx(idx);
    setEditField(field);
  };

  const handleSaveClick = () => {
    setEditIdx(null);
    setEditField('');
  };

  const handleChange = (e, field, idx) => {
    const { value } = e.target;
    const updatedRows = rows.map((row, i) => (i === idx ? { ...row, [field]: value } : row));
    setRows(updatedRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right"> <b>Transacao</b></TableCell>
            <TableCell align="right"><b>Tipo Transacao</b></TableCell>
            <TableCell align="right"><b>Valor</b></TableCell>
            <TableCell align="right"><b>Orçado</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
 {rows.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">
                {editIdx === idx && editField === 'nomeTransacao' ? (
                  <TextField
                    value={row.nomeTransacao}
                    onChange={(e) => handleChange(e, 'nomeTransacao', idx)}
                  />
                ) : (
                  row.nomeTransacao
                )}
              </TableCell>
              <TableCell align="right">
                {editIdx === idx && editField === 'tipoTransacao' ? (
                  <TextField
                    value={row.tipoTransacao}
                    onChange={(e) => handleChange(e, 'tipoTransacao', idx)}
                  />
                ) : (
                  row.tipoTransacao
                )}
              </TableCell>
              <TableCell align="right">
                {editIdx === idx && editField === 'valorTransacao' ? (
                  <TextField
                    value={row.valorTransacao}
                    onChange={(e) => handleChange(e, 'valorTransacao', idx)}
                  />
                ) : (
                  row.valorTransacao
                )}
              </TableCell>
              <TableCell align="right">
                {editIdx === idx && editField === 'valorOrcamento' ? (
                  <TextField
                    value={row.valorOrcamento}
                    onChange={(e) => handleChange(e, 'valorOrcamento', idx)}
                  />
                ) : (
                  row.valorOrcamento
                )}
              </TableCell>
              <TableCell align="right">
                {editIdx === idx ? (
                  <IconButton onClick={handleSaveClick}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton onClick={() => handleEditClick(idx, 'nomeTransacao')}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(idx, 'tipoTransacao')}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(idx, 'valorTransacao')}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(idx, 'valorOrcamento')}>
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
