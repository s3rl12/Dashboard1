// FileUpload.jsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconFileZip, IconTrash, IconEye } from "@tabler/icons-react";
import { Divider } from "@tremor/react";
import * as XLSX from "xlsx";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../../../../components/dashboard/Select";
import { Button } from "@/components/dashboard/Button";
import InputSearch from "./inputSearch";
import { Filters } from "./FiltersUI";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../../../components/ui/Dialog";

import Preview from "../../../../components/preview-data/preview";
import { useToast } from "../../../../lib/useToast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const data = [
  { value: "chocolate", label: "🍫 Chocolate" },
  { value: "cheese", label: "🧀 Cheese" },
  { value: "fondue", label: "🫕 Fondue" },
  { value: "milk", label: "🥛 Milk" },
];

/**
 * Componente FileUpload
 * @param {Function} uploadService - Función para subir el archivo a la API (ej: importUserService.importUsers)
 */
export default function FileUpload({ uploadService }) {
  const [files, setFiles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("recent");

  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  // 4 selects
  const [select1, setSelect1] = useState("");
  const [select2, setSelect2] = useState("");
  const [select3, setSelect3] = useState("");
  const [select4, setSelect4] = useState("");

  const resetAllSelects = () => {
    setSelect1("");
    setSelect2("");
    setSelect3("");
    setSelect4("");
  };

  // Vista previa
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Manejo de la vista previa (parsear Excel con XLSX)
  const handlePreview = async (file) => {
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setPreviewData(jsonData);
        setIsPreviewOpen(true);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error parsing file:", error);
      toast?.({
        variant: "error",
        title: "Error previewing file",
        description: error.message,
      });
    }
  };

  // Renderizamos la lista de archivos
  const filesList = files.map((file) => (
    <li
      key={file.path || file.name}
      className="relative rounded-tremor-default border border-tremor-border bg-tremor-background p-4 shadow-tremor-input dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-input"
    >
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
        {/* Botón eliminar */}
        <button
          type="button"
          className="rounded-tremor-small p-2 text-tremor-content-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:text-dark-tremor-content"
          aria-label="Remove file"
          onClick={() =>
            setFiles((prev) =>
              prev.filter((f) => f.path !== file.path && f.name !== file.name)
            )
          }
        >
          <IconTrash className="size-5 shrink-0" aria-hidden />
        </button>
        {/* Botón ver (abre dialog) */}
        <button
          type="button"
          className="rounded-tremor-small p-2 text-tremor-content-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:text-dark-tremor-content"
          aria-label="Preview file"
          onClick={() => handlePreview(file)}
        >
          <IconEye className="size-5 shrink-0" aria-hidden />
        </button>
      </div>
      <div className="flex items-center space-x-3 pr-12">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tremor-small bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle">
          <IconFileZip
            className="size-5 text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis"
            aria-hidden
          />
        </span>
        <div>
          <p className="text-tremor-label font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {file.path || file.name}
          </p>
          <p className="mt-0.5 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
            {file.size} bytes
          </p>
        </div>
      </div>
    </li>
  ));

  /**
   * handleUpload:
   * - Llamamos a la prop "uploadService" para subir el primer archivo (o todos).
   */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast?.({
        variant: "error",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    // Muestra toast de “loading”
    const loadingToast = toast?.({
      variant: "loading",
      title: "Uploading...",
      description: "Your file is being uploaded. Please wait.",
      disableDismiss: true,
    });

    try {
      // 1. Llamamos a la función que viene por prop
      //    Por ejemplo, subimos solo el primer archivo: files[0]
      //    o subimos todos si la API lo soporta (depende de tu caso)
      await uploadService(files[0]);

      // 2. Cierra el toast de loading
      loadingToast?.dismiss();

      // 3. Muestra toast de success
      toast?.({
        variant: "success",
        title: "File uploaded",
        description: "Your file was successfully uploaded!",
      });

      // Limpia files
      setFiles([]);
    } catch (error) {
      loadingToast?.dismiss();
      toast?.({
        variant: "error",
        title: "Upload error",
        description: error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="sm:mx-auto sm:max-w-full">
      <form action="#" method="post" onSubmit={handleUpload}>
        <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Set up your first cloud storage
        </h2>
        <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>

        <div className="flex w-full items-baseline justify-between gap-4">
          <InputSearch />
          <Filters
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Select 1 */}
              <Select value={select1} onValueChange={setSelect1}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select 1" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Select 2 */}
              <Select value={select2} onValueChange={setSelect2}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select 2" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Select 3 */}
              <Select value={select3} onValueChange={setSelect3}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select 3" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Select 4 */}
              <Select value={select4} onValueChange={setSelect4}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select 4" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Botón para resetear selects */}
              <Button
                type="button"
                variant="secondary"
                className="whitespace-nowrap"
                onClick={resetAllSelects}
              >
                Reset all
              </Button>
            </div>
          </div>

          {/* Sección de Drag & Drop */}
          <div className="col-span-full">
            <label
              htmlFor="file-upload-2"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              File(s) upload
            </label>
            <div
              {...getRootProps()}
              className={classNames(
                isDragActive
                  ? "border-tremor-brand bg-tremor-brand-faint dark:border-dark-tremor-brand dark:bg-dark-tremor-brand-faint"
                  : "",
                "mt-2 flex justify-center rounded-tremor-default border border-dashed border-gray-300 px-6 py-20 dark:border-dark-tremor-border"
              )}
            >
              <div>
                <IconFileZip
                  className="mx-auto h-12 w-12 text-tremor-content-subtle dark:text-dark-tremor-content"
                  aria-hidden
                />
                <div className="mt-4 flex text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                  <p>Drag and drop or</p>
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer rounded-tremor-small pl-1 font-medium text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand"
                  >
                    <span>choose file(s)</span>
                    <input
                      {...getInputProps()}
                      id="file-upload-2"
                      name="file-upload-2"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">to upload</p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-tremor-label leading-5 text-tremor-content dark:text-dark-tremor-content sm:flex sm:items-center sm:justify-between">
              <span>All file types are allowed to upload.</span>
              <span className="pl-1 sm:pl-0">Max. size per file: 50MB</span>
            </p>
            {filesList.length > 0 && (
              <>
                <h4 className="mt-6 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  File(s) to upload
                </h4>
                <ul role="list" className="mt-4 space-y-4">
                  {filesList}
                </ul>
              </>
            )}
          </div>
        </div>

        <Divider className="my-4" />

        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            className="whitespace-nowrap rounded-tremor-small border border-tremor-border px-4 py-2 text-tremor-default font-medium text-tremor-content shadow-tremor-input transition-all hover:bg-tremor-background-muted hover:text-tremor-content-emphasis dark:border-dark-tremor-border dark:text-dark-tremor-content dark:shadow-dark-tremor-input hover:dark:bg-dark-tremor-background-muted hover:dark:text-dark-tremor-content-emphasis"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input transition-all hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Upload
          </button>
        </div>
      </form>

      {/* Dialog para vista previa */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview of the file</DialogTitle>
            <DialogDescription>See the contents of your Excel file</DialogDescription>
          </DialogHeader>
          <Preview data={previewData} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
