// src/hooks/useListUser.jsx
import { useQuery } from '@tanstack/react-query';

const apiIp = import.meta.env.VITE_API;
const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);

// Exporta la función pura para poder usarla en otros componentes (por ejemplo, App.jsx)
export async function fetchListUser() {
  const res = await fetch(`http://${apiIp}/api/ges_user/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los usuarios');
  }

  const data = await res.json();
  // data: { message, status, token, data: [ ... ] }
  return data.data; // data.data es el array de usuarios
}

// Este custom hook utiliza la misma función, pero se dispara cuando se invoque
export function useListUser() {
  return useQuery({
    queryKey: ['list-user'],
    queryFn: fetchListUser,
    staleTime: 1000 * 60,     // 1 minuto
    cacheTime: 1000 * 60 * 5,   // 5 minutos
  });
}
