import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import contadorSVG from '../../../assets/icons/contador.svg';
// Función para mostrar los totales de usuarios con su situación
const UserTotal = ({ userSituation, totalUsers }) => {
    return (
        <Paper className="flex flex-row items-center justify-between gap-4 p-4 rounded-xl" elevation={3}>
            <Box className="flex flex-col">
                <Typography variant="body1" color="textSecondary">
                    {userSituation}
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    fontWeight="bold"
                    sx={{ textAlign: 'start' }} // Aplicando textAlign: start a totalUsers
                >
                    <span>{totalUsers}</span>
                </Typography>
            </Box>
            {/* Agregar el ícono a la derecha */}
            <img src={contadorSVG} alt="contador" className="w-30 h-30" />
        </Paper>
    );
};

const UserCount = () => {
    // Datos para las tarjetas
    const userData = [
        { userSituation: 'USER TOTALS', totalUsers: 614 },
        { userSituation: 'SUPER USER TOTAL', totalUsers: 124 },
        { userSituation: 'ADMIN USER TOTAL', totalUsers: 504 },
        { userSituation: 'USER BASIC TOTAL', totalUsers: 100 },
    ];

    return (
        <Box className="flex flex-row w-full gap-4 justify-between">
            {userData.map((data, index) => (
                <Box key={index} className="flex-1"> {/* Aplicar flex-1 a cada tarjeta */}
                    <UserTotal userSituation={data.userSituation} totalUsers={data.totalUsers} />
                </Box>
            ))}
        </Box>
    );
};

export default UserCount;
