import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const UserData = () => {
    return (
        <Box className="flex flex-col w-full pt-8 gap-8 bg-white">
            {/* Sección Registrar Sede */}
            <Box
                className="flex flex-col w-full gap-6 px-5"
                
            >
                {/* Campos para registrar sede */}
                <Box className="flex gap-6 w-full text-start">
                    {/* Primera columna */}
                    <Box className="flex flex-col w-1/2 gap-4">
                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Nombres:
                            </Typography>
                            <TextField
                                placeholder="Nombres"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>

                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Teléfono:
                            </Typography>
                            <TextField
                                placeholder="Número de teléfono"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>

                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                DNI:
                            </Typography>
                            <TextField
                                placeholder="Documento de identidad"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>

                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Tipo de fiscal:
                            </Typography>
                            <TextField
                                placeholder="Tipo de fiscal"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Segunda columna */}
                    <Box className="flex flex-col w-1/2 gap-4">
                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Apellidos:
                            </Typography>
                            <TextField
                                placeholder="Apellidos"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>

                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Correo:
                            </Typography>
                            <TextField
                                placeholder="Dirección de correo electrónico"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>

                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Dirección:
                            </Typography>
                            <TextField
                                placeholder="Dirección de residencia"
                                variant="outlined"
                                size="small"
                                fullWidth
                                slotProps={{
                                    inputLabel: { shrink: false },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Botones de Cancelar y Guardar */}
                <Box className="flex justify-end gap-4 mt-6">
                    <Button variant="contained" color="primary" sx={{ width: '120px' }}>
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default UserData;
