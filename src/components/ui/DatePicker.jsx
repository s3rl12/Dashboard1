// DatePicker.jsx (Tema blanco simplificado)

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import * as PopoverPrimitives from "@radix-ui/react-popover";
import { RiCalendar2Fill } from "@remixicon/react";

import { Calendar } from "./Calendar"; // Ajusta la ruta a tu Calendar.jsx
import { Button } from "./Button";     // Ajusta la ruta a tu botón
import { cx } from "@/lib/utils";      // Ajusta o elimina según tu proyecto

////////////////////////////////////////////////////////////////////////////////
// Helper: formatear fecha sin horas
////////////////////////////////////////////////////////////////////////////////
function formatDate(date, locale) {
  return format(date, "dd MMM, yyyy", { locale });
}

////////////////////////////////////////////////////////////////////////////////
// Trigger para abrir el popover
////////////////////////////////////////////////////////////////////////////////
const Trigger = React.forwardRef(function Trigger(
  {
    className,
    children,
    placeholder = "Select date",
    disabled,
    hasError,
    ...props
  },
  forwardedRef
) {
  return (
    <PopoverPrimitives.Trigger asChild>
      <button
        ref={forwardedRef}
        type="button"
        className={cx(
          "peer flex w-full cursor-pointer appearance-none items-center gap-x-2 truncate rounded-md border px-3 py-2 shadow-sm outline-none transition-all sm:text-sm",
          "bg-white",          // tema blanco
          "border-gray-300",
          "text-gray-900",
          "hover:bg-gray-50",
          "disabled:pointer-events-none disabled:bg-gray-100 disabled:text-gray-400",
          // Si deseas conservar algo de focus ring
          "focus:ring-2 focus:ring-blue-200",
          hasError && "ring-2 ring-red-200 border-red-500",
          className
        )}
        disabled={disabled}
        {...props}
      >
        <RiCalendar2Fill className="size-5 shrink-0 text-gray-800" />
        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-gray-900">
          {children || <span className="text-gray-400">{placeholder}</span>}
        </span>
      </button>
    </PopoverPrimitives.Trigger>
  );
});

////////////////////////////////////////////////////////////////////////////////
// Popover contenedor del calendario
////////////////////////////////////////////////////////////////////////////////
const CalendarPopover = React.forwardRef(function CalendarPopover(
  { align = "center", className, children, ...props },
  forwardedRef
) {
  return (
    <PopoverPrimitives.Portal>
      <PopoverPrimitives.Content
        ref={forwardedRef}
        sideOffset={10}
        side="bottom"
        align={align}
        avoidCollisions
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cx(
          "relative z-50 w-fit rounded-md border text-sm shadow-xl shadow-black/[2.5%]",
          "min-w-[calc(var(--radix-select-trigger-width)-2px)] max-w-[95vw]",
          "border-gray-200",
          "bg-white", // tema blanco
          "will-change-[transform,opacity]",
          "data-[state=closed]:animate-hide",
          "data-[state=open]:data-[side=bottom]:animate-slideDownAndFade data-[state=open]:data-[side=left]:animate-slideLeftAndFade data-[state=open]:data-[side=right]:animate-slideRightAndFade data-[state=open]:data-[side=top]:animate-slideUpAndFade",
          className
        )}
        {...props}
      >
        {children}
      </PopoverPrimitives.Content>
    </PopoverPrimitives.Portal>
  );
});

