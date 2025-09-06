"use client";

interface InputFieldProps 
extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error: string | null;
  required?: boolean;
}

export default function InputField(props: InputFieldProps) {
  
  const { label, name, required, error } = props;
  
  return (
    <div className="space-y-1">
      
      {/*Label*/}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} 
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {/*Input*/}
      <input id={name}
        className={` w-full px-4 py-3  border border-gray-300 rounded-lg bg-white text-gray-900
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          hover:border-gray-400 transition-colors duration-200
          ${error === name ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        {...props}
      />
      
    </div>
  );
}
