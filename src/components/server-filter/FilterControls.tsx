import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
    setFilter({
      indexNumber: undefined,
      name: undefined,
      email: undefined,
      status: undefined,
    });
    setTriggerFilter(true);
  }

  return (
    <div className="flex">
      <button
        onClick={handleApply}
        className="p-2 rounded-tl-md rounded-bl-md bg-blue-500 hover:bg-blue-600 text-white"
        title="Apply Filters"
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>

      <button
        onClick={handleClear}
        className="p-2 rounded-tr-md rounded-br-md bg-gray-400 hover:bg-gray-500 text-white"
        title="Clear Filters"
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );
}
