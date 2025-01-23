import React, { useMemo, useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import QuickFilter from '../../../components/DocumentDataGrid/components/QuickFilter';
import ExportDocument from '../../../components/DocumentDataGrid/components/ExportDocument';
import FileUpload from '../../../components/DocumentDataGrid/components/FileUpload';

export default function DocumentInformationDataGrid({ rows }) {
    const [displayedRows, setDisplayedRows] = useState(rows); // Estado para manejar los datos mostrados

    // Actualizar las filas mostradas si las filas iniciales cambian
    useEffect(() => {
        setDisplayedRows(rows); // Actualiza las filas mostradas si las filas iniciales cambian
    }, [rows]);

    const handleEdit = (row) => {
        alert(`Editar documento: ${row.documentName}`);
    };

    const handleDelete = (id) => {
        alert(`Eliminar documento con ID: ${id}`);
    };

    const handleFilterChange = (field, operator, value) => {
        // Lógica para filtrar las filas
        const filteredRows = rows.filter((row) =>
            String(row[field]).toLowerCase().includes(String(value).toLowerCase())
        );
        setDisplayedRows(filteredRows); // Actualiza las filas filtradas
    };

    const handleExport = () => {
        console.log('Exportar documentos');
    };

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'documentName', headerName: 'Nombre del Documento', flex: 1 },
        { field: 'author', headerName: 'Autor', flex: 1 },
        {
            field: 'date',
            headerName: 'Fecha',
            type: 'date',
            flex: 1,
            valueGetter: ({ row }) => (row?.date ? new Date(row.date) : null),
        },
        { field: 'status', headerName: 'Estado', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            width: 150,
            getActions: ({ row }) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={() => handleEdit(row)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={() => handleDelete(row.id)}
                />,
            ],
        },
    ], []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            {/* Barra de herramientas */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1, marginBottom: 2 }}>
                <QuickFilter onChange={(value) => handleFilterChange('documentName', 'contains', value)} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ExportDocument onExport={handleExport} />
                    <FileUpload />
                </Box>
            </Box>

            {/* Tabla de datos */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <DataGrid
                    rows={displayedRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                />
            </Box>
        </Box>
    );
}
