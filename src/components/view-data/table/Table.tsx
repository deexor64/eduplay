import { generateUniqueID } from "@/utils/generateRandomID"
import { ReactNode } from "react"

export default function Table(props: any) {
  return (
    <table className="w-full table-auto text-left">
      {props.children}
    </table>   
  )
}

interface RowProps {
  rowType: "head" | "data",
  rowData: Array<any>
}

export function Row (props: RowProps) {
  return (
    <tr className="text-sm text-gray-600">
      {props.rowData.map(function (item: any) {
        return (props.rowType == "head" ? 
          <th className="py-2 p-2 bg-gray-300 rounded-sm"
            key={ generateUniqueID()}> { item }</th>
          : <td className="py-2" key={generateUniqueID()}> { item }</td>)
      })}
    </tr>
  )
}
