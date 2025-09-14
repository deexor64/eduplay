import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-5xl text-blue-600"
        />
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Authenticating...
        </p>
      </div>
    </div>
  );
}
