import { generateUniqueID } from "@/lib/utils/generateRandomString";

interface TableRowProps {
  rowType: "HEAD" | "DATA",
  rowData: Object
}

// row
export default function TableRow (props: TableRowProps) {
  return (
    props.rowType == "HEAD" ? 
    <tr className="text-sm text-gray-600">
      {Object.keys(props.rowData).map(function (item: any) {
        return (
          <th className="py-2 p-2 bg-gray-300 rounded-sm"
            key={generateUniqueID()}> { item }</th>
        )
      })}
    </tr> : 
    <tr className="text-sm text-gray-600">
      {Object.values(props.rowData).map(function (item: any) {
        return (
          <td className="py-2" key={generateUniqueID()}> { item }</td>
        )
      })}
    </tr> 
  )
}
