import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAccordion from './Cargalaboral';
import './index.css';

const sedes = [
    { name: 'Sede Central', value: 20 },
    { name: 'Sede Mazuco', value: 15 },
    { name: 'Sede Huepete', value: 10 },
    { name: 'Sede Salvación', value: 8 },
    { name: 'Sede Iberia', value: 12 },
    { name: 'SedeParís', value: 18 },
    { name: 'Sede La Fiora', value: 7 },
];

const dependencias = [
    { name: 'Fiscalía de Drogas', value: 5 },
    { name: 'Fiscalía Ambiental', value: 5 },
    { name: 'Fiscalía Corporativa', value: 5 },
    { name: 'Fiscalía de Corrupción de Funcionarios', value: 5 },
    { name: 'Fiscalía de Crimen Organizado', value: 5 },
    { name: 'Fiscalía de Extinción de Dominio', value: 5 },
];

const ReportCard = ({ title, value }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="flex w-[35px] h-[35px] bg-[#152B52] rounded items-center justify-center">
                <AccountBalanceIcon style={{ color: '#fff' }} />
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col items-start">
                    <p className="font-semibold text-xs text-start">{title}</p>
                    <p className="font-medium text-[8px] text-gray-600 text-start">
                        Cantidad documentos: <span className="text-black">{value}</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <button
                        className="text-xs font-semibold text-[#152B52] hover:underline"
                    >
                        Reporte Estadístico
                    </button>
                </div>
            </div>
        </div>
    );
};

ReportCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

const ReportDepen = ({ title, value, onExplore }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="flex w-[35px] h-[35px] bg-[#fff] rounded items-center justify-center">
                <AccountTreeIcon style={{ color: '#152B52' }} />
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col items-start">
                    <p className="font-semibold text-xs text-start">{title}</p>
                    <p className="font-medium text-[8px] text-gray-600 text-start">
                        Cantidad documentos: <span className="text-black">{value}</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <button
                        className="text-xs font-semibold text-[#152B52] hover:underline"
                        onClick={() => onExplore(title, value)}
                    >
                        Explorar
                    </button>
                </div>
            </div>
        </div>
    );
};

ReportDepen.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onExplore: PropTypes.func.isRequired,
};

const DynamicAccordion = ({ items, ReportCard, ReportDepen, onExplore }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            {items.map((item, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <div style={{ width: '100%' }}>
                            {ReportCard && <ReportCard title={item.name} value={item.value} />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='flex flex-col w-full gap-3' style={{ width: '98%' }}>
                            {dependencias.map((dep, depIndex) => (
                                <ReportDepen
                                    key={depIndex}
                                    title={dep.name}
                                    value={dep.value}
                                    onExplore={onExplore}
                                />
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

DynamicAccordion.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    })).isRequired,
    ReportCard: PropTypes.func.isRequired,
    ReportDepen: PropTypes.func.isRequired,
    onExplore: PropTypes.func.isRequired,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`custom-tabpanel-${index}`}
            aria-labelledby={`custom-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `custom-tab-${index}`,
        'aria-controls': `custom-tabpanel-${index}`,
    };
}

const ReportDialog = ({ open, onClose, reportTitle, contDoc, navigate }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={false} sx={{ '& .MuiDialog-paper': { width: '60%', maxWidth: '900px' } }}>
            <DialogTitle>{reportTitle}</DialogTitle>
            <DialogContent>
                <p className='pb-4'>Este es el contenido detallado del reporte: <strong>{reportTitle}</strong>.</p>
                <CustomAccordion sections={[{ title: reportTitle }]} useFade={true} fadeTimeout={400} ContDoc={contDoc} navigate={navigate}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

ReportDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    reportTitle: PropTypes.string.isRequired,
    contDoc: PropTypes.number.isRequired,
    navigate: PropTypes.func.isRequired,
};

const ReportGE = ({ navigate }) => {
    const [value, setValue] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedReport, setSelectedReport] = React.useState('');
    const [selectedDocCount, setSelectedDocCount] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleExploreClick = (reportTitle, docCount) => {
        setSelectedReport(reportTitle);
        setSelectedDocCount(docCount);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedReport('');
        setSelectedDocCount(0);
    };

    return (
        <>
            <div className='w-full h-full pt-5 px-5 gap-4 flex flex-col'>
                <div>
                    <h1 className='font-bold text-xl text-[#152B52] text-start'>Reportes</h1>
                </div>
                <div>
                    <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="Report GE Tabs" sx={{
                                '& .Mui-selected': {
                                    color: '#000000',
                                    fontWeight: 600,
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#152B52',
                                },
                            }}>
                                <Tab label="Sede Central" {...a11yProps(0)} />
                                <Tab label="Dependencias" {...a11yProps(1)} />
                            </Tabs>
                        </Box>

                        <CustomTabPanel value={value} index={0}>
                            <div className='flex flex-col gap-3'>
                                <DynamicAccordion
                                    items={sedes}
                                    ReportCard={ReportCard}
                                    ReportDepen={ReportDepen}
                                    onExplore={handleExploreClick}
                                />
                            </div>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <div className='flex flex-col gap-3'>
                                <DynamicAccordion
                                    items={sedes} // Se mantiene "sedes" como array base
                                    ReportCard={ReportCard}
                                    ReportDepen={ReportDepen}
                                    onExplore={handleExploreClick}
                                />
                            </div>
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>

            <ReportDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                reportTitle={selectedReport}
                contDoc={selectedDocCount}
                navigate={navigate} // Pasa navigate al ReportDialog
            />
        </>
    );
};
ReportGE.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default ReportGE;
