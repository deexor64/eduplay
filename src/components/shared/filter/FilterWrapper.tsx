// Wrapper for filters
export default function FilterWrapper(props: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-3 mb-4 flex border border-gray-100 
      sticky top-20 z-10">
      {props.children}
    </div> 
  );
}
