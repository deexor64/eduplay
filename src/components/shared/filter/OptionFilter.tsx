import { ChangeEvent, useRef } from "react";

interface OptionFilterProps {
  filterKey: string;
  values: string[];
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function OptionFilter(props: OptionFilterProps) {

  const { filterKey, values, setFilter, setTriggerFilter } = props;
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {

    let newValue: string | undefined = e.target.value;
    newValue = newValue === "All" ? undefined : newValue;

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
    <div className="flex flex-col gap-1 min-w-[120px]">
      <label htmlFor={filterKey} className="font-semibold text-blue-900 mb-0.5 text-sm">
        {props.children}
      </label>
      <select
        id={filterKey}
        className="border border-gray-300 rounded-lg px-2 py-1 bg-white text-purple-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150 outline-none text-sm"
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
