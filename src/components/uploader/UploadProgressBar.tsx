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
  status: "NONE" | "PENDING" | "ABORTED" | "COMPLETED" | string;
};

type UploadProgressBarProps = {
  uploadProgress: UploadProgress;
  setUploadProgress: Function;
  abortSave: RefObject<boolean>,
};

export default function UploadProgressBar({ uploadProgress, setUploadProgress, abortSave }
: UploadProgressBarProps) {

  function handleExit() {
    abortSave.current = true;
    setUploadProgress({ progress: 0, status: "NONE" });
  };

  return (
    
    uploadProgress.status !== "NONE" && (
      
      <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-md text-center shadow-xl">
          
          {/* progress message */}
          <h2 className="text-lg font-semibold mb-4">
            {uploadProgress.status === "PENDING" && "Saving..."}
            {uploadProgress.status === "ABORTED" && "Cancelled"}
            {uploadProgress.status === "COMPLETED" && "Successfully saved"}
          </h2>
          
          {/* progress bar */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>
  
          <p className="text-sm mb-4">{Math.floor(uploadProgress.progress)} %</p>
          
          {/* cancel button */}
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
          {(uploadProgress.status === "ABORTED" || uploadProgress.status === "COMPLETED" )
            && "Finish"
          }
          {(uploadProgress.status === "PENDING")
            && "Cancel"
          }
          </button>
      
        </div>
      </div>
      
    )
  );
}
