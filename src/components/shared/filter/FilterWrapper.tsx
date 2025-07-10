// Wrapper for filters
export default function FilterWrapper(props: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 flex gap-5 border border-gray-100 sticky top-2">
      {props.children}
    </div> 
  );
}
