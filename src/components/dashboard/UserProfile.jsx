// UserProfile.jsx
"use client";

import React from "react";
import { Button } from "./Button";
import { cx, focusRing } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { DropdownUserProfile } from "./DropdownUserProfile";

export function UserProfile() {
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex w-full items-center justify-between rounded-md px-1 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
          focusRing
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700"
            aria-hidden="true"
          >
            AD
          </span>
          <span>Administrador</span>
        </span>
        <ChevronsUpDown
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  );
}
