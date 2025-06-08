import { ReactNode } from "react"

interface RowProps {
  RowType: "head" | "data",
  RowData: Array<any>
}

export function Row (props: RowProps) {
  return (
    <tr className="text-sm text-gray-600">
      {props.RowData.map(function (item: any) {
        return (props.RowType == "head" ? <th className="py-2"> { item }</th>
          : <td className="py-2"> { item }</td>)
      })}
    </tr>
  )
}

export default function Table(props: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <table className="w-full table-auto text-left border-t">
          { props.children }
      </table>
    </div>
  )
}
