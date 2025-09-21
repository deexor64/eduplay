import { useRef, ChangeEvent, useState } from "react";

interface InputFilterProps {
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function StudentInputFilter(props: InputFilterProps) {

  const { filterKey, setFilter, setTriggerFilter} = props;
  
  const [selected, setSelected] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    let newValue: string | undefined = e.target.value;
    newValue = newValue === "" ? undefined : newValue;
    
    newValue ? setSelected(true) : setSelected(false);

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
        className={`${selected ? 'border-pink-600 focus: ring-pink-600' : 'border-purple-300 focus: ring-purple-300'} focus:ring-1 border-2 rounded-xl px-3 py-1 
          bg-white text-purple-800 shadow-md transition-all duration-200 outline-none placeholder:text-purple-300 text-sm font-medium`}
        onChange={handleInputChange}
        placeholder={`Search ${props.children}...`}
      />
    </div>
  );
}
