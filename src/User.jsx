import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import BugReportIcon from '@mui/icons-material/BugReport';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadButton from './components/FileUploadButton';
import dayjs from 'dayjs'; // Asegúrate de importar dayjs
import DraggableAlert from './components/DraggableAlert';
import DraggableConditionalAlert from './components/DraggableConditionalAlert';
import LoadingBackdropUser from './components/LoadingBackgropUser';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//CODE CRUD
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
  GridToolbarContainer,
} from '@mui/x-data-grid';


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const apiIp = import.meta.env.VITE_API;

const token = localStorage.getItem('token');
console.log('Token utilizado en la solicitud:', token);

const initialRows = [
  { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@example.com', role: 'Admin' },
  { id: 2, firstName: 'María', lastName: 'García', email: 'maria.garcia@example.com', role: 'User' },
  { id: 3, firstName: 'Carlos', lastName: 'Hernández', email: 'carlos.hernandez@example.com', role: 'Super Admin' },
  { id: 4, firstName: 'Lucía', lastName: 'Martínez', email: 'lucia.martinez@example.com', role: 'Admin' },
];

const FullFeaturedCrudGrid = ({ rows, setRows, onEdit, loading }) => {
  const [rowModesModel, setRowModesModel] = useState({}); // Estado para los modos de edición
  const containerRef = React.useRef(); // Referencia al contenedor del DataGrid
  const handleRowEditStop = (params, event) => {
    if (params.reason === 'rowFocusOut') {
      event.defaultMuiPrevented = true;
    }
  }

  const handleEditClick = (id) => () => {
    if (onEdit) {
      onEdit(id); // Llamar a la función con el ID del usuario
    }
  };

  const handleDeleteUser = async (userId) => {
    // Mostrar el alert con confirmación antes de eliminar
    DraggableConditionalAlert({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción. El usuario será deshabilitado del sistema.",
      icon: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://${apiIp}/api/user/${userId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            // Actualizar el estado del DataGrid eliminando el usuario
            setRows((prevRows) => prevRows.filter((row) => row.id !== userId));
            DraggableAlert({
              title: "Usuario eliminado",
              text: "El usuario ha sido eliminado exitosamente.",
              icon: "success",
            });
          } else {
            DraggableAlert({
              title: "Error",
              text: "No se pudo eliminar el usuario.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          DraggableAlert({
            title: "Error",
            text: "Error de conexión con el servidor.",
            icon: "error",
          });
        }
      },
      onCancel: () => {
        DraggableAlert({
          title: "Cancelado",
          text: "La acción fue cancelada.",
          icon: "info",
        });
      },
    });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: 'firstName', headerName: 'Nombre', width: 150, editable: false },
    { field: 'lastName', headerName: 'Apellido', width: 150, editable: false },
    { field: 'email', headerName: 'Correo', width: 200, editable: false },
    { field: 'role', headerName: 'Rol', width: 150, editable: false }, // Verifica que sea legible
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Guardar"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleDeleteUser(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (

    <Box

      sx={{
        height: '100%',
        width: 770,
        backgroundColor: 'white',
        borderRadius: 3,
        '& .actions': { color: 'text.secondary' },
        '& .textPrimary': { color: 'text.primary' },
        position: 'relative',
      }}
      ref={containerRef} // Pasamos la referencia al contenedor
    >
      <LoadingBackdropUser open={loading} containerRef={containerRef} />

      <DataGrid
        sx={{
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newRowModesModel) => setRowModesModel(newRowModesModel)}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
};


