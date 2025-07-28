type TitleProps = {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between p-4 border-l-4 border-blue-700 bg-white rounded shadow-sm">
      <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
      </div>
    </div>
  );
}
