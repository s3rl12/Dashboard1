// src/hooks/useListRol.jsx
import { useQuery } from '@tanstack/react-query';

const apiIp = import.meta.env.VITE_API;
const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);

// Exporta la función pura para poder usarla en otros componentes (por ejemplo, App.jsx)
export async function fetchListRol() {
  const res = await fetch(`http://${apiIp}/api/ges_user/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los roles');
  }

  const data = await res.json();
  // data: { message, status, token, data: [ ... ] }
  return data.data; // data.data es el array de roles
}

// Este custom hook utiliza la misma función, pero se dispara cuando se invoque
export function useListRol() {
  return useQuery({
    queryKey: ['list-rol'],
    queryFn: fetchListRol,
    staleTime: 1000 * 60,     // 1 minuto
    cacheTime: 1000 * 60 * 5,   // 5 minutos
  });
}
