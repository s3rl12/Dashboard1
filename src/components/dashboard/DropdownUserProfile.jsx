// DropdownUserProfile.jsx
"use client";

import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubMenu, DropdownMenuSubMenuContent, DropdownMenuSubMenuTrigger, DropdownMenuTrigger } from "./DropdownMenu";
import { ArrowUpRight, Monitor, Moon, Sun } from "lucide-react";
// Ejemplo: si no usas next-themes, comenta esto:
import { useTheme } from "next-themes";

export function DropdownUserProfile({ children, align = "start" }) {
  // Manejo de tema (opcional con next-themes)
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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
        <DropdownMenuLabel>emma.stone@acme.com</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>Theme</DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value)}
              >
                <DropdownMenuRadioItem aria-label="Light Mode" value="light" iconType="check">
                  <Sun className="size-4 shrink-0" aria-hidden="true" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem aria-label="Dark Mode" value="dark" iconType="check">
                  <Moon className="size-4 shrink-0" aria-hidden="true" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem aria-label="System Mode" value="system" iconType="check">
                  <Monitor className="size-4 shrink-0" aria-hidden="true" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Changelog
            <ArrowUpRight className="mb-1 ml-1 size-3 shrink-0 text-gray-500" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Documentation
            <ArrowUpRight className="mb-1 ml-1 size-3 shrink-0 text-gray-500" aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Join Slack community
            <ArrowUpRight className="mb-1 ml-1 size-3 shrink-0 text-gray-500" aria-hidden="true" />
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
