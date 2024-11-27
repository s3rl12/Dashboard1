// src/Dashboard.jsx
import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Reports from './Reports';  // Importa el componente Reports
import Documents from './Documents';
import User from './User';
import DashboardAdmin from './dashboardAdmin';

import './index.css';

const NAVIGATION = [
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'reports', title: 'Reports', icon: <BarChartIcon /> },
    { segment: 'documents', title: 'Documents', icon: <DescriptionIcon /> },
    { segment: 'user', title: 'User', icon: <PersonIcon /> },
    { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

const demoTheme = createTheme({
    
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },

});

function DemoPageContent({ pathname }) {
    let content;
    
    switch (pathname) {
        case '/dashboard':
            content = <DashboardAdmin />;
            break;
        case '/reports':
            content = <Reports />;
            break;
        case '/documents':
            content = <Documents />;
            break;
        case '/user':
            content = <User />;
            break;
        default:
            content = <Typography>Welcome to the Dashboard</Typography>;
    }

    return <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgb(245 245 244)' }}>{content}</Box>;
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function Search() {
    return (
        <React.Fragment>
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                            color: '#666666', // Cambia el color del ícono en la vista móvil
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                InputLabelProps={{
                    style: { color: '#fff' }, // Cambia el color del texto del label
                }}
                InputProps={{
                    style: {
                        color: '#fff', // Cambia el color del texto dentro del input
                        backgroundColor: '#15315C', // Cambia el color de fondo del input
                        borderRadius: '15px', // Aplica el border-radius
                    },
                    endAdornment: (
                        <IconButton
                            type="button"
                            aria-label="search"
                            size="small"
                            sx={{
                                color: '#fff', // Cambia el color del ícono de búsqueda
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#1976d2', // Fondo blanco para todo el input
                        borderRadius: '15px', // Border-radius del contenedor principal
                        '& fieldset': {
                            borderColor: '#15315C', // Cambia el color del borde
                            borderRadius: '15px', // Border-radius del borde
                        },
                        '&:hover fieldset': {
                            borderColor: '#15315C', // Cambia el borde al pasar el mouse
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#15315C', // Cambia el borde al hacer foco
                        },
                    },
                    display: { xs: 'none', md: 'inline-block' },
                    mr: 1,
                }}
            />
        </React.Fragment>
    );
}



function Dashboard() {
    const [session, setSession] = useState({
        user: {
            name: '',
            email: '',
            token: '',
        },
    });

    useEffect(() => {
        // Cargar datos del usuario desde localStorage si están disponibles
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setSession({ user: JSON.parse(storedUser) });
        }
    }, []);

    const authentication = useMemo(() => ({
        signIn: (userData) => {
            // Agrega la imagen predeterminada a los datos del usuario
            const userWithImage = {
                ...userData,
                image: 'https://avatars.githubusercontent.com/u/19550456',
            };

            // Guarda en localStorage y actualiza el estado
            localStorage.setItem('user', JSON.stringify(userWithImage));
            setSession({ user: userWithImage });
        },
        signOut: () => {
            // Elimina los datos del usuario en localStorage y reinicia el estado
            localStorage.removeItem('user');
            setSession(null);
        },
    }), []);


    const [pathname, setPathname] = useState('/dashboard');

    const router = useMemo(() => ({
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
    }), [pathname]);

    return (

        <AppProvider session={session} authentication={authentication} navigation={NAVIGATION} router={router} theme={demoTheme}>
            <DashboardLayout
                
                slots={{
                    toolbarActions: () => (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center', // Centra verticalmente
                                gap: '16px', // Espacio entre Search y el ícono de usuario
                            }}
                        >
                            <Search />
                        </div>
                    ),
                }}
            >
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

export default Dashboard;