// Componente de búsqueda
const Search = () => {
  return (
    <>
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="search" sx={{ display: { xs: 'inline', md: 'none' } }}>
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search user"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5, width: 595, borderRadius: 3 }, //agregar border radius
          },
        }}
        sx={{
          display: { xs: 'none', md: 'inline-block' },
          width: '595px',
          mr: 1,
          bgcolor: 'white', // Fondo blanco
          borderRadius: 3,
          borderColor: 'white'
        }}
      />
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// Componente del diálogo emergente
const UserDialog = ({ open, onClose, addRow, user, onSave }) => {
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    DNI: '',
    Direccion: '',
    Genero: '',
    fechaNacimiento: null,
    Extencion: '',
    TipoFiscal: '',
    password: '',
    confirmPassword: '',
    roles_fk: '',
  });

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sincronizar formValues con los datos del usuario seleccionado
  useEffect(() => {
    if (open && user) {
      setFormValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        mobile: user.mobile || '',
        DNI: user.DNI || '',
        Direccion: user.Direccion || '',
        Genero: user.Genero || '',
        fechaNacimiento: user.fechaNacimiento || null,
        Extencion: user.Extencion || '',
        TipoFiscal: user.TipoFiscal || '',
        password: '', // Mantener vacío para seguridad
        confirmPassword: '', // Mantener vacío para seguridad
        roles_fk: user.roles_fk || '',
      });
    } else if (open && !user) {
      // Restablecer los campos si no hay usuario seleccionado (modo de creación)
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        DNI: '',
        Direccion: '',
        Genero: '',
        fechaNacimiento: null,
        Extencion: '',
        TipoFiscal: '',
        password: '',
        confirmPassword: '',
        roles_fk: '',
      });
    }
  }, [open, user]);

  // Función para alternar la visibilidad de la contraseña
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Manejo del mouse para evitar comportamientos por defecto
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Cargar roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const response = await axios.get(`http://${apiIp}/api/roles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extraer roles desde response.data.data
        const rolesData = Array.isArray(response.data.data)
          ? response.data.data.map((role) => ({
            id: role.id,
            name: role.roles, // Usamos la propiedad "roles" como el nombre
            descripcion: role.descripcion, // Descripción opcional
          }))
          : [];
        setRoles(rolesData);
      } catch (error) {
        console.error('Error al obtener los roles:', error);
        setRoles([]); // Asigna un array vacío si ocurre un error
      } finally {
        setLoadingRoles(false);
      }
    };

    if (open) {
      fetchRoles();
    }
  }, [open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRoleChange = (event, value) => {
    setFormValues({ ...formValues, roles_fk: value ? value.id : '' });
  };

  const handleSave = async () => {
    const {
      firstName: nombre,
      lastName: apellido,
      email,
      mobile: telefono,
      DNI: dni,
      Direccion: direccion,
      Genero: sexo,
      fechaNacimiento: fecha_nacimiento,
      Extencion: extencion,
      TipoFiscal: tipo_fiscal,
      password,
      confirmPassword: password_confirmation,
      roles_fk,
    } = formValues;

    // Validación básica
    if (!nombre || !apellido || !email || !password || !roles_fk) {
      DraggableAlert({ title: 'Campos incompletos', icon: 'error' });
      //alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      // Si existe el usuario, es una edición
      if (user) {
        const response = await fetch(`http://${apiIp}/api/user/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre,
            apellido,
            telefono,
            email,
            dni,
            direccion,
            sexo: sexo.toLowerCase(),
            fecha_nacimiento,
            extencion,
            tipo_fiscal,
            roles_fk: parseInt(roles_fk, 10),
          }),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          const updatedRoleName = roles.find((role) => role.id === parseInt(roles_fk, 10))?.name || 'N/A'; // new aplicar 


          // Actualizar los datos en el DataGrid
          onSave({
            //...formValues,
            id: user.id,
            firstName: nombre,
            lastName: apellido,
            email,
            role: updatedRoleName, // Actualizamos el nombre del rol aquí

          });
          DraggableAlert({ title: 'Actualizado', text: 'Usuario actualizado correctamente.', icon: 'success' });
        } else {
          DraggableAlert({ title: 'Error', text: 'No se pudo actualizar el usuario.', icon: 'error' });
        }
      } 
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      DraggableAlert({ title: 'Error', text: 'Error de conexión con el servidor.', icon: 'error' });
    }

    // Modo de edición o creación
    if (user) {
      onSave({ ...formValues, id: user.id }); // Editar usuario existente
    } else {
      try {
        const response = await fetch(`http://${apiIp}/api/registrar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre,
            apellido,
            telefono,
            email,
            dni,
            direccion,
            sexo: sexo.toLowerCase(),
            fecha_nacimiento,
            extencion,
            tipo_fiscal,
            activo: true,
            fecha_ingreso: new Date().toISOString().split('T')[0],
            password,
            password_confirmation,
            estado: true,
            fiscalia_fk: null,
            roles_fk: parseInt(roles_fk, 10),
          }),
        });
        /*
        if (!response.ok) {
          const error = await response.json();
          alert(Error: ${error.message || 'No se pudo registrar el usuario.'});
          return;
        }
        */
        if (response.ok) {
          onClose();
          DraggableAlert({ title: 'Registrado!', text: 'Su usuario fue registrado', icon: 'success' }); // Llama a la función
          
        } else {
          onClose();
          DraggableAlert({ title: 'Error!', text: 'Su usuario no fue registrado', icon: 'error' }); // Llama a la función
        }
        const newUser = await response.json();
        //alert('Usuario registrado exitosamente.');

        // Agregar al DataGrid (si es necesario)
        addRow({
          id: newUser.id || Math.random().toString(36).substr(2, 9),
          firstName: nombre,
          lastName: apellido,
          email,
          role: roles.find((role) => role.id === parseInt(roles_fk, 10))?.name || 'N/A',
        });

        onClose();
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        //alert('Error al registrar usuario.');
        DraggableAlert({ title: 'Error en el servidor', icon: 'error' });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false} sx={{ '& .MuiDialog-paper': { width: '70%', maxWidth: '900px' } }}>
      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Completa todos los campos obligatorios para registrar un nuevo usuario.
        </DialogContentText>
        <Box sx={{ display: 'flex', bgcolor: 'background.paper', height: '100%', marginTop: '10px' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleTabChange}
            aria-label="Opciones de usuario"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Registro" {...a11yProps(0)} />
            <Tab label="Opciones Avanzadas" {...a11yProps(1)} />
            <Tab label="Configuraciones" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div className="flex flex-col gap-4">
              {/* Nombre y Apellido */}
              <div className="flex gap-4">
                <TextField
                  label="Nombre *"
                  name="firstName"
                  size="small"
                  value={formValues.firstName}
                  onChange={handleChange}
                  className="flex-1"
                />
                <TextField
                  label="Apellido *"
                  name="lastName"
                  size="small"
                  value={formValues.lastName}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>

              {/* Teléfono, Correo y DNI */}
              <div className="flex gap-4">
                <TextField
                  label="Teléfono *"
                  name="mobile"
                  size="small"
                  value={formValues.mobile}
                  onChange={handleChange}
                  className="flex-1"
                />
                <TextField
                  label="Correo *"
                  name="email"
                  size="small"
                  value={formValues.email}
                  onChange={handleChange}
                  className="flex-1"
                />
                <TextField
                  label="DNI *"
                  name="DNI"
                  size="small"
                  value={formValues.DNI}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>

              {/* Dirección */}
              <div>
                <TextField
                  label="Dirección *"
                  name="Direccion"
                  size="small"
                  value={formValues.Direccion}
                  onChange={handleChange}
                  fullWidth
                />
              </div>

              {/* Género y Fecha de nacimiento */}
              <div className="flex gap-4">
                <AsynchronousAutocomplete
                  options={Gener}
                  labelDimac="Género *"
                  name="Genero"
                  value={formValues.Genero}
                  onChange={handleChange}
                  className="flex-1"
                />
                <CustomPropsOpeningButton
                  name="fechaNacimiento"
                  value={formValues.fechaNacimiento}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>

              {/* Extensión, Rol y Tipo Fiscal */}
              <div className="flex gap-4">
                <TextField
                  label="Extensión *"
                  name="Extencion"
                  size="small"
                  value={formValues.Extencion}
                  onChange={handleChange}
                  className="flex-[1_1_100%]"
                />
                <Autocomplete
                  options={roles} // Array procesado de roles
                  getOptionLabel={(option) => option.name || ''} // Mostrará el campo "name" (anteriormente "roles")
                  loading={loadingRoles}
                  isOptionEqualToValue={(option, value) => option.id === value.id} // Compara las opciones por "id"
                  onChange={(event, value) =>
                    setFormValues({ ...formValues, roles_fk: value ? value.id : '' })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rol *"
                      fullWidth
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingRoles ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  className="flex-[1_1_100%]"
                />
                <AsynchronousAutocomplete
                  options={TipoFiscal}
                  labelDimac="Tipo Fiscal *"
                  name="TipoFiscal"
                  value={formValues.TipoFiscal}
                  onChange={handleChange}
                  className="flex-[1_1_100%]"
                />
              </div>

              {/* Contraseña y Confirmación */}
              <div className="flex gap-4">
                <FormControl fullWidth variant="outlined" className="flex-1">
                  <InputLabel htmlFor="outlined-adornment-password" size="small">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    size="small"
                    value={formValues.password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ fontSize: '20px' }}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined" className="flex-1">
                  <InputLabel htmlFor="outlined-adornment-confirm-password" size="small">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    size="small"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ fontSize: '20px' }}
                        >
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Opciones avanzadas en construcción...
          </TabPanel>
          <TabPanel value={value} index={2}>
            Configuraciones adicionales.
          </TabPanel>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" className='bottom-2'>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" className='bottom-2'>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>

  );
};

const Gener = [
  "f", "m", "Prefiero no decirlo"
];

const Rols = [
  "Super Admin", "Admin", "User"
];

const TipoFiscal = [
  "Tipo A", "Tipo B", "Tipo C"
];

// Componente Asincrónico para seleccionar Meses
const AsynchronousAutocomplete = ({ options = [], labelDimac = [], name, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableOptions, setAvailableOptions] = useState([]); // Opciones disponibles después de la carga

  const handleOpen = useCallback(() => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setAvailableOptions(options); // Establecer las opciones solo después de la carga
      setLoading(false);
    }, 500); // Simula 1 segundo de carga
  }, [options]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAvailableOptions([]); // Limpia las opciones al cerrar
  }, []);

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={availableOptions} // Solo muestra opciones después de cargar
      loading={loading}
      value={value || ''}
      onChange={(event, newValue) =>
        onChange({ target: { name, value: newValue || '' } })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelDimac}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} sx={{ marginRight: 2 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};


const CustomPropsOpeningButton = ({ name, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ width: '100%', }}>
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={(newValue) =>
            onChange({ target: { name, value: newValue ? newValue.format('YYYY-MM-DD') : '' } })
          }
          slotProps={{
            textField: {
              size: 'small', // Ajusta el tamaño del campo de texto
              sx: {
                width: '100%', // Ajusta el ancho si es necesario
                fontSize: '0.875rem', // Tamaño de texto más pequeño (opcional)
                top: '-8px'
              },
            },
            openPickerButton: {
              sx: {
                color: '#152B52', // Cambia el color del ícono
                '&:hover': {
                  color: '#0A1E3D', // Color más oscuro al pasar el mouse (opcional)
                },
              },
            },
            inputAdornment: {
              position: 'start',
            },
          }}

        />
      </DemoContainer>
    </LocalizationProvider>
  );
};





const User = () => {
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla el estado del diálogo
  const [rows, setRows] = useState([]); // Almacena los usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para edición

  const addRow = (newRow) => setRows((prev) => [...prev, newRow]);

  // Manejar la apertura del diálogo al editar
  const handleEdit = (userId) => {
    const userToEdit = rows.find((row) => row.id === userId); // Buscar el usuario en rows
    if (userToEdit) {
      setSelectedUser(userToEdit); // Establecer el usuario seleccionado
      setIsDialogOpen(true); // Abrir el diálogo
    }
  };

  // Manejar el cierre del diálogo
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null); // Limpia los datos del usuario seleccionado
  };

  // Actualizar el usuario después de la edición
  const handleUpdateUser = (updatedUser) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedUser.id
          ? { ...row, ...updatedUser }
          : row
      )
    );
    handleCloseDialog(); // Cierra el diálogo
  };

  // Función para transformar los datos devueltos por la API
  const transformData = (data) => {
    return data.map((user) => ({
      id: user.id,
      firstName: user.nombre,
      lastName: user.apellido,
      email: user.email,
      mobile: user.telefono,
      DNI: user.dni,
      Direccion: user.direccion,
      Genero: user.sexo,
      fechaNacimiento: user.fecha_nacimiento,
      Extencion: user.extencion,
      TipoFiscal: user.tipo_fiscal,
      role: user.roles_fk?.roles || 'N/A',
    }));
  };
  // Función para obtener los usuarios desde la API
  const fetchUsers = async () => {
    try {
      setLoading(true); // Empieza la carga
      const response = await axios.get(`http://${apiIp}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = Array.isArray(response.data) ? response.data : response.data.data; // Ajusta según estructura
        if (Array.isArray(data)) {
          const transformedData = transformData(data);
          setRows(transformedData);
        } else {
          console.error('Error: La API no devolvió un arreglo.');
        }
      } else {
        console.error(`Error: Código de estado inesperado (${response.status}).`);
      }
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error.message || error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Hook useEffect para cargar los datos al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className='flex flex-row gap-4 pl-4 pt-0 mt-0 w-full h-full justify-between'>
        <div className='flex flex-col gap-3 h-full'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-2xl text-start font-bold text-[#152B52]'>User</h2>
            <div className='flex flex-row gap-0'>
              <Search />
              <Button variant="contained" endIcon={<AddIcon />}
                onClick={() => setIsDialogOpen(true)}
                sx={{
                  color: '#FFFFFF',
                  backgroundColor: '#152B52',
                  fontSize: '12px',
                  fontWeight: '600', // Semibold
                  textTransform: 'none'
                }}>
                Add user
              </Button>
              <FileUploadButton/>
            </div>

          </div>
          <div className='flex flex-row gap-3 text-left'>
            <div className="bg-white rounded-2xl pr-20 pl-5 py-3">
              <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
              <p className='text-[#222B45] font-bold text-xl'>614</p>
            </div>
            <div className="bg-white rounded-2xl pr-20 pl-5 py-3">
              <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
              <p className='text-[#222B45] font-bold text-xl'>614</p>
            </div>
            <div className="bg-white rounded-2xl pr-20 pl-5 py-3">
              <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
              <p className='text-[#222B45] font-bold text-xl'>614</p>
            </div>
            <div className=" bg-white rounded-2xl pr-20 pl-5 py-3">
              <h1 className='text-[#8F9BB3] font-sans text-xs'>lorem ipsum</h1>
              <p className='text-[#222B45] font-bold text-xl'>614</p>
            </div>
          </div>

          <div className='flex h-full flex-grow'>
            <FullFeaturedCrudGrid rows={rows} setRows={setRows} onEdit={handleEdit} loading={loading} />
          </div>
        </div>

      </div>
      {isDialogOpen && (
        <UserDialog open={isDialogOpen} onClose={handleCloseDialog} addRow={addRow} user={selectedUser} onSave={handleUpdateUser} />
      )}

    </>
  )
}

export default User;