import React from 'react';
import { Box, Typography } from '@mui/material';
import createfolderSVG from '../../../assets/icons/createfolder.svg';

const CreateFolder = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                padding: 3,
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: 3,
                width: 'auto',
            }}
        >
            <img src={createfolderSVG} alt="Ícono de crear carpeta" style={{ width: '6rem', height: '6rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Crear Carpeta
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Aquí puedes crear una nueva carpeta para organizar tus archivos.
                </Typography>
            </Box>
        </Box>
    );
};

export default CreateFolder;
