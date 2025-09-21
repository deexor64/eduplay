import { ChangeEvent, useRef, useState } from "react";

interface OptionFilterProps {
  filterKey: string;
  values: string[];
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function OptionFilter(props: OptionFilterProps) {

  const { filterKey, values, setFilter, setTriggerFilter } = props;
  
  const [selected, setSelected] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {

    let newValue: string | undefined = e.target.value;
    newValue = newValue === "All" ? undefined : newValue;
    
    newValue ? setSelected(true) : setSelected(false);

    setFilter((prev: any) => ({
      ...prev,
      [filterKey]: newValue,
    }));

    // Debounce trigger
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTriggerFilter(true);
    }, 2000); 
  };

  return (
    <div className="ml-8 flex flex-col gap-1 min-w-[120px]">
      <label htmlFor={filterKey} className="font-semibold text-blue-900 mb-0.5 text-sm">
        {props.children}
      </label>
      <select
        id={filterKey}
        className={`${selected ? 'border-blue-600 focus:ring-blue-600' : 'border-gray-300 focus:ring-gray-300'} focus:ring-1 border-1 rounded-lg px-2 py-1 
          bg-white text-purple-800 shadow-sm transition-all duration-150 outline-none text-sm`}
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
