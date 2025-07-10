import { useState, ChangeEvent, ReactNode } from "react";

interface InputFilterProps {
  filterKey: string;
  setFilter: (prev: any) => void;
  children: ReactNode
}

export default function InputFilter(props: InputFilterProps) {
 
  const { filterKey, setFilter } = props;
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue: string | undefined= e.target.value;
    (newValue === "") ? newValue = undefined : newValue = newValue.toLowerCase();
    setFilter((prev: any) => ({
      ...prev,
      [filterKey]: newValue,
    }));
  };

  return (
    <div className="flex flex-col gap-1 min-w-[160px]">
      <label htmlFor={filterKey} className="font-semibold text-blue-900 mb-0.5">
        {props.children}
      </label>
      <input
        id={filterKey}
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-purple-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150 outline-none placeholder:text-gray-400"
        onChange={handleInputChange}
        placeholder="Type to filter..."
      />
    </div>
  );
}
