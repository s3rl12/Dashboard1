import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const RoleInfoDataGrid = ({ rows, onEdit, onDelete }) => {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'roles', headerName: 'Roles', flex: 1 },
        { field: 'descripcion', headerName: 'Descripción', flex: 1.5 },
        { field: 'correoVinculados', headerName: 'Correos Vinculados', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            width: 150,
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() => onEdit(row)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={() => onDelete(row.id)}
                />,
            ],
        },
    ];

    return (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                autoHeight
            />
        </Box>
    );
};

export default RoleInfoDataGrid;
