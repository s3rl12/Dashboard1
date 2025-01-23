import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ResetUserPassword = () => {
    return (
        <Box className="flex flex-col w-full pt-8 gap-8 bg-white">
            {/* Sección Cambiar Contraseña */}
            <Box className="flex flex-col w-full gap-6 px-5">
                <Box className="flex flex-col gap-4 w-full text-start">
                    {/* Contraseña Actual */}
                    <Box className="flex items-center gap-4">
                        <Typography variant="body2" sx={{ minWidth: '150px', fontWeight: 600, fontSize: '15px' }}>
                            Contraseña actual:
                        </Typography>
                        <TextField
                            placeholder="Ingresa tu contraseña actual"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Box>
                    {/* Nueva Contraseña */}
                    <Box className="flex items-center gap-4">
                        <Typography variant="body2" sx={{ minWidth: '150px', fontWeight: 600, fontSize: '15px' }}>
                            Nueva contraseña:
                        </Typography>
                        <TextField
                            placeholder="Ingresa tu nueva contraseña"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Box>
                    {/* Confirmar Contraseña */}
                    <Box className="flex items-center gap-4">
                        <Typography variant="body2" sx={{ minWidth: '150px', fontWeight: 600, fontSize: '15px' }}>
                            Confirmar contraseña:
                        </Typography>
                        <TextField
                            placeholder="Confirma tu nueva contraseña"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Box>
                </Box>

                {/* Requisitos de Contraseña */}
                <Box className="flex flex-col bg-gray-100 p-6 rounded-md items-start">
                    <Typography variant="body2" color="textSecondary">
                        La contraseña debe cumplir con los siguientes requisitos:
                    </Typography>
                    <ul className="text-sm text-gray-600 list-disc ml-6 text-start">
                        <li>Mínimo 8 caracteres</li>
                        <li>Al menos una letra mayúscula</li>
                        <li>Al menos un número</li>
                        <li>Un carácter especial (por ejemplo, @, #, $, %)</li>
                    </ul>
                </Box>

                {/* Botones de Acción */}
                <Box className="flex justify-end gap-4 mt-6">
                    <Button variant="contained" color="primary" sx={{ width: '120px' }}>
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ResetUserPassword;
