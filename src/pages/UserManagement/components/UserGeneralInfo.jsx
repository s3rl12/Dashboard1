import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const UserGeneralInfo = () => {
    const fileCount = 100;
    return (
        <Box className="flex flex-col w-full gap-8 rounded-2xl bg-white">
            <Box className="flex flex-col h-full w-full gap-3">
                {/* Información general */}
                <Box className="flex flex-col bg-white p-5 items-start rounded-xl shadow-md">
                    <Typography variant="h6" component="h2" fontWeight="bold">
                        Gestión de Usuarios
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                        Gestión de usuarios / Archivos / <span>{fileCount}</span> Usuarios
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserGeneralInfo;
