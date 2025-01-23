import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const CustomAccordion = ({ navigate, sections = [], useFade = true, fadeTimeout = 400, ContDoc = 3 }) => {


  const handleExploreClick = () => {
    if (typeof navigate === 'function') {
      navigate('/reports'); // Usa navigate pasado como prop
    } else {
      console.error('navigate is not a function');
    }
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpansion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Arreglo de reportes
  const reports = [
    { title: 'CARGA LABORAL', value: 15 },
    { title: 'CONTROL DE PLAZOS', value: 30 },
    { title: 'DELITOS CON MAYOR INCIDENCIA', value: 120 },
  ];

  // Función ReportCard
  const ReportCard = ({ title, value }) => (

    <div className="flex flex-row gap-2 items-center">
      {/* Ícono centrado */}
      <div className="flex w-[35px] h-[35px] bg-[#fff] rounded items-center justify-center">
        <DescriptionRoundedIcon style={{ color: '#152B52' }} />
      </div>
      {/* Información del reporte */}
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-start">
          <div className="font-semibold text-xs text-start">{title}</div>
          <div className="font-medium text-[8px] text-gray-600 text-start">
            Cantidad documentos: <span className="text-black">{value}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-xs font-semibold text-[#152B52] hover:underline" onClick={handleExploreClick}>Explorar</button>
        </div>
      </div>
    </div>
  );

  // Usar el primer título de sections para todos los acordeones
  const accordionTitle = sections[0]?.title || "Pestaña";

  return (
    <div>
      {/* Generación dinámica de pestañas usando ContDoc */}
      {Array.from({ length: ContDoc }).map((_, index) => (
        <Accordion
          key={index}
          expanded={expandedIndex === index}
          onChange={() => handleExpansion(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            {/* Todos los acordeones tendrán el mismo título, tomado de la primera sección */}
            <Typography>
              {`${accordionTitle} - Despacho ${index + 1}`}
              <span className="text-[10px]"><br />1º FISCALIA PROVINCIAL PENAL CORPORATIVA DE TAMBOTAPA</span>

            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-3">
              {/* Generación de ReportCards dentro de cada pestaña */}
              {reports.map((report, idx) => (
                <ReportCard key={idx} title={report.title} value={report.value} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
CustomAccordion.propTypes = {
  navigate: PropTypes.func.isRequired, // navigate debe ser una función y es obligatorio
  sections: PropTypes.array, // sections debe ser un array, no es obligatorio
  useFade: PropTypes.bool, // useFade debe ser un booleano, no es obligatorio
  fadeTimeout: PropTypes.number, // fadeTimeout debe ser un número, no es obligatorio
  ContDoc: PropTypes.number, // ContDoc debe ser un número, no es obligatorio
};



export default CustomAccordion;
