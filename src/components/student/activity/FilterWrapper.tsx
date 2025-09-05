
export default function FilterWrapper(props: any) {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow-lg py-3 px-6 mb-6 flex justify-between border-2 border-blue-200 
      sticky top-4 z-100">
      {props.children}
    </div> 
  );
} 