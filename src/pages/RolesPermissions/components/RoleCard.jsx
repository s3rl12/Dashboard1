import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const RoleCard = ({ Icon_Rol, Rol_Asignado, Total_rol, onClick }) => {
    return (
        <Box
            onClick={onClick} // Maneja el evento de clic
            sx={{
                display: 'flex',
                flexDirection: 'row', // Organiza los bloques en fila (horizontal)
                alignItems: 'center',
                gap: 3,
                borderRadius: '12px',
                backgroundColor: 'white',
                padding: 3,
                justifyContent: 'space-between',
                boxShadow: 3,
                minWidth: '350px', // Haciendo la tarjeta más ancha
                minHeight: '180px', // Haciendo la tarjeta menos alta
                cursor: 'pointer', // Cambia el cursor para indicar interactividad
                '&:hover': {
                    boxShadow: 6, // Agrega un efecto visual al pasar el cursor
                },
            }}
            role="button"
            aria-labelledby="role-card"
        >
            {/* Primer bloque: Rol_Asignado, "Total de usuarios" y Botón */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    id="role-card"
                    sx={{
                        wordBreak: 'break-word', // Permite dividir palabras largas
                        whiteSpace: 'normal', // Asegura que las líneas puedan dividirse
                        maxWidth: '250px', // Ancho máximo para limitar el texto
                    }}
                >
                    {Rol_Asignado}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Total de usuarios
                </Typography>
                <Button className="flex text-xs font-semibold pt-5 text-[#152B52] hover:underline">
                    Editar Rol
                </Button>
            </Box>

            {/* Segundo bloque: Icon_Rol centrado y debajo el Total_rol */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <img src={Icon_Rol} alt="Ícono de Rol" style={{ width: '5rem', height: '5rem' }} />
                <Typography variant="body1" color="textSecondary">
                    {Total_rol}
                </Typography>
            </Box>
        </Box>
    );
};

export default RoleCard;
