"use client"

import React from "react";

interface ParentInfoCardProps {
  parent: {
    user: {
      firstName: string;
      lastName: string;
      displayPicUrl: string;
    };
    email: string;
  };
}

export default function ParentInfoCard({ parent }: ParentInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Parent</h2>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
          <img
            src={parent.user.displayPicUrl}
            alt={`${parent.user.firstName} ${parent.user.lastName}'s profile picture`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              e.currentTarget.src = "/images/avatar.png";
            }}
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">
            {parent.user.firstName} {parent.user.lastName}
          </p>
          <p className="text-sm text-gray-600">{parent.email}</p>
        </div>
      </div>
    </div>
  );
} 