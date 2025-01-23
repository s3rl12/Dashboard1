import React, { useState, useMemo, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Popover, Typography } from '@mui/material';
import { GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import QuickFilter from '../DocumentDataGrid/components/QuickFilter';  // Asegúrate de importar el componente QuickFilter

const BUTTON_SIZE = { width: 105, height: 38 };
const ICON_SIZE = { width: 20, height: 20 };

export default function RegisterAreasDataGrid({ columnsConfig = [], title = "Default Title", rows = [] }) {
  const [filterModel, setFilterModel] = useState({ field: '', operator: 'contains', value: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const data = useMemo(() => {
    const columns = columnsConfig.some(col => col.field === 'actions')
      ? columnsConfig
      : [...columnsConfig, {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 100,
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={handleEditClick(id)}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
            />,
          ];
        },
      }];

    return {
      columns,
      rows: rows || [], // Usar las filas pasadas desde ListHeadquarter
    };
  }, [columnsConfig, rowModesModel, rows]);

  const filteredRows = useMemo(() => {
    if (!Array.isArray(data.rows)) return [];  // Asegura que data.rows sea un array
    return data.rows.filter((row) => {
      const { operator, value } = filterModel;
      if (!value) return true; // No filtrar si no hay valor
      // Filtrar dinámicamente basado en el valor proporcionado
      return data.columns.some((col) => {
        const cellValue = row[col.field]?.toString().toLowerCase() || '';
        return operator === 'contains' && cellValue.includes(value.toLowerCase());
      });
    });
  }, [data.rows, filterModel]);

  const handleFilterChange = useCallback((value) => {
    setFilterModel({ field: 'any', operator: 'contains', value }); // Cambiar para permitir buscar en cualquier columna
  }, []);

  const handleClickFilterButton = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    data.rows = data.rows.filter((row) => row.id !== id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = data.rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      data.rows = data.rows.filter((row) => row.id !== id);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <QuickFilter onChange={handleFilterChange} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <DataGrid
          rows={filteredRows}
          columns={data.columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          pageSize={5}
          sx={{
            height: '100%',
            '& .MuiDataGrid-footer': {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
}
