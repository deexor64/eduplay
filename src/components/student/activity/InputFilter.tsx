import { useRef, ChangeEvent } from "react";

interface InputFilterProps {
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function StudentInputFilter(props: InputFilterProps) {

  const { filterKey, setFilter, setTriggerFilter} = props;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    let newValue: string | undefined = e.target.value;
    newValue = newValue === "" ? undefined : newValue;

    setFilter((prev: any) => ({
      ...prev,
      [filterKey]: newValue,
    }));

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setTriggerFilter(true);
    }, 2000);
    
  };

  return (
    <div className="flex flex-col gap-2 min-w-[140px]">
      <label htmlFor={filterKey} className="font-bold text-purple-800 text-sm flex items-center gap-1">
        {props.children}
      </label>
      <input
        id={filterKey}
        type="text"
        className="border-2 border-purple-300 rounded-xl px-3 py-2 bg-white text-purple-800 shadow-md focus:border-pink-400 focus:ring-2 
        focus:ring-pink-200 transition-all duration-200 outline-none placeholder:text-purple-300 text-sm font-medium"
        onChange={handleInputChange}
        placeholder={`Search ${props.children}...`}
      />
    </div>
  );
} 