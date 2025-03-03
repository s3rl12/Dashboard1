// src/hooks/useListDF.jsx
import { useQuery } from '@tanstack/react-query';

const apiIp = import.meta.env.VITE_API;
const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);

// Exporta la función pura para poder usarla en otros componentes (por ejemplo, App.jsx)
export async function fetchListDF() {
  const res = await fetch(`http://${apiIp}/api/ges_areas/lista-areas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener las áreas');
  }

  const data = await res.json();
  // data: { message, status, token, data: [ ... ] }
  return data.data; // data.data es el array de áreas
}

// Este custom hook utiliza la función anterior, pero se dispara cuando se invoque
export function useListDF() {
  return useQuery({
    queryKey: ['list-areas'],
    queryFn: fetchListDF,
    staleTime: 1000 * 60,     // 1 minuto
    cacheTime: 1000 * 60 * 5,   // 5 minutos
  });
}
