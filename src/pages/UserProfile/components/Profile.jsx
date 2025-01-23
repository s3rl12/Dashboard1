import React from 'react';
import { Box, Typography } from '@mui/material';
import userSVG from '../../../assets/icons/user.svg';

const Profile = ({ userName = "NOMBRE COMPLETO", userRole = "Administrador" }) => {
    return (
        <Box className="flex flex-col w-full h-full pt-8 bg-white rounded-2xl shadow-md">
            <Box className="flex flex-col w-full gap-6 items-center">
                {/* Imagen de perfil centrada */}
                <img
                    src={userSVG}
                    alt="Icono de perfil del usuario"
                    className="w-20 h-20"
                />
                {/* Nombre completo del usuario */}
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {userName}
                </Typography>
                {/* Cargo del usuario */}
                <Box className="bg-white p-5 rounded-lg shadow-md">
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {userRole}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
