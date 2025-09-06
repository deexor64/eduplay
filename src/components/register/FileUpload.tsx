import { InputHTMLAttributes } from "react";

interface FileUploadProps {
  handleUpload: (file: File | null) => void
}

export default function FileUpload(props: FileUploadProps) {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    props.handleUpload(file);
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        className={`
          block w-full text-sm text-gray-700
          file:mr-4 file:py-3 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-600
          hover:file:bg-blue-100
          file:cursor-pointer
          border border-gray-300 rounded-lg
          bg-gray-50 hover:bg-gray-100
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200
        `}
        accept=".xlsx,.xls"
      />
    </div>

  );
}
