import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const UserDispatch = () => {
    return (
        <Box className="flex flex-col w-full pt-8 gap-8 bg-white">
            {/* Sección Registrar Sede */}
            <Box
                className="flex flex-col w-full gap-6 px-5"

            >
                {/* Campos para registrar sede */}
                <Box className="flex gap-6 w-full">
                    {/* Primera columna */}
                    <Box className="flex flex-col w-full gap-4 text-start">
                        <Box className="flex gap-4 items-center">
                            <Typography variant="body2" sx={{ width: '150px', fontWeight: 600, fontSize: '15px' }}>
                                Sede:
                            </Typography>
                            <TextField
                                placeholder="Sede"
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
                                Dependencia:
                            </Typography>
                            <TextField
                                placeholder="Dependencia"
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
                                Despacho:
                            </Typography>
                            <TextField
                                placeholder="Despacho"
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

export default UserDispatch;
