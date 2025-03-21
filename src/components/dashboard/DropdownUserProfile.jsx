"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

import { useTheme } from "next-themes";
import { IconSunHigh, IconMoon, IconDeviceDesktop, IconArrowUpRight } from '@tabler/icons-react';
// Importar useAuth para obtener la información del usuario
import { useAuth } from "../../context/AuthContext";

export function DropdownUserProfile({ children, align = "start" }) {
  // Manejo de tema (opcional con next-themes)
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Obtener usuario del contexto
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="sm:!min-w-[200px]">
        {/* Se reemplaza el valor estático por el email del usuario */}
        <DropdownMenuLabel>{user?.email || "default@example.com"}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>Temas</DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value)}
              >
                <DropdownMenuRadioItem aria-label="Light Mode" value="light" iconType="check">
                  <IconSunHigh className="size-4 shrink-0" aria-hidden="true" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem aria-label="Dark Mode" value="dark" iconType="check">
                  <IconMoon className="size-4 shrink-0" aria-hidden="true" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem aria-label="System Mode" value="system" iconType="check">
                  <IconDeviceDesktop className="size-4 shrink-0" aria-hidden="true" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Perfil
            <IconArrowUpRight className="mb-1 ml-1 size-3 shrink-0 text-gray-500" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Configuracion
            <IconArrowUpRight className="mb-1 ml-1 size-3 shrink-0 text-gray-500" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Reporte
            <IconArrowUpRight className="mb-1 ml-1 size-3 shrink-0 text-gray-500" aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href="#" className="w-full">
              Sign out
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
