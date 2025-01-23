import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuth } from '../../../../context/AuthContext';
import { parseISO, format } from 'date-fns';

const UserDataFields = () => {
    const { userData, setUserData } = useAuth();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFile({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
                size: (file.size / 1024).toFixed(2) + ' KB',
                status: 'success',
            });
            setError(null);
            setUserData({ ...userData, foto_perfil: file });
        }
        if (rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0];
            setError({
                name: rejectedFile.file.name,
                message: rejectedFile.errors[0]?.message || 'Archivo no permitido',
            });
            setFile(null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
        maxSize: 256 * 1024,
        multiple: false,
    });

    const removeFile = () => {
        setFile(null);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleDateChange = (newValue) => {
        setUserData({
            ...userData,
            fecha_nacimiento: newValue ? format(newValue, 'yyyy-MM-dd') : '',
        });
    };

    return (
        <Box className="flex flex-col w-full" sx={{ flexGrow: 1 }}>
            <Box className="flex flex-col w-full gap-6" sx={{ flexGrow: 1 }}>
                <Box className="flex gap-4">
                    <TextField
                        label="Nombre*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Apellido*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="apellido"
                        value={userData.apellido}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Teléfono*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Correo*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="DNI*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="dni"
                        value={userData.dni}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Dirección*"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="direccion"
                        value={userData.direccion}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Género*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="sexo"
                        value={userData.sexo}
                        onChange={handleInputChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fecha de nacimiento*"
                            value={userData.fecha_nacimiento ? parseISO(userData.fecha_nacimiento) : null}
                            onChange={handleDateChange}
                            className="flex-1"
                            slotProps={{ field: { size: 'small' } }}
                        />
                    </LocalizationProvider>
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Extensión*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="extension"
                        value={userData.extension}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Tipo Fiscal*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="tipo_fiscal"
                        value={userData.tipo_fiscal}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box className="flex gap-4">
                    <TextField
                        label="Password*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Confirmar Password*"
                        variant="outlined"
                        className="flex-1"
                        size="small"
                        name="password_confirmation"
                        value={userData.password_confirmation}
                        onChange={handleInputChange}
                    />
                </Box>

                {!file && !error && (
                    <Box
                        {...getRootProps()}
                        className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
                    >
                        <input {...getInputProps()} />
                        <Typography variant="body2" color="textSecondary" align="center">
                            {isDragActive
                                ? 'Suelta la imagen aquí...'
                                : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'}
                        </Typography>
                    </Box>
                )}

                {(file || error) && (
                    <Box
                        className="flex items-center gap-4 p-2 border rounded-md"
                        sx={{ borderColor: file ? '#A4A4A4' : 'red' }}
                    >
                        {file && (
                            <>
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                    data-dz-thumbnail
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography data-dz-name variant="body2">
                                        {file.name}
                                    </Typography>
                                    <Typography data-dz-size variant="body2" color="textSecondary">
                                        {file.size}
                                    </Typography>
                                </Box>
                            </>
                        )}
                        {error && (
                            <Typography data-dz-errormessage variant="body2" color="error">
                                {error.name} - {error.message}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            size="small"
                            onClick={removeFile}
                            data-dz-remove
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'darkred',
                                },
                            }}
                        >
                            <DeleteForeverIcon /> Eliminar
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default UserDataFields;