////////////////////////////////////////////////////////////////////////////////
// Preset container (opcional, si usas presets)
////////////////////////////////////////////////////////////////////////////////
function PresetContainer({ presets, onSelect, currentValue }) {
  if (!presets?.length) return null;

  const compareDates = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const isSelected = (preset) => {
    if (!currentValue) return false;
    return compareDates(currentValue, preset.date);
  };

  const handleClick = (preset) => {
    onSelect(preset.date);
  };

  return (
    <ul className="flex items-start gap-x-2 sm:flex-col">
      {presets.map((preset, index) => (
        <li key={index} className="sm:w-full sm:py-px">
          <button
            type="button"
            className={cx(
              "relative w-full overflow-hidden text-ellipsis whitespace-nowrap rounded border px-2.5 py-1.5 text-left text-base shadow-sm outline-none transition-all sm:border-none sm:py-2 sm:text-sm sm:shadow-none",
              "text-gray-700",
              "border-gray-200",
              "focus:ring-2 focus:ring-blue-200",
              "hover:bg-gray-100",
              isSelected(preset) && "bg-gray-100"
            )}
            onClick={() => handleClick(preset)}
          >
            {preset.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

////////////////////////////////////////////////////////////////////////////////
// SingleDatePicker
////////////////////////////////////////////////////////////////////////////////
function SingleDatePicker({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disabledDays,
  disableNavigation,
  className,
  placeholder = "Select date",
  hasError,
  translations = {},
  enableYearNavigation = false,
  locale = enUS,
  align = "center",
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value ?? defaultValue ?? undefined);
  const [month, setMonth] = useState(date);

  const initialDate = useMemo(() => date, [open]); // Para “Cancelar”

  useEffect(() => {
    setDate(value ?? defaultValue ?? undefined);
  }, [value, defaultValue]);

  useEffect(() => {
    if (date) {
      setMonth(date);
    }
  }, [date]);

  useEffect(() => {
    if (!open) {
      setMonth(date);
    }
  }, [open, date]);

  const onCancel = () => {
    setDate(initialDate);
    setOpen(false);
  };

  const onOpenChange = (nextOpen) => {
    if (!nextOpen) {
      onCancel();
    }
    setOpen(nextOpen);
  };

  const onDateChange = (selected) => {
    setDate(selected);
  };

  const onApply = () => {
    setOpen(false);
    onChange?.(date);
  };

  const formattedDate = date ? formatDate(date, locale) : null;

  return (
    <PopoverPrimitives.Root open={open} onOpenChange={onOpenChange}>
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        hasError={hasError}
      >
        {formattedDate}
      </Trigger>

      <CalendarPopover align={align}>
        <div className="flex">
          <div className="flex flex-col sm:flex-row sm:items-start">
            {presets?.length > 0 && (
              <div className="relative flex h-14 w-full items-center sm:h-full sm:w-40 border-b border-gray-200 sm:border-b-0 sm:border-r overflow-auto">
                <div className="absolute px-2 pr-2 sm:inset-0 sm:left-0 sm:py-2">
                  <PresetContainer
                    currentValue={date}
                    presets={presets}
                    onSelect={onDateChange}
                  />
                </div>
              </div>
            )}

            <div>
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={onDateChange}
                disabled={disabledDays}
                locale={locale}
                enableYearNavigation={enableYearNavigation}
                disableNavigation={disableNavigation}
                initialFocus
                {...props}
              />

              <div className="flex items-center gap-x-2 border-t border-gray-200 p-3">
                <Button
                  variant="secondary"
                  className="h-8 w-full"
                  type="button"
                  onClick={onCancel}
                >
                  {translations.cancel ?? "Cancel"}
                </Button>
                <Button
                  variant="primary"
                  className="h-8 w-full"
                  type="button"
                  onClick={onApply}
                >
                  {translations.apply ?? "Apply"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </PopoverPrimitives.Root>
  );
}

////////////////////////////////////////////////////////////////////////////////
// RangeDatePicker
////////////////////////////////////////////////////////////////////////////////
function RangeDatePicker({
  defaultValue,
  value,
  onChange,
  presets,
  disabled,
  disabledDays,
  disableNavigation,
  enableYearNavigation = false,
  locale = enUS,
  placeholder = "Select date range",
  hasError,
  translations = {},
  align = "center",
  className,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState(value ?? defaultValue ?? undefined);
  const [month, setMonth] = useState(range?.from);

  const initialRange = useMemo(() => range, [open]);

  useEffect(() => {
    setRange(value ?? defaultValue ?? undefined);
  }, [value, defaultValue]);

  useEffect(() => {
    if (range) {
      setMonth(range.from);
    }
  }, [range]);

  useEffect(() => {
    if (!open) {
      setMonth(range?.from);
    }
  }, [open, range]);

  const onCancel = () => {
    setRange(initialRange);
    setOpen(false);
  };

  const onOpenChange = (nextOpen) => {
    if (!nextOpen) {
      onCancel();
    }
    setOpen(nextOpen);
  };

  const onRangeChange = (selectedRange) => {
    setRange(selectedRange);
  };

  const displayRange = useMemo(() => {
    if (!range) return null;
    const fromString = range.from ? formatDate(range.from, locale) : "";
    const toString = range.to ? formatDate(range.to, locale) : "";
    return `${fromString} - ${toString}`;
  }, [range, locale]);

  const onApply = () => {
    setOpen(false);
    onChange?.(range);
  };

  return (
    <PopoverPrimitives.Root open={open} onOpenChange={onOpenChange}>
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        hasError={hasError}
      >
        {displayRange}
      </Trigger>

      <CalendarPopover align={align}>
        <div className="flex">
          <div className="flex flex-col overflow-x-auto sm:flex-row sm:items-start">
            {presets?.length > 0 && (
              <div className="relative flex h-16 w-full items-center sm:h-full sm:w-40 border-b border-gray-200 sm:border-b-0 sm:border-r overflow-auto">
                <div className="absolute px-3 sm:inset-0 sm:left-0 sm:p-2">
                  <PresetContainer
                    currentValue={range?.from} // Maneja la selección
                    presets={presets}
                    onSelect={(date) => {
                      // Ejemplo de preset -> asume single date
                      setRange({ from: date, to: date });
                    }}
                  />
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <Calendar
                mode="range"
                selected={range}
                onSelect={onRangeChange}
                month={month}
                onMonthChange={setMonth}
                numberOfMonths={2}
                disabled={disabledDays}
                disableNavigation={disableNavigation}
                enableYearNavigation={enableYearNavigation}
                locale={locale}
                initialFocus
                classNames={{
                  months: "flex flex-row divide-x divide-gray-200 overflow-x-auto",
                }}
                {...props}
              />

              <div className="border-t border-gray-200 p-3 sm:flex sm:items-center sm:justify-between">
                <p className="tabular-nums text-gray-900">
                  <span className="text-gray-700">
                    {translations.range ?? "Range"}:
                  </span>{" "}
                  <span className="font-medium">{displayRange}</span>
                </p>
                <div className="mt-2 flex items-center gap-x-2 sm:mt-0">
                  <Button
                    variant="secondary"
                    className="h-8 w-full sm:w-fit"
                    type="button"
                    onClick={onCancel}
                  >
                    {translations.cancel ?? "Cancel"}
                  </Button>
                  <Button
                    variant="primary"
                    className="h-8 w-full sm:w-fit"
                    type="button"
                    onClick={onApply}
                  >
                    {translations.apply ?? "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalendarPopover>
    </PopoverPrimitives.Root>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Helpers para “validatePresets”
////////////////////////////////////////////////////////////////////////////////
function validatePresets(presets, rules) {
  if (!presets || !presets.length) return;
  // Se omite la validación si no usas presets
}

////////////////////////////////////////////////////////////////////////////////
// Exports: DatePicker y DateRangePicker
////////////////////////////////////////////////////////////////////////////////

export function DatePicker({ presets, ...props }) {
  if (presets) {
    validatePresets(presets, props);
  }
  return <SingleDatePicker presets={presets} {...props} />;
}

export function DateRangePicker({ presets, ...props }) {
  if (presets) {
    validatePresets(presets, props);
  }
  return <RangeDatePicker presets={presets} {...props} />;
}
