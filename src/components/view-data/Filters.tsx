// ---------------under implementation !!!---------------------

import { generateUniqueID } from "@/utils/generateRandomID";
import { ReactNode } from "react";

interface filtersProps {
  filterName: string,
  selected: string,
  children: ReactNode
}

export default function Filters(props: filtersProps) {
  return (
    props.filterName == props.selected && (
      <div className="bg-white rounded-xl shadow p-6 mb-5 flex">{props.children}</div>
    )
  )
}

interface optionFilterProps {
  filterName: string,
  values: {[key: string]: Array<"All" | string | number | boolean> },
  dbData: Object,
  filteredData: Object,
  setFilteredData: Function 
}

export function OptionFilter(props: optionFilterProps) {
  return (
    <div className="mb-6">
      <select className="border rounded px-3 py-1 bg-white text-purple-700" 
        onChange={function (e) {
          
        }
      }>
        {
          Object.values(props.values).map(function (value: any) {
            return <option value={value} key={generateUniqueID()}>{value}</option>
          })
        }
      </select>
    </div>
  )
}

// interface inputFilterProps {
//   filterName: string,
//   setFilters: Function,
// }

// export function inputFilter(props: inputFilterProps) {
//   return (
//     <input
//       type={ props.filterName}
//       className="border rounded px-3 py-1 bg-white text-purple-700"
//       onChange={function (e) { props.setFilters(props.filterName, e.target.value) }}
//     />
//   )
// }
