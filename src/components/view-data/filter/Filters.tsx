import { generateUniqueID } from "@/utils/generateRandomID";
import { ReactNode, useState } from "react";

// Wrapper for filters
interface filtersProps {
  filterName: string;
  selected: string;
  children: ReactNode;
}

export default function Filters(props: filtersProps) {
  return (
    props.filterName == props.selected && (
      <div className="bg-white rounded-xl shadow p-6 mb-5 flex gap-3.5">{props.children}</div>
    )
  );
}

// Filter by selecting options
interface optionFilterProps {
  filterName: string,
  values: { [key: string]: Array<"All" | string | number | boolean> },
  dbData: { [key: string]: Array<{ [key: string]: any }> },
  filteredData: { [key: string]: Array<{ [key: string]: any }> },
  setFilteredData: Function
}

export function OptionFilter(props: optionFilterProps) {
  const { filterName, values, dbData, filteredData, setFilteredData } = props;
  const filterKey = Object.keys(values)[0]; // e.g., 'status' or 'id'
  const [selectedValue, setSelectedValue] = useState<"All" | string | number | boolean>("All");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);

    setFilteredData(function (prevFilteredData: any) {
      // Start with the original dbData for the entity
      let newData = dbData[filterName];
      
      // Collect all active filters, including the current one
      const allFilters = Array.from(document.querySelectorAll<HTMLSelectElement>
        (`select[data-entity="${filterName}"]`))
        .map(function (select) {
          return {
            key: select.getAttribute("data-filter-key"),
            value: select === e.target ? newValue : select.value,
          };
        })
        .filter(function ({ key, value }) { return key && value && value !== "All" }); // Only active filters
      // Apply all filters cumulatively
      allFilters.forEach(function ({ key, value }) {        // unconventional fix + ""
        newData = newData.filter(function (item) { return item[key + ""] === value });
      });
      return {
        ...prevFilteredData,
        [filterName]: newData,
      };
    });
  };

  return (
    <div className="mb-6">
      <select
        className="border rounded px-3 py-1 bg-white text-purple-700"
        value={selectedValue.toString()}
        onChange={handleFilterChange}
        data-entity={filterName}
        data-filter-key={filterKey}
      >
        {values[filterKey].map((value: any) => (
          <option value={value} key={generateUniqueID()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}


// Filter by input
interface inputFilterProps {
  filterName: string;
  field: string;
  dbData: { [key: string]: Array<{ [key: string]: any }> };
  filteredData: { [key: string]: Array<{ [key: string]: any }> };
  setFilteredData: Function;
}

export function InputFilter(props: inputFilterProps) {
  const { filterName, field, dbData, filteredData, setFilteredData } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);

    setFilteredData(function (prevFilteredData: any) {
      // Start with the original dbData for the entity
      let newData = dbData[filterName];

      // Apply select filters
      const selectFilters = Array.from(document.querySelectorAll<HTMLSelectElement>(`select[data-entity="${filterName}"]`))
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
      const inputFilters = Array.from(document.querySelectorAll<HTMLInputElement>(`input[data-entity="${filterName}"]`))
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
        [filterName]: newData,
      };
    });
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        className="border rounded px-3 py-1 bg-white text-purple-700"
        value={inputValue}
        onChange={handleInputChange}
        data-entity={filterName}
        data-filter-key={field}
        placeholder={"Search " + field}
      />
    </div>
  );
}

//Filter by date
//......