// utils/pdfUtils.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Genera un PDF a partir del elemento con el id dado
 * y retorna la URL Blob para mostrarlo en un <iframe> o descargarlo.
 */
export async function generatePdfFromElement(elementId) {
    const input = document.getElementById(elementId);
    if (!input) {
        throw new Error(`No se encontró ningún elemento con id="${elementId}"`);
    }

    // Aumentar la resolución: scale=3 (o el valor que prefieras)
    const canvas = await html2canvas(input, {
        scale: 3,
    });

    // Convertir a imagen base64
    const imgData = canvas.toDataURL("image/png");

    // Crear el PDF (A4 en puntos)
    const pdf = new jsPDF("p", "pt", "a4");

    // Obtener dimensiones de la página
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calcular la relación de aspecto de la imagen
    const imgProps = pdf.getImageProperties(imgData);

    // Dejar 10 puntos de margen a izquierda y derecha => ancho disponible = (pageWidth - 20)
    const finalImgWidth = pageWidth - 60;
    // Ajustar la altura en función de la relación de aspecto
    const finalImgHeight = (imgProps.height * finalImgWidth) / imgProps.width;

    // Agregar la imagen con x=10 (margen izq), y=0
    // Así queda "centrada" horizontalmente con 10 de margen a cada lado.
    pdf.addImage(imgData, "PNG", 30, 0, finalImgWidth, finalImgHeight);

    // Retornar como BlobURL para mostrarlo en un <iframe> o descargarlo
    return pdf.output("bloburl");
}
