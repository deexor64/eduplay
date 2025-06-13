import { ReactNode } from "react";


// Container for items
export default function Tab(props: any) {
  return <div className="bg-white rounded-xl shadow p-6">{props.children}</div>
}

// Wrapper for tab buttons
export function TabButtons(props: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-5 flex gap-3.5">{props.children}</div>
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
        onClick={() => props.setSelected(props.tabName)}
        className={
          "px-4 py-2 rounded-lg text-sm font-medium mr-5 border border-blue-200 " + 
          (props.selected === props.tabName
            ? " bg-blue-400" 
            : " bg-blue-100 hover:bg-blue-200" 
          )
        }
      >
        {props.children}
      </button>
    )
  );
}
