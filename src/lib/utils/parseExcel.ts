import * as XLSX from "xlsx";

export default async function parseExcel(file: File): Promise<[]> {
  
  // Reads an excel file
  // Return a TS object containing the parsed data
  return new Promise((resolve, reject) => {
    
    const reader = new FileReader();

    reader.onload = (event) => {
      
      try {
        
        // Read failed
        const data = event.target?.result;
        if (!data || !(data instanceof ArrayBuffer)) {
          reject(new Error("Failed to read file. Check file type."));
          return;
        }

        // Parse workbook from ArrayBuffer
        const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet) as [];
        resolve(jsonData);
        
      } catch (err) {
        reject(err);
      }
      
    };
    
    reader.onerror = () => reject(new Error("File could not be read"));
    reader.readAsArrayBuffer(file);
    
  });
  
}
