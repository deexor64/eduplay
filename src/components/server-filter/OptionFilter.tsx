import { ChangeEvent } from "react";

interface OptionFilterProps {
  filterKey: string;
  values: string[];
  setFilter: (prev: any) => void;
}

export default function OptionFilter(props: OptionFilterProps) {
  
  const { filterKey, values, setFilter } = props;

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let newValue: string | undefined = e.target.value;
    (newValue === "All") ? newValue = undefined : newValue = newValue.toLowerCase();
    setFilter((prev: any) => ({
      ...prev,
      [filterKey]: newValue,
    }));
  };

  return (
    <div>
      <label htmlFor={filterKey} className="font-medium text-blue-800 mr-1.5">
        {filterKey}
      </label>
      <select
        id={filterKey}
        className="border rounded px-3 py-1 bg-white text-purple-700"
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
