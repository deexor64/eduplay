"use client";

interface OptionFieldProps 
extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  values: string[];
  error: string | null;
  required?: boolean;
}

export default function OptionField(props: OptionFieldProps) {
  
  const { label, name, values, required, error } = props;
  
  return (
    <div className="space-y-1">
      
      {/*Label*/}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} 
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {/*Input*/}
      <select
        id={name}
        className={` w-full px-2 py-2  border border-gray-300 rounded-lg bg-white text-gray-900
          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          hover:border-gray-400 transition-colors duration-200
          ${error === name ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        {...props}
      >
        {values.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
      
    </div>
  );
}
