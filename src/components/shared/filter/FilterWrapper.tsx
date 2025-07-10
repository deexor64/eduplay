// Wrapper for filters
export default function FilterWrapper(props: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-2 mb-4 flex gap-3 border border-gray-100 
    sticky top-20 z-10">
      {props.children}
    </div> 
  );
}
