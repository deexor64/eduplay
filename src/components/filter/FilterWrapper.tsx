// Wrapper for filters
interface FiltersProps {
  filterTab: string;
  selected: string;
  children: React.ReactNode;
}

export default function FilterWrapper(props: FiltersProps) {
  return (
    props.filterTab == props.selected && (
      <div className="bg-white rounded-xl shadow p-6 mb-5 flex gap-3.5">{props.children}</div>
    )
  );
}


//Filter by date
//......