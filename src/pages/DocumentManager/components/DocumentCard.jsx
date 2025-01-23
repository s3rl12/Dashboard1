import React from 'react';
import { Box, Typography } from '@mui/material';
import folderSVG from '../../../assets/icons/folder.svg';

const DocumentCard = ({ Nombre_carpeta, Codigo_carpeta, cantidad_archivos, onClick }) => {
    return (
        <Box
            onClick={onClick} // Maneja el evento de clic
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                borderRadius: '12px',
                backgroundColor: 'white',
                padding: 3,
                boxShadow: 3,
                minWidth: '250px',
                minHeight: '250px',
                cursor: 'pointer', // Cambia el cursor para indicar interactividad
                '&:hover': {
                    boxShadow: 6, // Agrega un efecto visual al pasar el cursor
                },
            }}
            role="button"
            aria-labelledby="folder-card"
        >
            <img src={folderSVG} alt="Ícono de carpeta" style={{ width: '5rem', height: '5rem' }} />
            <Typography variant="h6" component="h2" fontWeight="bold" id="folder-card">
                {Nombre_carpeta}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Código: {Codigo_carpeta}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Archivos: {cantidad_archivos}
            </Typography>
        </Box>
    );
};

export default DocumentCard;
