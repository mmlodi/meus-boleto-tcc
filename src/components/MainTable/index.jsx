import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { formatToCurrency } from '../../utils/utils';

const getColumnWidths = (tableWidth) => {
  const safeTableWidth = Math.max(tableWidth, 1);
  const categoryWidth = Math.floor(safeTableWidth * 0.42);
  const transactionValueWidth = Math.floor(safeTableWidth * 0.30);
  const transactionBudgetWidth = safeTableWidth - categoryWidth - transactionValueWidth;

  return {
    categoryWidth,
    transactionValueWidth,
    transactionBudgetWidth,
  };
};

const useFakeMutation = (saveErrorMessage) => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error(saveErrorMessage));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    [saveErrorMessage],
  );
};

export default function MainTable({ rows, onUpdateValue }) {
  const tableWrapperRef = React.useRef(null);
  const { t } = useTranslation();
  const [tableWidth, setTableWidth] = React.useState(1);
  const mutateRow = useFakeMutation(t('mainTable.saveError'));
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      try {
        const response = await mutateRow(newRow);

        onUpdateValue(response);

        setSnackbar({ children: t('mainTable.saved'), severity: 'success' });
        return response;
      } catch (error) {
        handleProcessRowUpdateError(error);
        throw error;
      }
    },
    [handleProcessRowUpdateError, mutateRow, onUpdateValue, t],
  );

  React.useEffect(() => {
    const wrapper = tableWrapperRef.current;

    if (!wrapper) {
      return undefined;
    }

    const updateWidth = (width = wrapper.clientWidth) => {
      setTableWidth(Math.max(Math.floor(width), 1));
    };

    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      const handleResize = () => updateWidth();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      updateWidth(entry.contentRect.width);
    });

    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, []);

  const columns = React.useMemo(() => {
    const { categoryWidth, transactionValueWidth, transactionBudgetWidth } = getColumnWidths(tableWidth);

    return [
      {
        field: 'category',
        headerName: t('mainTable.category'),
        width: categoryWidth,
        valueFormatter: (value) => {
          return value?.categoryName || '';
        },
      },
      {
        field: 'transactionValue',
        headerName: t('mainTable.totalSpent'),
        type: 'number',
        width: transactionValueWidth,
        editable: true,
        valueFormatter: (value) => {
          return formatToCurrency(value);
        },
      },
      {
        field: 'transactionBudget',
        headerName: t('mainTable.budget'),
        type: 'number',
        width: transactionBudgetWidth,
        editable: true,
        valueFormatter: (value) => {
          return formatToCurrency(value);
        },
      },
    ];
  }, [tableWidth, t]);

  return (
    <Box ref={tableWrapperRef}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        rowHeight={30}
        hideFooter={true}
        hideFooterPagination={true}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          sorting: {
            sortModel: [{ field: 'transactionName', sort: 'asc' }],
          },
        }}
        sx={{
          width: tableWidth,
          maxWidth: '100%',
          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: 'normal',
            lineHeight: 1.2,
            textOverflow: 'ellipsis',
          },
        }}
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
    </Box>
  );
}
