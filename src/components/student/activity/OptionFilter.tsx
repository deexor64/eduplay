import { ChangeEvent, useRef, useState } from "react";

interface OptionFilterProps {
  filterKey: string;
  values: string[];
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function StudentOptionFilter(props: OptionFilterProps) {

  const { filterKey, values, setFilter, setTriggerFilter} = props;
  
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
    <div className="flex flex-col gap-2 min-w-[140px]">
      <label htmlFor={filterKey} className="font-bold text-purple-800 text-sm flex items-center gap-1">
        {props.children}
      </label>
      <select
        id={filterKey}
        className={`${selected ? 'border-pink-600 focus: ring-pink-600' : 'border-purple-300 focus: ring-purple-300'} focus:ring-1 border-2 rounded-xl px-3 py-1 
          bg-white text-purple-800 shadow-md transition-all duration-200 outline-none text-sm font-medium`}
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
