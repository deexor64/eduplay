"use client"

import React from "react";
import { UserStatus, TeacherRole } from "@prisma/client";

interface TeacherProfileSummaryProps {
  teacherInfo: {
    firstName: string;
    lastName: string;
    email: string;
    displayPicUrl: string;
    status: UserStatus;
    teacher: {
      indexNumber: string;
      role: TeacherRole;
    };
  };
  updateProfilePictureHandler: (file: File) => Promise<void>;
}

export default function TeacherProfileSummary(props: TeacherProfileSummaryProps) {
  const { teacherInfo, updateProfilePictureHandler } = props;

  return (
    <div className="text-center py-6">
      <div className="relative inline-block">
        <img 
          src={teacherInfo.displayPicUrl || "/images/avatar.png"} 
          alt="Profile" 
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) updateProfilePictureHandler(file);
            }}
          />
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </label>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800">
        {teacherInfo.firstName} {teacherInfo.lastName}
      </h2>
      <p className="text-gray-600 mb-2">{teacherInfo.email}</p>
      <p className="text-sm text-gray-500 mb-4"><b>Index</b> {teacherInfo.teacher.indexNumber}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-evenly">
          <span className="text-gray-600 flex items-center gap-2">
            Role
            <p className="font-medium capitalize m-0 leading-none">
              {teacherInfo.teacher.role.toLowerCase()}
            </p>
          </span>
          <span className="h-5 text-gray-600 flex items-center gap-2">
            Status
            <p className={`py-1 px-2 rounded-full text-xs leading-none m-0 ${
                teacherInfo.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
              {teacherInfo.status}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
