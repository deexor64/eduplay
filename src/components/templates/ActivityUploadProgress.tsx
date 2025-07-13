import React, { RefObject } from "react";

/*
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    status: "PENDING",
  });
  
  const abortSave = useRef(false);
*/

type UploadProgress = {
  progress: number;
  status: "NONE" | "PENDING" | "ABORTED" | "COMPLETED" | "ERROR" | string;
};

type ActivityUploadProgressProps = {
  uploadProgress: UploadProgress;
  setUploadProgress: Function;
  abortSave: RefObject<boolean>,
};

export default function ActivityUploadProgress({ uploadProgress, setUploadProgress, abortSave }
: ActivityUploadProgressProps) {

  // Handle exit/cancel action
  function handleExit() {
    abortSave.current = true;
    setUploadProgress({ progress: 0, status: "NONE" });
  };

  // Get status-specific content
  function getStatusContent() {
    switch (uploadProgress.status) {
      case "PENDING":
        return {
          title: "Saving Activity...",
          icon: "⏳",
          buttonText: "Cancel",
          buttonColor: "bg-red-500 hover:bg-red-600"
        };
      case "ABORTED":
        return {
          title: "Upload Cancelled",
          icon: "❌",
          buttonText: "Close",
          buttonColor: "bg-gray-500 hover:bg-gray-600"
        };
      case "ERROR":
        return {
          title: "Upload Failed",
          icon: "⚠️",
          buttonText: "Try Again",
          buttonColor: "bg-orange-500 hover:bg-orange-600"
        };
      case "COMPLETED":
        return {
          title: "Successfully Saved!",
          icon: "✅",
          buttonText: "Done",
          buttonColor: "bg-green-500 hover:bg-green-600"
        };
      default:
        return {
          title: "Processing...",
          icon: "⏳",
          buttonText: "Cancel",
          buttonColor: "bg-red-500 hover:bg-red-600"
        };
    }
  }

  const statusContent = getStatusContent();

  return (
    
    uploadProgress.status !== "NONE" && (
      
      <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-black/60 backdrop-blur-md flex items-center 
       justify-center animate-in fade-in duration-300">
        
        {/* Modal Container */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-[90%] max-w-md text-center shadow-2xl border 
        border-white/20 animate-in zoom-in-95 duration-300">
          
          {/* Status Icon */}
          <div className="text-4xl mb-4 animate-bounce">
            {statusContent.icon}
          </div>
          
          {/* Progress Message */}
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            {statusContent.title}
          </h2>
          
          {/* Progress Bar Container */}
          {uploadProgress.status === "PENDING" && (
            <div className="mb-6">
              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${uploadProgress.progress}%` }}
                />
              </div>
              
              {/* Progress Percentage */}
              <p className="text-sm font-medium text-gray-600">
                {Math.floor(uploadProgress.progress)} % Complete
              </p>
            </div>
          )}
          
          {/* Success Animation for Completed */}
          {uploadProgress.status === "COMPLETED" && (
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-sm text-gray-600">Your activity has been saved successfully!</p>
            </div>
          )}
          
          {/* Error State */}
          {uploadProgress.status === "ERROR" && (
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-sm text-gray-600">Something went wrong. Please try again.</p>
            </div>
          )}
          
          {/* Action Button */}
          <button
            onClick={handleExit}
            className={`px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
              active:scale-95 shadow-lg ${statusContent.buttonColor}`}
          >
            {statusContent.buttonText}
          </button>
      
        </div>
      </div>
      
    )
  );
}
