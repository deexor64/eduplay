// Wrapper for filters
export default function FilterWrapper(props: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-5 flex gap-3.5">{props.children}</div> 
  );
}
