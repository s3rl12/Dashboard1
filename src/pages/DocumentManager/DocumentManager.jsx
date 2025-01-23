import React from 'react';
import { Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Documentfolders from './components/Documentfolders';

// Define el tema de forma clara
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: { fontWeight: 'bold' },
    },
});

const DocumentManager = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    padding: 4,
                    gap: 2,
                    flexGrow: 1,
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" sx={{textAlign: 'start'}}>
                    GESTOR DE DOCUMENTOS
                </Typography>

                {/* Box para "GESTOR DE CARPETAS" con los textos */}
                <Box
                    sx={{
                        border: '2px solid #152B52', // Border color
                        borderRadius: '10px', // Border radius
                        padding: 3, // Padding inside the box
                        backgroundColor: '#e3f2fd', // Light blue background
                    }}
                >
                    <Typography variant="h7" component="h2" fontWeight="bold" sx={{textAlign: 'start'}}>
                        GESTOR DE CARPETAS
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{textAlign: 'start'}}>
                        En este módulo, los usuarios pueden crear carpetas para organizar sus archivos. Dentro de cada carpeta, es posible agregar y gestionar archivos Excel, facilitando la clasificación y el acceso rápido a la información almacenada.
                    </Typography>
                </Box>

                <Documentfolders />
            </Box>
        </ThemeProvider>
    );
};

export default DocumentManager;
