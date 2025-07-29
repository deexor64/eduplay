type TitleProps = {
  title: string;
  emoji?: string;
  color?: "blue" | "green" | "purple" | "orange" | "pink";
}

export default function Title(props: TitleProps) {

  const {  title,  emoji = "🌟", color = "blue" } = props;
  
  const colorClasses = {
    blue: "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800",
    green: "border-green-500 bg-gradient-to-r from-green-50 to-green-100 text-green-800",
    purple: "border-purple-500 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800",
    orange: "border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800",
    pink: "border-pink-500 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800"
  };

  return (
    <div className="mb-8">
      <div className={`flex items-center justify-between p-6 border-l-6 border-4 rounded-lg shadow-md ${colorClasses[color]} transform hover:scale-105 transition-transform duration-200`}>
        <div className="flex items-center space-x-3">
          <span className="text-3xl animate-bounce">{emoji}</span>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-current rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
