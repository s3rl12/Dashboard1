import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserDataFields from '../../pages/UserManagement/CreateUser/components/UserDataFields';
import OptionListCard from '../OptionListCard/OptionListCard';
import sedeSVG from '../../assets/icons/sede.svg';
import AdditionalData from '../../pages/UserManagement/CreateUser/AdditionalData/AdditionalData';
import RoleInformation from '../../pages/UserManagement/CreateUser/AdditionalData/RoleInformation';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flex: 1, display: value === index ? 'flex' : 'none', flexDirection: 'column' }}
    >
      {children}
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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="flex flex-row w-full gap-4" sx={{ flex: 1 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="REGISTRAR" {...a11yProps(0)} />
        <Tab label="DEPENDENCIAS" {...a11yProps(1)} />
        <Tab label="ROLES" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserDataFields />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdditionalData />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RoleInformation />
      </TabPanel>
    </Box>
  );
}
