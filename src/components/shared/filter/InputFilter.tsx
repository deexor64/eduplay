import { useRef, ChangeEvent } from "react";

interface InputFilterProps {
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  setTriggerFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function InputFilter(props: InputFilterProps) {

  const { filterKey, setFilter, setTriggerFilter } = props;

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
    <div className="ml-8 flex flex-col gap-1 w-40">
      <label htmlFor={filterKey} className="font-semibold text-blue-900 mb-0.5 text-sm">
        {props.children}
      </label>
      <input
        id={filterKey}
        type="text"
        className="border border-gray-300 rounded-lg px-2 py-1 bg-white text-purple-800 shadow-sm focus:border-blue-500 focus:ring-2
        focus:ring-blue-200 transition-all duration-150 outline-none placeholder:text-gray-400 text-sm"
        onChange={handleInputChange}
      />
    </div>
  );
}
