import { ReactNode } from "react";

interface TabProps {
  tabName: string,
  setSelected: Function,
  selected: string,
  children: ReactNode
}

export function Tab(props: TabProps) {
  return (
    <button key={props.tabName} 
      onClick={function () { props.setSelected(props.tabName); }}
      className={
        "px-4 py-2 rounded-full text-sm font-medium " +
        (props.selected === props.tabName
          ? "bg-blue-600 text-white"
          : "bg-blue-100 text-blue-800 hover:bg-blue-200")
      }>
      {props.children}
    </button>
  );
}

export default function Tabs(props: any) {
  return (
    <div className="flex space-x-4 mb-6">
      {props.children}
    </div>
  );
}
