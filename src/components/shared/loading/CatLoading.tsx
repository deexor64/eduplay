import Lottie, { useLottie } from "lottie-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        
        {/* Lottie animation */}
        <div className="w-32 h-32">
          <Lottie animationData={require("/public/animations/cat-loading.json")} 
          loop={true} className="w-64 h-64" />;
        </div>
        
      </div>
    </div>
  );
}
