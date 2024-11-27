import React, { useState, useCallback } from 'react';
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

import FolderIcon from '@mui/icons-material/Folder';
import FullFeaturedCrudGridDocuments from './components/FullFeaturedCrudGridDocuments';
import axios from 'axios';

const years = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const documentTypes = ['Corte de Gestion', 'Control plazos', 'Incidencia']; // Tipos de documentos

// Componente de carga de archivos
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFileUpload = () => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        backgroundColor: '#152B52', // Cambia el color de fondo
        color: 'white', // Cambia el color del texto si es necesario
        '&:hover': {
          backgroundColor: '#0e1d36', // Cambia el color de fondo al pasar el mouse
        },
      }}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
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
        label="Search documents"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5, width: 700, borderRadius: 3 }, //agregar border radius
          },
        }}
        sx={{
          display: { xs: 'none', md: 'inline-block' },
          width: '700px',
          mr: 1,
          bgcolor: 'white', // Fondo blanco
          borderRadius: 3,
          borderColor: 'white'
        }}
      />
    </>
  );
};

// Componente Asincrónico para seleccionar Meses
const AsynchronousAutocomplete = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1000); // Espera de 1 segundo
      setLoading(false);
      setOptions(years); // Usar la lista de años
    })();
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setOptions([]);
  }, []);

  const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

  return (
    <Autocomplete
      sx={{ width: 200 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="This Month"
          InputLabelProps={{
            style: { color: 'black' }, // Cambia el color del texto de la etiqueta a negro
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} sx={{ color: 'black' }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
            sx: {
              '& .MuiSvgIcon-root': {
                color: 'black', // Cambia el color de la flecha a negro
              },
            },
          }}
          size="small"

        />
      )}
    />
  );
};

// Componente para seleccionar Tipos de Documentos
const DocumentTypeComboBox = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(500); // Espera de medio segundo
      setLoading(false);
      setOptions(documentTypes); // Usar la lista de tipos de documentos
    })();
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setOptions([]);
  }, []);

  const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

  return (
    <Autocomplete
      sx={{ width: 200 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Documents"
          InputLabelProps={{
            style: { color: 'black' }, // Cambia el color del texto de la etiqueta a negro
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} sx={{ color: 'black' }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
            sx: {
              '& .MuiSvgIcon-root': {
                color: 'black', // Cambia el color de la flecha a negro
              },
            },
          }}
          size="small"
        />
      )}
    />
  );
};

const FolderList = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0, height: 150 }}>
      <ListItem sx={{ marginBottom: '0px', paddingBottom: '0px' }}>
        <ListItemAvatar sx={{ mr: [-2] }}>
          <Avatar style={{ width: '30px', height: '30px' }}>
            <BugReportIcon fontSize="inherit" style={{ width: '15px', height: '15px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Bug" secondary="5 identificados" primaryTypographyProps={{ style: { fontSize: '11px' } }} secondaryTypographyProps={{ style: { fontSize: '10px' } }} />
      </ListItem>
      <ListItem sx={{ marginBottom: '0px', paddingTop: '0px', marginTop: '0px', paddingBottom: '0px' }}>
        <ListItemAvatar sx={{ mr: [-2] }}>
          <Avatar style={{ width: '30px', height: '30px' }} >
            <PersonIcon fontSize="inherit" style={{ width: '15px', height: '15px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="New user registered" secondary="59 minutes ago" primaryTypographyProps={{ style: { fontSize: '11px' } }} secondaryTypographyProps={{ style: { fontSize: '10px' } }} />
      </ListItem>
      <ListItem sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0px' }}>
        <ListItemAvatar sx={{ mr: [-2] }}>
          <Avatar style={{ width: '30px', height: '30px' }}>
            <BugReportIcon fontSize="inherit" style={{ width: '15px', height: '15px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="You fixed a bug" secondary="12 hours ago" primaryTypographyProps={{ style: { fontSize: '11px' } }} secondaryTypographyProps={{ style: { fontSize: '10px' } }} />
      </ListItem>
    </List>
  );
}

const FolderPersons = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0, height: 200 }}>
      <ListItem sx={{ marginBottom: '0px', paddingBottom: '0px' }}>
        <ListItemAvatar sx={{ mr: [-2] }}>
          <Avatar style={{ width: '30px', height: '30px' }}>
            <p className='text-xs font-bold'>Q</p>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="QUISPE CORTEGANA DEISY" secondary="Just now" primaryTypographyProps={{ style: { fontSize: '11px' } }} secondaryTypographyProps={{ style: { fontSize: '10px' } }} />
      </ListItem>
      <ListItem sx={{ marginBottom: '0px', paddingTop: '0px', marginTop: '0px', paddingBottom: '0px' }}>
        <ListItemAvatar sx={{ mr: [-2] }}>
          <Avatar style={{ width: '30px', height: '30px' }} >
            <p className='text-xs font-bold'>Q</p>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="QUISPE CORTEGANA DEISY" secondary="59 minutes ago" primaryTypographyProps={{ style: { fontSize: '11px' } }} secondaryTypographyProps={{ style: { fontSize: '10px' } }} />
      </ListItem>
      <ListItem sx={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0px' }}>
        <ListItemAvatar sx={{ mr: [-2] }}>
          <Avatar style={{ width: '30px', height: '30px' }}>
            <p className='text-xs font-bold'>Q</p>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="QUISPE CORTEGANA DEISY" secondary="12 hours ago" primaryTypographyProps={{ style: { fontSize: '11px' } }} secondaryTypographyProps={{ style: { fontSize: '10px' } }} />
      </ListItem>
    </List>
  );
}


// Componente principal del documento
const Documents = () => {
  return (
    <div className='flex flex-row w-full h-full gap-4 pl-4 mt-0 justify-between'>
      <div className='flex flex-col h-full gap-3 mt-0'>
        <div className='flex flex-col gap-1 w-full'>
          <h2 className='text-2xl text-start font-bold text-[#152B52]'>Documents</h2>
          <Search />
        </div>
        <div className='flex flex-row gap-4 w-full'>
          <AsynchronousAutocomplete />
          <DocumentTypeComboBox />
          <InputFileUpload />
        </div>
        <div className='flex h-full flex-grow'>
          <FullFeaturedCrudGridDocuments />
        </div>
      </div>
      <div className='flex flex-col w-1/5 gap-4 pr-3'>
        <div className=' flex-row h-full pt-4 bg-white'>
          <div>
            <h2 className='text-start pl-4'>Notification</h2>
            <FolderList />
          </div>
          <div>
            <h2 className='text-start pl-4'>Activities</h2>
            <FolderPersons />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Documents;
