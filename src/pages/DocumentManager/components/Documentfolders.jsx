import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DocumentCard from './DocumentCard';
import CreateFolder from './CreateFolder';
import DocumentInformationDataGrid from './DocumentInformationDataGrid';

const Documentfolders = () => {
    // Inicializa dataGridRows con todos los documentos
    const [dataGridRows, setDataGridRows] = useState([
        { id: 1, documentName: 'Reporte Semanal', author: 'Carlos García', date: '2025-01-10', status: 'Aprobado', folder: 'Carga laboral' },
        { id: 2, documentName: 'Informe de Avance', author: 'María Díaz', date: '2025-01-11', status: 'Pendiente', folder: 'Carga laboral' },
        { id: 3, documentName: 'Planificación Mensual', author: 'Luis Gómez', date: '2025-01-12', status: 'En revisión', folder: 'Control de Plazos' },
        { id: 4, documentName: 'Reporte Criminal', author: 'Ana López', date: '2025-01-13', status: 'Aprobado', folder: 'Delitos con Incidencia' },
    ]);

    // Definimos los documentos de las carpetas
    const documentCards = [
        {
            Nombre_carpeta: 'Carga laboral',
            Codigo_carpeta: 'RF123',
            cantidad_archivos: 45,
            documentos: [
                { id: 1, documentName: 'Reporte Semanal', author: 'Carlos García', date: '2025-01-10', status: 'Aprobado' },
                { id: 2, documentName: 'Informe de Avance', author: 'María Díaz', date: '2025-01-11', status: 'Pendiente' },
            ],
        },
        {
            Nombre_carpeta: 'Control de Plazos',
            Codigo_carpeta: 'RA456',
            cantidad_archivos: 60,
            documentos: [
                { id: 3, documentName: 'Planificación Mensual', author: 'Luis Gómez', date: '2025-01-12', status: 'En revisión' },
            ],
        },
        {
            Nombre_carpeta: 'Delitos con Incidencia',
            Codigo_carpeta: 'EE789',
            cantidad_archivos: 30,
            documentos: [
                { id: 4, documentName: 'Reporte Criminal', author: 'Ana López', date: '2025-01-13', status: 'Aprobado' },
            ],
        },
    ];

    // Actualizar los documentos del DataGrid según el clic en la tarjeta de la carpeta
    const handleCardClick = (documentos) => {
        setDataGridRows(documentos); // Establecer los documentos seleccionados de la carpeta
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3, textAlign: 'start' }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
                Mis Documentos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {documentCards.map((card, index) => (
                    <DocumentCard
                        key={index}
                        Nombre_carpeta={card.Nombre_carpeta}
                        Codigo_carpeta={card.Codigo_carpeta}
                        cantidad_archivos={card.cantidad_archivos}
                        onClick={() => handleCardClick(card.documentos)} // Pasar los documentos al DataGrid
                    />
                ))}
                <CreateFolder />
            </Box>
            <Box sx={{ display: 'flex', borderRadius: '12px', backgroundColor: 'white', padding: 3, boxShadow: 3 }}>
                <DocumentInformationDataGrid rows={dataGridRows} /> {/* Pasar los documentos seleccionados al DataGrid */}
            </Box>
        </Box>
    );
};

export default Documentfolders;
