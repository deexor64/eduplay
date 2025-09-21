"use client"

import React, { useState, useEffect } from "react";
import { UserStatus, TeacherRole } from "@prisma/client";

interface TeacherPersonalInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    teacher: {
      indexNumber: string;
      role: TeacherRole;
    };
  };
  emailVerified: boolean;
  currentEmail?: string;
  updateEmailHandler: (newEmail: string) => Promise<void>;
  updateTeacherInfo: (update: { firstName?: string; lastName?: string }) => Promise<void>;
}

export default function TeacherPersonalInfoForm(props: TeacherPersonalInfoFormProps) {
  
  const { data, emailVerified, currentEmail, updateEmailHandler, updateTeacherInfo } = props;
  
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
  }, [data]);

  // Handle input changes
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save changes
  async function handleSaveChanges() {
    setIsSaving(true);
    await updateTeacherInfo(formData);
    setIsSaving(false);
    setIsEditing(false);
  };

  // Handle cancel changes
  function handleCancelChanges() {
    setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
        
        {data.teacher.role === "ADMIN" && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email {data.teacher.role !== "ADMIN" && " (Please contact the administrator to change your Email)"}
            </label>
            {!emailVerified && (
              <input
                type="email"
                value={currentEmail}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 mb-1"
              />
            )}
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
              {!emailVerified && (
                <button
                  type="button"
                  onClick={() => updateEmailHandler(data.email)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Verify
                </button>
              )}
            </div>
          
          </div>
        )}

        
        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Edit Info
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelChanges}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
