// FilterHeader.jsx
import React, { useState } from "react";
import { format } from "date-fns"; // Para formatear fe_inicio y fe_fin
import { Input } from "../../../../components/ui/Input";
import { DateRangePicker } from "../../../../components/ui/DatePicker";
import { Button } from "../../../../components/ui/Button";
import { IconFileDownload } from '@tabler/icons-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '../../../../components/ui/Dialog';
import { generatePdfFromElement } from '../../TaxDetails/components/ViewPDF/pdfUtils';

// 1. Importar el hook para obtener las sedes y el hook para carga fiscal
import { useListDF } from "../../../../hooks/useListDF";
import { useCargaFiscal } from "../../../../hooks/useCargaFiscal";

// Importar componentes Select (para usar en SelectSearch)
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/dashboard/Select";

/**
 * Componente reutilizable que encapsula un Select con funcionalidad de búsqueda.
 * - Recibe un array de strings en `options`.
 * - Filtra en tiempo real según `searchText`.
 * - Llama a `onChange(value)` cuando el usuario selecciona un ítem.
 */
const SelectSearch = ({ placeholder, options, onChange }) => {
  const [searchText, setSearchText] = useState("");

  // Filtrar las opciones en tiempo real
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-80">
      <Select onValueChange={(val) => {
        setSearchText("");
        onChange?.(val);
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {/* Input para filtrar */}
          <div className="px-2 py-1">
            <Input
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {/* Listado de opciones filtradas */}
          {filteredOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function FilterHeader({ pdfTargetId }) {
  // Estado para el PDF
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  // 2. Llamar al hook useListDF para obtener las sedes y sus dependencias
  const { data: sedes = [], isLoading, error } = useListDF();

  // 3. Estados locales para guardar la sede y dependencia seleccionadas
  const [selectedSedeName, setSelectedSedeName] = useState("");
  const [selectedDepName, setSelectedDepName] = useState("");

  // 4. Estados para el rango de fechas (fe_inicio, fe_fin)
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 10)),
    to: new Date(),
  });

  // 5. Construir el array de opciones para el Select de Sede (usamos 'sede.nombre')
  const sedeOptions = sedes.map((sede) => sede.nombre);

  // 6. Buscar la sede seleccionada para filtrar dependencias
  const selectedSedeObj = sedes.find((sede) => sede.nombre === selectedSedeName);

  // 7. Construir el array de opciones para el Select de Dependencia (usamos 'dep.fiscalia')
  const dependenciaOptions = selectedSedeObj
    ? selectedSedeObj.dependencias.map((dep) => dep.fiscalia)
    : [];

  // 8. Preparar el hook useCargaFiscal para hacer la llamada manual (enabled: false)
  //    Al cambiar los parámetros, se refetch manualmente.
  const { refetch } = useCargaFiscal(
    {
      // Convertir 'selectedSedeObj' a su id, si existe
      id_sede: selectedSedeObj ? selectedSedeObj.id : null,
      // Formatear fe_inicio y fe_fin
      fe_inicio: dateRange.from
        ? format(dateRange.from, "yyyy-MM-dd 00:00:00")
        : null,
      fe_fin: dateRange.to
        ? format(dateRange.to, "yyyy-MM-dd 23:59:59")
        : null,
      estado: null, // Dato estático
      // Buscar la dependencia seleccionada (id)
      id_dependencia: (() => {
        if (!selectedDepName) return null;
        if (!selectedSedeObj) return null;
        // Buscar la dependencia cuyo 'fiscalia' coincida
        const depObj = selectedSedeObj.dependencias.find(
          (d) => d.fiscalia === selectedDepName
        );
        return depObj ? depObj.id : null;
      })(),
    },
    {
      enabled: false, // Se activará manualmente al dar clic en "Buscar.."
    }
  );

  // Maneja el clic en "Imprimir"
  const handlePrintClick = async () => {
    try {
      const url = await generatePdfFromElement(pdfTargetId);
      setPdfUrl(url);
      setIsPdfDialogOpen(true);
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  // Función para manejar el clic en "Buscar.."
  const handleBuscar = async () => {
    console.log("Filtros aplicados");
    console.log("Sede:", selectedSedeName);
    console.log("Dependencia:", selectedDepName);
    console.log("Date Range:", dateRange);

    // Llamar a refetch para actualizar la data en 'carga-fiscal'
    // CargoReportS se re-renderizará con los datos nuevos
    await refetch();
  };

  return (
    <div className="space-y-2">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        REPORTE GENERAL
      </h3>
      <p>Se genera el reporte general de todas las áreas</p>

      <div className="block md:flex md:items-center md:justify-between">
        <div className="flex items-center w-full gap-2">
          {/* 7. Primer SelectSearch (Sede) */}
          <SelectSearch
            placeholder="Seleccione sede..."
            options={sedeOptions}
            onChange={(val) => {
              setSelectedSedeName(val);
              // Resetear dependencia seleccionada al cambiar de sede
              setSelectedDepName("");
            }}
          />

          {/* 8. Segundo SelectSearch (Dependencia), filtra por la sede seleccionada */}
          <SelectSearch
            placeholder="Seleccione dependencia..."
            options={dependenciaOptions}
            onChange={(val) => setSelectedDepName(val)}
          />

          {/* DateRangePicker con navegación por año y mes */}
          <div className="lg:flex lg:items-center lg:space-x-3">
            <DateRangePicker
              enableYearNavigation={true}
              disableNavigation={false}
              value={dateRange}
              onChange={setDateRange} // Actualiza el estado local
              id="date_1"
              name="date_1"
              className="border-tremor-border dark:border-dark-tremor-border"
            />
          </div>

          {/* Botón extra al final de la fila de filtros */}
          <Button
            variant="secondary"
            className="rounded-tremor-small py-1.5 px-3 font-medium"
            onClick={handleBuscar}
          >
            Buscar..
          </Button>
        </div>

        {/* Botón "Imprimir" */}
        <Button
          variant="secondary"
          className="flex items-center justify-center gap-x-1 rounded-tremor-small py-1.5 px-3 font-medium"
          onClick={handlePrintClick}
        >
          <IconFileDownload
            className="size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
            aria-hidden
          />
          Imprimir
        </Button>
      </div>

      {/* Dialog para mostrar la previsualización del PDF */}
      <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vista Previa PDF</DialogTitle>
            <DialogDescription>
              Revisa el contenido antes de imprimir o descargar.
            </DialogDescription>
          </DialogHeader>

          {/* Contenedor para el PDF (un <iframe> con src=pdfUrl) */}
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="Previsualización PDF"
              style={{ width: "100%", height: "80vh" }}
            />
          ) : (
            <p>Cargando PDF...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
