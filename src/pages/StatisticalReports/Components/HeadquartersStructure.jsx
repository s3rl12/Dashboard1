import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import sedeService from '../../../services/api/sede-list/sedeService';
import dispatchesSedeService from '../../../services/api/dispatchesSede-list/dispatchesSedeService';
import dispatchesDependencyService from '../../../services/api/dispatchesDependency-list/dispatchesDependencyService'; // Nueva importación
import HeadquartersCard from '../StructureCard/HeadquartersCard';
import DispatchCard from '../StructureCard/DispatchCard';

const HeadquartersStructure = ({ navigate }) => { // Recibe navigate como prop
  const [sedes, setSedes] = useState([]); // Estado para las sedes
  const [dependencies, setDependencies] = useState({}); // Estado para las dependencias por sede
  const [dispatches, setDispatches] = useState({}); // Estado para los despachos por dependencia

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await sedeService.getAllSedes();
        setSedes(response.data); // Almacenamos las sedes
      } catch (error) {
        console.error('Error fetching sedes:', error);
      }
    };

    fetchSedes(); // Llamamos a la función al montar el componente
  }, []);

  const fetchDependenciesAndDispatches = async (sedeId) => {
    // Obtener dependencias de la sede
    if (!dependencies[sedeId]) {
      try {
        const response = await dispatchesSedeService.getDependenciesBySede(sedeId);
        setDependencies((prev) => ({
          ...prev,
          [sedeId]: response.data.dependencias,
        }));
      } catch (error) {
        console.error(`Error fetching dependencies for sede ${sedeId}:`, error);
      }
    }

    // Obtener despachos solo después de que las dependencias han sido cargadas
    if (dependencies[sedeId] && !dispatches[sedeId]) {
      try {
        const dispatchesPromises = dependencies[sedeId]?.map((dep) =>
          dispatchesDependencyService.getDispatchesByDependency(dep.id)
        );

        const dispatchesData = await Promise.all(dispatchesPromises);

        const dispatchesByDependency = {};
        dispatchesData.forEach((data, index) => {
          const depId = dependencies[sedeId][index].id;
          dispatchesByDependency[depId] = data.despachos;
        });

        setDispatches((prev) => ({
          ...prev,
          [sedeId]: dispatchesByDependency,
        }));
      } catch (error) {
        console.error(`Error fetching dispatches for sede ${sedeId}:`, error);
      }
    }
  };
  
  return (
    <div>
      {sedes.map((sede) => (
        <Accordion key={sede.id} onChange={() => fetchDependenciesAndDispatches(sede.id)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <HeadquartersCard sede={sede} />
          </AccordionSummary>
          <AccordionDetails>
            {dependencies[sede.id] ? (
              dependencies[sede.id].map((dep) => (
                <div key={dep.id}>
                  {/* Enviar navigate como prop a DispatchCard */}
                  <DispatchCard
                    dispatch={{
                      title: dep.nombre_fiscalia,
                      value: dep.cod_depen, // Se envía cod_depen como "value"
                      
                    }}
                    dependencyId={dep.id}
                    navigate={navigate} // Pasar navigate al componente
                  />
                </div>
              ))
            ) : (
              <Typography>Cargando dependencias...</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
    
  );
  
};

export default HeadquartersStructure;
