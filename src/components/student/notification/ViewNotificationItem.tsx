"use client";

import { NotificationType } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

interface ViewNotificationItemProps {
  notificationID: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  handleMarkRead?: (id: string) => void;
}

const typeThemes: Record<NotificationType, string> = {
  INFO:    "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-blue-300 text-blue-800",
  WARNING: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 border-yellow-300 text-yellow-800",
  ERROR:   "bg-gradient-to-br from-red-50 via-red-100 to-red-200 border-red-300 text-red-800",
  SUCCESS: "bg-gradient-to-br from-green-50 via-green-100 to-green-200 border-green-300 text-green-800",
};

const typeIcons: Record<NotificationType, any> = {
  INFO: faInfoCircle,
  WARNING: faExclamationTriangle,
  ERROR: faTimesCircle,
  SUCCESS: faCheckCircle,
};

export default function ViewNotificationItem(props: ViewNotificationItemProps) {
  
  const { notificationID, title, message, type, createdAt, handleMarkRead } = props;

  return (
    <div
      key={notificationID}
      className={`relative p-5 rounded-2xl shadow-lg border-2 ${typeThemes[type] ?? typeThemes.INFO}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-2">
          <div className="flex items-center space-x-2 mb-2">
            <FontAwesomeIcon icon={typeIcons[type]} className="text-lg" />
            <h4 className="text-lg font-semibold">{title}</h4>
          </div>
          <p className="text-base leading-relaxed">{message}</p>
        </div>

        <div className="text-xs opacity-80 ml-4 whitespace-nowrap">
          {new Date(createdAt).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.5s infinite;
        }
      `}</style>
    </div>
  );
}
