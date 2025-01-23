import React, { useState } from 'react';
import { AppBar, Box, Tabs, Tab } from '@mui/material';
import UserData from '../../pages/UserProfile/components/UserData.JSX';
import UserDispatch from '../../pages/UserProfile/components/UserDispatch';
import ResetUserPassord from '../../pages/UserProfile/components/ResetUserPassword';

function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', width: '100%' }}>
            <AppBar position="static" sx={{ bgcolor: 'white', borderRadius: '30px', boxShadow: 'none' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="Tabs Example"
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                >
                    <Tab label="Datos" {...a11yProps(0)} />
                    <Tab label="Despachos" {...a11yProps(1)} />
                    <Tab label="Resetear contraseña" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UserData />  {/* Aquí se incluye el componente UserData */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserDispatch/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ResetUserPassord/>
            </TabPanel>
        </Box>
    );
}
