import { ReactNode, useState } from "react";
import { generateUniqueID } from "@/utils/generateRandomID";

// Filter by input
interface InputFilterProps {
  filterTab: string;
  filterKey: string;
  dbData: { [key: string]: Array<{ [key: string]: any }> };
  filteredData: { [key: string]: Array<{ [key: string]: any }> };
  setFilteredData: Function;
}

export default function InputFilter(props: InputFilterProps) {
  const { filterTab, filterKey, dbData, filteredData, setFilteredData } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);

    setFilteredData(function (prevFilteredData: any) {
      // Start with the original dbData for the entity
      let newData = dbData[filterTab];

      // Apply select filters
      const selectFilters = Array.from(document.querySelectorAll<HTMLSelectElement>(`select[data-entity="${filterTab}"]`))
        .map(function (select) {
          return {
            key: select.getAttribute("data-filter-key"),
            value: select.value,
          };
        })
        .filter(function ({ key, value }) { return key && value && value !== "All" });

      selectFilters.forEach(function ({ key, value }) {
        newData = newData.filter(function (item) { return item[key + ""] === value });
      });

      // Apply input filters, including the current one
      const inputFilters = Array.from(document.querySelectorAll<HTMLInputElement>(`input[data-entity="${filterTab}"]`))
        .map(function (input) {
          return {
            key: input.getAttribute("data-filter-key"),
            value: input === e.target ? newValue : input.value,
          };
        })
        .filter(function ({ key, value }) { return key && value });

      inputFilters.forEach(function ({ key, value }) {
        newData = newData.filter(function (item) {
          return item[key + ""].toString().toLowerCase().includes(value.toLowerCase());
        });
      });

      return {
        ...prevFilteredData,
        [filterTab]: newData,
      };
    });
  };

  return (
    <div className="mb-6">
      <label htmlFor={filterTab + filterKey} className="font-medium text-blue-800 mr-1.5">
        {filterKey}
      </label>
      <input
        type="text"
        className="border rounded px-3 py-1 bg-white text-purple-700"
        value={inputValue}
        onChange={handleInputChange}
        data-entity={filterTab}
        data-filter-key={filterKey}
        placeholder={"Search " + filterKey}
      />
    </div>
  );
}
