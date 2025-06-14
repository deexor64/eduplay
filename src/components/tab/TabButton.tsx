import { ReactNode } from "react";

// Tab button
interface TabButtonProps {
  tabName: "default" | string,
  setSelected: Function,
  selected: string,
  children: ReactNode
}

export default function TabButton(props: TabButtonProps) {
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
