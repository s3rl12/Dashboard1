// FilterHeader.jsx
import React, { useState } from "react";
import { format } from "date-fns";
import { Input } from "../../../../components/ui/Input";
import { DateRangePicker } from "../../../../components/ui/DatePicker";
import { Button } from "../../../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/Dialog";
import { IconFileUpload, IconFileTypePdf } from "@tabler/icons-react";
import { useListDF } from "../../../../hooks/useListDF";
import { useToast } from "../../../../lib/useToast";
// Nueva importación: PDFViewer de React-PDF
import { PDFViewer } from "@react-pdf/renderer";
import { generatePdfFromMultipleElements } from "../../TaxDetails/components/ViewPDF/pdfUtils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/dashboard/Select";

const SelectSearch = ({ placeholder, options, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="w-80">
      <Select
        onValueChange={(val) => {
          setSearchText("");
          onChange?.(val);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          <div className="px-2 py-1">
            <Input
              placeholder="Buscar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function FilterHeader({
  containerIds = [],
  useCargaHook,
  taxPdfComponent: TaxPdfComponent,
  taxPdfData,
  // Nuevo parámetro
  cantidadDelitos,
}) {
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isTaxPdfDialogOpen, setIsTaxPdfDialogOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast, dismiss } = useToast();

  const { data: sedes = [] } = useListDF();

  const [selectedSedeName, setSelectedSedeName] = useState("");
  const [selectedDepName, setSelectedDepName] = useState("");
  const [dateRange, setDateRange] = useState(null);

  const sedeOptions = sedes.map((sede) => ({
    label: sede.nombre,
    value: sede.nombre,
  }));
  const selectedSedeObj = sedes.find((sede) => sede.nombre === selectedSedeName);

  const dependenciaOptions = selectedSedeObj
    ? selectedSedeObj.dependencias.map((dep) => ({
      label: dep.fiscalia,
      value: dep.id,
    }))
    : [];

  // Actualización del objeto de parámetros: se renombra id_sede a id_sedes y se agrega cantidadDelitos si existe
  const { refetch } = useCargaHook(
    {
      id_sedes: selectedSedeObj ? selectedSedeObj.id : null,
      fe_inicio: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd 00:00:00") : null,
      fe_fin: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd 23:59:59") : null,
      estado: null,
      id_dependencia: selectedDepName ? Number(selectedDepName) : null,
      ...(cantidadDelitos ? { cantidadDelitos } : {}),
    },
    { enabled: false }
  );

  // Función para imprimir usando html2canvas/jsPDF (ya existente)
  const handlePrintClick = async () => {
    const loadingToast = toast({
      variant: "loading",
      title: "Generando PDF",
      description: "Espere mientras se generan las páginas...",
    });

    try {
      const url = await generatePdfFromMultipleElements(containerIds);
      setPdfUrl(url);
      setIsPdfDialogOpen(true);
      dismiss(loadingToast.id);
    } catch (error) {
      dismiss(loadingToast.id);
      console.error("Error generando PDF:", error);
      toast({
        variant: "error",
        title: "Error generando PDF",
        description: "Ocurrió un error al generar el PDF.",
      });
    }
  };

  // Nueva función para mostrar el PDF basado en TaxBurdenSchemeD
  const handleTaxPdfClick = () => {
    if (!taxPdfData || Object.keys(taxPdfData).length === 0) {
      toast({
        variant: "warning",
        title: "No hay datos para generar el PDF",
        description: "No se encontraron datos de dependencia.",
      });
      return;
    }
    setIsTaxPdfDialogOpen(true);
  };

  const handleBuscar = async () => {
    if (!selectedSedeName) {
      toast({
        variant: "warning",
        title: "Falta seleccionar sede",
        description: "Por favor, seleccione una sede antes de buscar.",
      });
      return;
    }
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        variant: "warning",
        title: "Falta seleccionar rango de fecha",
        description: "Por favor, seleccione un rango de fechas antes de buscar.",
      });
      return;
    }

    setIsSearching(true);
    const loadingToast = toast({
      variant: "loading",
      title: "Cargando",
      description: "Realizando la búsqueda...",
    });

    try {
      await refetch();
      dismiss(loadingToast.id);
      toast({
        variant: "success",
        title: "Búsqueda exitosa",
        description: "La información se actualizó correctamente.",
      });
    } catch (error) {
      dismiss(loadingToast.id);
      toast({
        variant: "error",
        title: "Error en la búsqueda",
        description: "Ocurrió un error al actualizar la información.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        REPORTE GENERAL
      </h3>
      <p>Se genera el reporte general de todas las áreas</p>

      <div className="block md:flex md:items-center md:justify-between">
        <div className="flex items-center w-full gap-2">
          <SelectSearch
            placeholder="Seleccione sede..."
            options={sedeOptions}
            onChange={(val) => {
              setSelectedSedeName(val);
              setSelectedDepName("");
            }}
          />
          <SelectSearch
            placeholder="Seleccione dependencia..."
            options={dependenciaOptions}
            onChange={(val) => setSelectedDepName(val)}
          />
          <div className="lg:flex lg:items-center lg:space-x-3">
            <DateRangePicker
              enableYearNavigation
              disableNavigation={false}
              value={dateRange}
              onChange={setDateRange}
              id="date_1"
              name="date_1"
              className="border-tremor-border dark:border-dark-tremor-border"
            />
          </div>
          <Button
            variant="secondary"
            className="rounded-tremor-small py-1.5 px-3 font-medium"
            onClick={handleBuscar}
            disabled={isSearching}
          >
            Buscar..
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-x-1 rounded-tremor-small py-1.5 px-3 font-medium"
            disabled={isSearching}
          >
            <IconFileUpload
              className="size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
              aria-hidden
            />
            Exportar
          </Button>
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-x-1 rounded-tremor-small py-1.5 px-3 font-medium"
            onClick={handlePrintClick}
            disabled={isSearching}
          >
            <IconFileTypePdf
              className="size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
              aria-hidden
            />
            Imprimir
          </Button>
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-x-1 rounded-tremor-small py-1.5 px-3 font-medium"
            onClick={handleTaxPdfClick}
          >
            <IconFileTypePdf
              className="size-5 shrink-0 text-tremor-content dark:text-dark-tremor-content"
              aria-hidden
            />
            PDF
          </Button>
        </div>
      </div>

      {/* Dialog para previsualizar PDF generado con html2canvas/jsPDF */}
      <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vista Previa PDF</DialogTitle>
            <DialogDescription>
              Revisa el contenido antes de imprimir o descargar.
            </DialogDescription>
          </DialogHeader>
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

      {/* Dialog para previsualizar PDF basado en TaxBurdenSchemeD */}
      <Dialog open={isTaxPdfDialogOpen} onOpenChange={setIsTaxPdfDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vista Previa PDF - Tax Burden Scheme D</DialogTitle>
            <DialogDescription>
              Revisa el contenido generado antes de imprimir o descargar.
            </DialogDescription>
          </DialogHeader>
          {taxPdfData && Object.keys(taxPdfData).length > 0 ? (
            <PDFViewer style={{ width: "100%", height: "80vh" }}>
              <TaxPdfComponent {...taxPdfData} />
            </PDFViewer>
          ) : (
            <p>Cargando PDF...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
