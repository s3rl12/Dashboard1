import React, { useState } from 'react';
import { List, ListItem } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import './OptionListCard.css';

const OptionListCard = ({
    icon,  // Prop para el icono
    primaryText = "x",
    checkboxItems = [],
    secondaryText = "x",
    necessaryValue = "x",
    onChange,
}) => {
    const [open, setOpen] = useState(false);  // Controlar el despliegue de las opciones
    const [checked, setChecked] = useState(null);  // Controlar el estado de la casilla seleccionada

    const handleClick = () => {
        setOpen(!open);  // Alternar la visibilidad del contenido
    };

    const handleToggle = (value) => () => {
        // Alternar la selección de las casillas
        if (checked === value) {
            setChecked(null);  // Desmarcar si ya estaba seleccionada
        } else {
            setChecked(value);  // Marcar la nueva casilla
        }
        onChange(value);  // Llamar la función onChange para pasar el valor seleccionado
    };

    return (
        <List
            component="div"
            disablePadding
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #ddd',
                borderRadius: '8px',
                margin: '10px 0',
            }}
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <img src={icon} alt="Icon" style={{ width: '3rem', height: '3rem' }} />
                </ListItemIcon>
                <Box display="flex" flexDirection="column">
                    <ListItemText primary={primaryText} />
                    <ListItemText secondary={secondaryText} />
                    <ListItemText secondary={`Cantidad: ${necessaryValue}`} />
                </Box>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#E1E1E1' }}>
                    {checkboxItems.map((item, index) => {
                        const labelId = `checkbox-list-label-${index}`;
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={handleToggle(item.value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked === item.value}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={item.text || `Item ${index + 1}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
};

export default OptionListCard;
