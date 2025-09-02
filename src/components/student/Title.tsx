type TitleProps = {
  title: string;
  imageUrl?: string;
}

export default function Title(props: TitleProps) {

  const { title, imageUrl } = props;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between p-3 border-l-6 border-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center space-x-3">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Title icon"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
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
