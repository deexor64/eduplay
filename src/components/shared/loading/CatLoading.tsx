import Lottie from "lottie-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen relative overflow-hidden">
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-300 via-purple-400 to-pink-300 animate-gradient" />

      {/* Foreground content */}
      <div className="relative flex flex-col items-center space-y-4 text-white">
        <div className="w-40 h-40">
          <Lottie animationData={require("/public/animations/cat-loading.json")} loop={true} />
        </div>
        <p className="text-lg font-medium">Loading...</p>
      </div>

      {/* Tailwind animation styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
