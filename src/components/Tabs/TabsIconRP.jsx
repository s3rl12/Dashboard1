import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';  // Correcto
import TabList from '@mui/lab/TabList';        // Correcto
import TabPanel from '@mui/lab/TabPanel';      // Correcto
import sedesSVG from '../../assets/icons/sedes.svg';  // Importa el archivo SVG
import dependenciasSVG from '../../assets/icons/dependencias.svg';
import despachosSVG from '../../assets/icons/despachos.svg';
import rolSVG from '../../assets/icons/rol.svg';
import permisoSVG from '../../assets/icons/permiso.svg';
import RoleManagement from '../../pages/RolesPermissions/components/RoleManagement';


const TabsIconRP = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Opciones de Áreas">
            <Tab 
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingLeft: '50px',
                paddingRight: '50px',
                paddingTop: '40px',
                paddingBottom: '40px',
                marginRight: '20px', // Separación en el eje X
              }}
              icon={<img src={rolSVG} alt="Sedes Icon" style={{ width: '5rem', height: '5rem' }} />} 
              label={<p style={{ fontWeight: '600', fontSize: '18px' }}>
                SEDES<br />
                <span style={{ fontWeight: '500', fontSize: '12px', color: 'gray' }} >
                  <span>05</span> sedes
                </span>
              </p>} 
              value="1" 
            />
            <Tab 
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingLeft: '50px',
                paddingRight: '50px',
                paddingTop: '40px',
                paddingBottom: '40px',
                marginLeft: '20px',  // Separación en el eje X
                marginRight: '20px', // Separación en el eje X
              }}
              icon={<img src={permisoSVG} alt="Dependencias Icon" style={{ width: '5rem', height: '5rem' }} />} 
              label={<p style={{ fontWeight: '600', fontSize: '18px' }}>
                DEPENDENCIAS<br />
                <span style={{ fontWeight: '500', fontSize: '12px', color: 'gray' }} >
                  <span>09</span> DEPENDENCIAS
                </span>
              </p>} 
              value="2" 
            />
            <Tab 
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingLeft: '50px',
                paddingRight: '50px',
                paddingTop: '40px',
                paddingBottom: '40px',
                marginLeft: '20px',  // Separación en el eje X
              }}
              icon={<img src={despachosSVG} alt="Despachos Icon" style={{ width: '5rem', height: '5rem' }} />} 
              label={<p style={{ fontWeight: '600', fontSize: '18px' }}>
                DESPACHOS<br />
                <span style={{ fontWeight: '500', fontSize: '12px', color: 'gray' }} >
                  <span>15</span> DESPACHOS
                </span>
              </p>} 
              value="3" 
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RoleManagement />
        </TabPanel>
        <TabPanel value="2">
          <h2>Hola Mundo - DEPENDENCIAS</h2>
        </TabPanel>
        <TabPanel value="3">
          <h2>Hola Mundo - DESPACHOS</h2>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabsIconRP;
