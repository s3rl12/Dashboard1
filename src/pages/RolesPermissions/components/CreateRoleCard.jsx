import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import crSVG from '../../../assets/icons/cr.svg'; // Asegúrate de que el path es correcto

const CreateRoleCard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row', // Se organiza horizontalmente
                alignItems: 'center',
                gap: 3,
                padding: 3,
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: 3,
                minWidth: '350px', // Haciendo la tarjeta más ancha
                minHeight: '180px', // Haciendo la tarjeta menos alta
            }}
        >
            {/* Primer bloque: Ícono */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={crSVG} alt="Ícono de crear rol" style={{ width: '6rem', height: '6rem' }} />
            </Box>

            {/* Segundo bloque: Botón y texto */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        marginBottom: 1,
                        width: 'auto',
                        fontWeight: 'bold',
                    }}
                >
                    Agregar un nuevo rol
                </Button>
                <Typography variant="body1" color="textSecondary" className='flex items-end'>
                    Añadir nuevo rol,<br /> si no existe
                </Typography>
            </Box>
        </Box>
    );
};

export default CreateRoleCard;
