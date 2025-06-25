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
    <div>
      <label htmlFor={filterKey} className="font-medium text-blue-800 mr-1.5">
        {props.children}
      </label>
      <input
        id={filterKey}
        type="text"
        className="border rounded px-3 py-1 bg-white text-purple-700 w-38"
        onChange={handleInputChange}
      />
    </div>
  );
}
