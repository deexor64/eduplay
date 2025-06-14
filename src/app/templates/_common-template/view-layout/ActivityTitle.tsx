
export default function ActivityTitle(props: any) {
  
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {props.children}
      </h1>
    </header>
  );
}
