export default function Title(props: any) {
  return (
    <div className="flex justify-between mb-2.5">
      <div className="text-2xl font-bold text-blue-900 mb-4">{props.title}</div>
      <div className="flex">{props.children}</div>
    </div>
  );
}
