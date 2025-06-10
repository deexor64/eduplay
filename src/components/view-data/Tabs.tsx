import { ReactNode } from "react";


// Container for items
export default function Tab(props: any) {
  return <div className="bg-white rounded-xl shadow p-6">{props.children}</div>
}

// Space for tab buttons
export function Tabs(props: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-5 flex">{props.children}</div>
  );
}

// Tab button
interface TabButtonProps {
  tabName: "default" | string,
  setSelected: Function,
  selected: string,
  children: ReactNode
}

export function TabButton(props: TabButtonProps) {
  return (
    props.tabName != "default" && (
      <button
        onClick={function () { props.setSelected(props.tabName); }}
        className={
          "px-4 py-2 rounded-lg text-sm font-medium mr-5" +
          (props.selected === props.tabName
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-800 hover:bg-blue-200")
        }>
        {props.children}
      </button>
    )
  );
}
