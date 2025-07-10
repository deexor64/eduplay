import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

/*
  need a usestate varible with these fields
  
  const [triggerFilter, setTriggerFilter] = useState(false);
  
*/

type FilterButtonsProps = {
  setFilter: Function;
  setTriggerFilter: (v: boolean) => void;
};

export default function FilterButtons(props: FilterButtonsProps) {
  
  const { setFilter, setTriggerFilter } = props;

  function handleApply() {
    setTriggerFilter(true);
  }

  function handleClear() {
    setFilter((prev: any) => {
      const cleared = { ...prev };
      Object.keys(cleared).forEach(key => {
        cleared[key] = undefined;
      });
      return cleared;
    });
    setTriggerFilter(true);
  }

  return (
    <div className="flex">
      <button
        onClick={handleApply}
        className="p-2 rounded-l-lg bg-blue-600 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 shadow transition-all duration-150 text-white text-lg"
        title="Apply Filters"
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>

      <button
        onClick={handleClear}
        className="p-2 rounded-r-lg bg-gray-300 hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-300 shadow transition-all duration-150 text-gray-800 hover:text-white text-lg"
        title="Clear Filters"
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );
}
